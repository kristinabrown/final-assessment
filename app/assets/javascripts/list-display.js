function displayAll(){
  getLists();
}


function getLists(){
var $listsDiv = $(".lists");
  $.get("/lists").then(function(lists){
    renderedLists = lists.map(generateList);
    renderedLists.forEach(listClick);
   $listsDiv.append(renderedLists);
 });
}

function generateList(list){
  return $("<div class='row' data-id="+ list.id + "> <h2 class='center'>" + list.title + "</h2>" +
        "<a href='#' class='link center'>Click to view tasks</a>" +
         "<p class='center'>"  + list.description + "</p></div>" );
}

function listClick(list){
  $(list).find(".link").on("click", function() {
    var $list = $(this).parents(".row");
    var id = $list.data("id");
    $.post("/list_tasks", {list: id} ).then(function(tasks){
      $(".list-tasks").empty();
      var renderedTasks = tasks.map(generateTask);
      $(".list-tasks").append(renderedTasks);
    });
  });
}

function generateTask(task){
  return $("<div class='row' data-id='" + task.id + "><div class='col s10 offset-s1'>" +
         "<div class='col s12 m10'> <div class='card blue-grey darken-1 z-depth-3 display-cards hoverable'>" +
         "<div class='hidden'>" + task.id + "</div> <div class='card-content white-text'> <div class='card-image'>" +
         "<img src='alpaca.jpg' alt='task pic'><span class='card-title'> <h4>" + task.title + "</h4></span> </div>" +
         "<p>" + task.note + "</p> </div> <div class='card-action card-foot blue-text text-darken-4'>" +
         "<h6 class='red-text text-lighten-2'> Complete? " + task.complete + "</h6>" +
         "<a class='delete right' href='#'>Delete</a> <a class='right' href='/tasks/" + task.id + "/edit'>Edit</a> </div> </div> </div> </div> </div>");
}