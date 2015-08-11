function displayAll(){
  getLists();
}


function getLists(){
var $listsDiv = $(".lists");
  $.get("/lists").then(function(lists){
    renderedLists = lists.map(generateList);
    renderedLists.forEach(listClick);
    renderedLists.forEach(listClickDelete);
    $(".new-list").empty();
    $listsDiv.empty();
   $listsDiv.append(renderedLists);
   var form = listForm();
   addNewListEvent(form);
   $(".new-list").append(form);
   $listsDiv.prepend("<a class='new-list-form'>Create New List</a>")
   $(".new-list-form").on("click", function(){$(".list-form").toggleClass("hidden");})
 });
}

function listForm(){
  return $("<form class='col s12 hidden list-form'><div class='row'> <div class='input-field col s6'>" +
          "<input id='new-list-title' type='text' class='validate'> <label for='text'>Title</label>" +
          "</div></div>" +
          "<div class='row'><div class='input-field col s12'><textarea class='materialize-textarea' id='new-list-description'></textarea><label for='text'>Description</label>" +
          "<div class='row'> <div class='input-field col s5'><button class='btn waves-effect waves-light' id='create-list' type='submit' name='action'>Create List</button>"+
          "</div></div></form>");
    
}

function generateList(list){
  return $("<div class='row'> <h4 class=''>" + list.title + "</h4></div>" +
        "<div class = 'row' data-id="+ list.id + "><a href='#' class='link'>Click to view tasks</a>" + 
        " | <a href='#' class='delete '>Delete This List</a></div>" );
}

function listClick(list){
  $(list).find(".link").on("click", function() {
    var $list = $(this).parents(".row");
    var id = $list.data("id");
    $(".new-task").empty();
    var form = taskForm(id);
    addNewEvent(form);
    $(".new-task").append(form);
    $(".new-task").prepend("<a class='new-class-form-link'>add new task </a>")
    $(".new-class-form-link").on("click", function(){ $(".task-form").toggleClass("hidden")})
    $.post("/list_tasks", {list: id} ).then(function(tasks){
      $(".list-tasks").empty();
      var renderedTasks = tasks.map(generateTask);
      $(".list-tasks").append(renderedTasks);
    });
  });
}

function listClickDelete(list){
  $(list).find(".delete").on("click", function() {
    var $list = $(this).parents(".row");
    var id = $list.data("id");
    var form = taskForm(id);
    $.ajax({
      method: "DELETE",
      url: "/lists/" + id,
      data: { id: id }, 
      success:  function(){
        getLists();
      }
    });
  });
}

function addNewListEvent(form){
  $(form).find("#create-list").on("click", function() {
    var $form = $(this).parents(".list-form");
    var title = $form.find("#new-list-title").val();
    var note = $form.find("#new-list-description").val();
    
    $.post("/lists", { title: title, description: note } ).then(function(task){
      $(".list-form").toggleClass("hidden")
      getLists();
    });
  });
}

