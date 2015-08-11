function displayAll(){
  getLists();
}

function getLists(){
  $.get("/lists").then(function(lists){
    debugger; 
  })
}