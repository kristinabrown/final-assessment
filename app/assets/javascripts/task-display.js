function addNewEvent(form){
  $(form).find("#create-task").on("click", function() {
    var $form = $(this).parents(".task-form");
    var title = $form.find("#title").val();
    var startDate = $form.find("#start-date").val();
    var dueDate = $form.find("#due-date").val();
    var note = $form.find("#note").val();
    var listId = $form.find(".list_id").text();
    var attachment = $form.find("#attachment").val();
    
    $.post("/tasks", {title: title, startdate: startDate, duedate: dueDate, note: note, list_id: listId } ).then(function(task){
      $(".task-form").toggleClass("hidden")
      renderTasks(listId);
    });
  });
}

function renderTasks(id){
  $.post("/list_tasks", {list: id} ).then(function(tasks){
    $(".list-tasks").empty();
    var renderedTasks = tasks.map(generateTask);
    renderedTasks.forEach(listClickDelete);
    $(".list-tasks").append(renderedTasks);
  });
};

function listClickDelete(task){
  $(task).find(".delete").on("click", function() {
    var $list = $(this).parents(".row");
    var id = $list.data("id");
    var list_id = $list.find(".list-id").text()

    $.ajax({
      method: "DELETE",
      url: "/tasks/" + id,
      data: { id: id }, 
      success:  function(){
        renderTasks(list_id);
      }
    });
  });
}

function taskForm(id){
  return $("<form class='col s12 hidden task-form'><div class='row'> <div class='input-field col s6'>" +
          "<input id='title' type='text' class='validate'> <label for='text'>Title</label>" +
          "</div></div><div class='row'><p>Start Date</p><div class='input-field col s5'><input type='date' for='Start Date' class='validate' id='start-date'></div></div>" +
          "<div class='row'> <p>Due Date</p> <div class='input-field col s5'> <input type='date' for='Due Date' class='validate' id='due-date'> </div></div>" +
          "<div class='row'><div class='input-field col s12'><textarea class='materialize-textarea' id='note'></textarea><label for='text'>Note</label>" +
          "<div class='list_id hidden'>" + id + "</div>" +
          "<div class='row'<div class='file-field input-field'> <input type='file' id='attachment' /></div></div>" +
          "<div class='row'> <div class='input-field col s5'><button class='btn waves-effect waves-light' id='create-task' type='submit' name='action'>Create Task</button>"+
          "</div></div></form>");
    
}

function generateTask(task){
  return $("<div class='row' data-id='" + task.id + "'><div class='col s10 offset-s1'>" +
         "<div class='col s12 m10'> <div class='card blue-grey darken-1 z-depth-3 display-cards hoverable'>" +
         "<div class='hidden'>" + task.id + "</div> <div class='card-content white-text'> <div class='card-image'>" +
         "<img src='alpaca.jpg' alt='task pic'><span class='card-title'> <h4>" + task.title + "</h4></span> </div>" +
         "<p>" + task.note + "</p> </div> <div class='card-action card-foot blue-text text-darken-4'>" +
         "<h6 class='red-text text-lighten-2'> Complete? " + task.complete + "</h6><div class='list-id hidden'>" + task.list_id + "</div>" +
         "<a class='delete right' href='#'>Delete</a> <a class='right' href='/tasks/" + task.id + "/edit'>Edit</a> </div> </div> </div> </div> </div>");
}