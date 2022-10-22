const express = require('express') ; 
const path = require('path') ; 
const port = 800 ; 

const db = require('./config/mongoose') ; 
const Todo = require('./models/todo');
const app = express() ; 

app.set('view engine' , 'ejs') ;
app.set('views' , path.join(__dirname , 'views')) ; 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))

app.get('/' , function(req , res){
	
	Todo.find({} , function(err, todos){
		if(err){
			console.log('Error in fetching Todos from db');
			return;
		}

		return res.render('home' , { 
		title : 'TODO APP' , 
		todo_list : todos
		}) ; 


	});
});

app.post('/create-todo' , function(req , res){
	
	Todo.create({
		desc: req.body.desc,
		cat: req.body.cat, 
		date: req.body.date
	}, function(err,newTodo){
		if(err){
			console.log('error in creating a todo!');
			return ;
		}

		console.log("*******", newTodo);
		return res.redirect('back') ; 
	})
})

app.get('/delete-todos/' , async function(req,res){
	let ids = req.query.ids.split(",");
	try{
		await Todo.deleteMany({_id:{$in:ids}});
	} 
	catch(e){
		console.log(e);
	}
})

app.listen(port , function(err){
	if(err){
		console.log("Error in running the server:",err);
	}
	console.log("Yup! My express server is running on port:" , port)
})