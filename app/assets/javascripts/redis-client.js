function connectToRedis(){
  var socket = io.connect('https://cryptic-scrubland-3747.herokuapp.com/');

  socket.on('message', function(){
    getLists();
  });
  
  socket.on('listClicked', function(id){
    getLists();
    renderTasks(id);
  });

};