function displayAll(){
  getLists();
}


function getLists(){
var $listsDiv = $(".lists");
  $.get("/lists").then(function(lists){
    $(".new-list").empty();
    $listsDiv.empty();
    var renderedLists = lists.map(generateList);
    renderedLists.forEach(listRealClickDelete);
    renderedLists.forEach(listClick);
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
        " | <a href='#' class='delete-list'>Delete This List</a></div>" );
}

function listClick(list){
  $(list).find(".link").on("click", function() {
    var $list = $(this).parents(".row");
    var id = $list.data("id");
    $(".new-task").empty();
    var socket = io.connect('https://cryptic-scrubland-3747.herokuapp.com/');
    socket.send('listClicked', id);
    $(".filter-buttons").empty();
    var form = taskForm(id);
    addNewEvent(form);
    $(".new-task").append(form);
    $(".new-task").prepend("<a class='new-class-form-link'>add new task </a>")
    $(".filter-buttons").prepend(renderButtons());
    addSortEvent(id);
    
    $(".new-class-form-link").on("click", function(){ $(".task-form").toggleClass("hidden")})
    renderTasks(id);
  });
}

function renderButtons() {
  return $("<button class='btn waves-effect waves-light' id='incomplete'>Incomplete</button>" + 
           "<button class='btn waves-effect waves-light' id='complete'>Complete</button>" +
           "<button class='btn waves-effect waves-light' id='title'>Title</button>" +
           "<button class='btn waves-effect waves-light' id='duedate'>Due Date</button>"+
           "<button class='btn waves-effect waves-light' id='startdate'>Start Date</button>")
}

function addSortEvent(id) {
  $(".btn").on("click", function() {
    var sortBy = $(this).attr('id')
    $.post('/sorted', {id: id, sort_by: sortBy} ).then(function(tasks){
      $(".list-tasks").empty();
      var renderedTasks = tasks.map(generateTask);
      renderedTasks.forEach(listClickDelete);
      renderedTasks.forEach(listClickChangeStatus);
      $(".list-tasks").append(renderedTasks);
    });
  });
}

function listRealClickDelete(list){
  $(list).find(".delete-list").on("click", function() {
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

function rendersearchForm(){
  return $("<div class='row'><div class='input-field col s6'>" +
    "<input id='search' type='text' class='validate'>" +
    "<label class='active' for='search'>Search</label></div></div>");
}

function addSearchEvent(tasks){
  var $tasks = tasks
  $("#search").on("keyup", function(){
    $search = $(this).val();
    $(".list-tasks").empty();
    var goodTasks = [];
    $tasks.forEach(function(task){ 
      if(task.title.includes($search)){
        goodTasks.push(task);
      } 
    });
    
    $(".list-tasks").empty();
    var renderedTasks = goodTasks.map(generateTask);
    renderedTasks.forEach(listClickDelete);
    renderedTasks.forEach(listClickChangeStatus);
    $(".list-tasks").append(renderedTasks);
  })
}

