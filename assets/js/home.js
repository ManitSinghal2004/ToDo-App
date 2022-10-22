document.querySelector(".delete").addEventListener("click",(e) => {
	e.preventDefault();
	let todosToDelete = [];
	document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
		if(checkbox.checked){
			todosToDelete.push(checkbox.dataset.id)
		}
	})
	console.log(`/delete-todos?ids=${todosToDelete.join(',')}`)
	fetch(`/delete-todos?ids=${todosToDelete.join(',')}`).then(() => location.reload());
})