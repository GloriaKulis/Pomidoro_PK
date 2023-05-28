const taskButtons = document.querySelectorAll('button[class="mark"]');

function markAsDone() {
    const task = this;
    const container = task.parentElement;
    const id = container.getAttribute("id");


    fetch(`/deleteTask/${id}`)
        .then(function(){
            container.removeChild(task);
            document.querySelector('.done_container').appendChild(container);
        })
}


  
taskButtons.forEach(button => button.addEventListener("click", markAsDone));

export default CompletedTaskScript;