
    const taskDb = [];
    let count = 0;

    const displayAllTasks = (allTasks) => {
        let html = "";
        allTasks.forEach((task) => {
            html += `
            <div class="crud-group ">
                <div class="list-item-group" id="${task.id.toString()}">
                    <input ${task.checked ? "checked" : ""} onchange="checkBoxComplete(this) " class="list-item-checkbox" name="checkbox" type="checkbox"><li class="list-item ${task.checked ? "completedItem" : ""}">${task.todo}</li><i onclick="saveEdit(this)" class="fas fa-save"></i><i onclick="editTask(this)" class="fas fa-edit"></i><i onclick="deleteTask(this)" aria-label="Close" class="fas fa-trash"></i>
                </div>
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
            return
        };
        count++;
        taskDb.push({todo: inputVal, id:count, checked:false});
        document.querySelector(".todo-input").value = '';
        displayAllTasks(taskDb);
    };

    const editTask = (item) => {
        //save
        item.parentNode.children[2].style.display = 'flex';
        //edit
        item.parentNode.children[3].style.display = 'none';
        //delete
        item.parentNode.children[4].style.display = 'none';
        //checkbox
        item.parentNode.children[0].style.display = 'none';
        //li with "todo" tex
        item.parentNode.children[1].toggleAttribute("contentEditable");
        item.parentNode.children[1].focus();
    };

    const saveEdit = (item) => {
        //checkbox
        item.parentNode.children[0].style.display = 'flex';
        item.parentNode.children[1].toggleAttribute("contentEditable");
        //save
        item.parentNode.children[2].style.display = 'none';
        //edit
        item.parentNode.children[3].style.display = 'flex';
        //delete
        item.parentNode.children[4].style.display = 'flex';
        taskDb.forEach((taskItem) => {
            if(taskItem.id == item.parentNode.id){
                taskItem.todo = item.parentNode.children[1].innerText
            };  
        });
    };

    const deleteTask = (item) => {
        //grab the item id of .this
        let itemId = item.parentNode.id;
        //loop through array
        //check to see if id of taskDb's object is equal to .this id
        //if both ids are equal, grab the index of that object that splice from array of objects
        for (i=taskDb.length- 1; i >= 0; i--){
            let idOfDbObject = taskDb[i].id;
            if(idOfDbObject == itemId){
                taskDb.splice(i,1);
            };
        };
         //remove item from UI   
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
        };
    };

    //Keep track of checkbox state
    const checkBoxComplete = (checkbox) => {
        //loop through db to see if taskItems id matches .this.parentNode.id
        //if id matches, taskItem.checked = true if false, false if true
        //check if taskItem.checked is true, if true add completedItem class or if false remove it
        taskDb.forEach((taskItem) => {
            if(taskItem.id == checkbox.parentNode.id){
                taskItem.checked = !taskItem.checked   
                taskItem.checked ? checkbox.parentNode.children[1].classList.add('completedItem') : checkbox.parentNode.children[1].classList.remove('completedItem') 
            };            
        });
    };

    