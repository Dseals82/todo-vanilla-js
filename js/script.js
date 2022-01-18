
    const taskDb = [];
    let count = 0;

    
    const displayAllTasks = (allTasks) => {
        let html = "";
        allTasks.forEach((task) => {
            html += `
            <div class="crud-group ">
                <div class="list-item-group" id="${task.id.toString()}">
                    <input class="list-item-checkbox" type="checkbox"><li class="list-item">${task.todo}</li><i onclick="saveEdit(this)" class="fas fa-save"></i><i onclick="editTask(this)" class="fas fa-edit"></i><i onclick="deleteTask(this)" aria-label="Close" class="fas fa-trash"></i>
                </div>
                <form id="save-form" role="aria-hidden" action="javascript:void(0)" method="post"  class="list-item-group save-form" onsubmit="saveEdit(this,${task.id.toString()})">
                    <li id="save-form-value" contentEditable="true" class="list-item">${task.todo}</li><input class="form-btn btn-success" type="submit" value="Save Edit">
                </form>
            </div> 
            `;
            
        });
        document.querySelector(".todo-list").innerHTML = html;   
    };

    const addTask = () => {    
        let inputVal = document.querySelector(".todo-input").value;
        //backup "todo" main input authentication, in case the required input attr fails
        if(inputVal.length < 0){
            document.querySelector(".todo-input").classList.toggle('empty-input');
        };
        count++;
        taskDb.push({todo: inputVal, id:count});
        document.querySelector(".todo-input").value = '';
        displayAllTasks(taskDb);
    };

    const editTask = (item) => {
        document.querySelector(".fa-save").style.display = 'flex';
        document.querySelector(".fa-edit").style.display = 'none';
        document.querySelector(".fa-trash").style.display = 'none';
        document.querySelector(".list-item-checkbox").style.display = 'none';
        item.parentNode.children[1].toggleAttribute("contentEditable");
        item.parentNode.children[1].focus();
        taskDb.forEach((taskItem) => {
            if(taskItem.id == item.parentNode.id){
               return taskItem.todo = item.parentNode.children[1].innerText
            };  
        });
        console.log(taskDb)
    };

    const saveEdit = (item) => {
        document.querySelector(".list-item-checkbox").style.display = 'flex';
        item.parentNode.children[1].toggleAttribute("contentEditable");
        document.querySelector(".fa-save").style.display = 'none';
        document.querySelector(".fa-edit").style.display = 'flex';
        document.querySelector(".fa-trash").style.display = 'flex';
    }

    const deleteTask = (item) => {
        
        let removeIndex = taskDb.map((item) => {
             console.log('help:',item.id)
        }).indexOf(item.parentNode.id);
        taskDb.splice(removeIndex,1);
            
        item.parentNode.remove();
        alertIfNoTasksLeft(taskDb); 
        
    };
    
    const alertIfNoTasksLeft= (data) => {
        let html = '';
        if (data.length <= 0){
            html+= `
                <p class="red-p" >No items left</p>
            `;
            document.querySelector(".todo-list").innerHTML = html;     
        }
    };

    
console.log(taskDb)


