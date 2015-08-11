describe('list display functions', function() {

  it("renderList is a fucntion", function() {
    var list = { 
      title: "new list"
    };
    
    assert.ok(renderList(park)), "renderlist is a function");
  });

});