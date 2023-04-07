// Define variables
var users = [];
var tasks = [];

function updateTaskList() {
    var taskList = document.getElementById("taskList");
  
    // Clear the task list element
    taskList.innerHTML = "";
    
    // Loop through the tasks array and add each task to the task list
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var taskItem = document.createElement("tr");
      taskItem.innerHTML = "<td>" + task.name + "</td><td>" + task.dueDate + " </td> <td> " + task.status + "</td><td><button class='btn btn-primary' data-task-id='" + i + "'>Delete</button> <button class='btn btn-primary' data-task-id='" + i + "' data-action='edit'>Edit</button></td>";
      taskList.appendChild(taskItem);
    }
  
    // Add event listener to delete buttons
    var deleteButtons = document.querySelectorAll("#taskList button[data-task-id]");
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function(event) {
        var taskId = event.target.getAttribute("data-task-id");
        tasks.splice(taskId, 1);
        updateTaskList();
      });
    }
    
    // Add event listener to edit buttons
  var editButtons = document.querySelectorAll("#taskList button[data-task-id][data-action='edit']");
  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function(event) {
      var taskId = event.target.getAttribute("data-task-id");
      var task = tasks[taskId];
      
      // Create a form to edit the task
      var form = document.createElement("form");
      form.innerHTML = "<div class='form-group'><label for='editTaskName'>Task Name:</label><input type='text' class='form-control' id='editTaskName' value='" + task.name + "'></div><div class='form-group'><label for='editDueDate'>Due Date:</label><input type='date' class='form-control' id='editDueDate' value='" + task.dueDate + "'></div><button type='button' class='btn btn-primary' id='saveTaskBtn'>Save</button>";
      
      // Replace the task row with the edit form
      var taskRow = event.target.parentElement.parentElement;
      taskRow.parentElement.insertBefore(form, taskRow);
      taskRow.style.display = "none";
      
      // Add event listener to save button
      var saveButton = form.querySelector("#saveTaskBtn");
      saveButton.addEventListener("click", function(event) {
        var newTaskName = form.querySelector("#editTaskName").value.trim();
        var newDueDate = form.querySelector("#editDueDate").value;
        tasks[taskId] = {
          name: newTaskName,
          dueDate: newDueDate,
          status: task.status
        };
        form.parentElement.removeChild(form);
        taskRow.style.display = "";
        updateTaskList();
      });
    });
  }
}

// Add user event listener
document.getElementById("addUserBtn").addEventListener("click", function(event){
  // Code to add user
  event.preventDefault();
  var name = document.getElementById("name").value.trim();
  if (name === "") {
    alert("Please enter a name.");
    return;
  }
  users.push(name);
  alert("User added successfully!");
  document.getElementById("name").value = "";
});

// Add task event listener
document.getElementById("addTaskBtn").addEventListener("click", function(){
  // Code to add task
  var taskName = document.getElementById("taskName").value.trim();
  var dueDate = document.getElementById("dueDate").value.trim();
  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }
  if (dueDate === "") {
    alert("Please enter a due date.");
    return;
  }
  tasks.push({
    name: taskName,
    dueDate: dueDate,
    status: "Pending"
  });
  updateTaskList();
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

});

// Filter tasks event listener
document.getElementById("filter").addEventListener("change", function() {
  updateTaskList();
});

// Filter tasks by due date event listener
document.getElementById("dueDateFilter").addEventListener("change", function() {
  var dueDateFilter = document.getElementById("dueDateFilter").value;
  tasks = tasks.filter(function(task) {
    return dueDateFilter === "All" || task.dueDate === dueDateFilter;
  });
  updateTaskList();
});


// Initialize the task list
updateTaskList();
