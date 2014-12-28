$(function() {
  var noteCanvas = document.getElementById('note');
  if(!noteCanvas || !noteCanvas.getContext){
    return false
  };
  var noteContext = noteCanvas.getContext('2d');

  var penCanvas = document.getElementById('pen');
  if(!penCanvas || !penCanvas.getContext){
    return false;
  }

  var penContext = penCanvas.getContext('2d');

  var image = new Image();

  image.onload = function() {
    penContext.drawImage(image, 0, 0);
  };

  image.src = "image/pen.png";

  $(penCanvas).draggable({ containment: '#screen',
                           scroll: false });
     
  var start = new Position(0,0);
  var end = new Position(0,0);
  var isDrawing = false;
  var noteOffset = new Position($(noteCanvas).offset().left, $(noteCanvas).offset().top);

  $(penCanvas).mousedown(function(e){
      isDrawing = true;
      start.x = e.pageX - noteOffset.x;
      start.y = e.pageY - noteOffset.y;
    })
  .mousemove(function(e){
    
    if(!isDrawing) {
      return;
    }

    end.x = e.pageX - noteOffset.x;
    end.y = e.pageY - noteOffset.y;
    noteContext.beginPath();
    noteContext.moveTo(start.x, start.y);
    noteContext.lineTo(end.x, end.y);
    noteContext.stroke();
    start.x = end.x;
    start.y = end.y;
   })
  .mouseup(function(){
    isDrawing = false;
  })

  $('#clear-button').click(function(){
      noteContext.clearRect(0, 0, noteCanvas.width, noteCanvas.height);
    })

});

function Position(x,y){
  this.x = x;
  this.y = y;
  return this;
}
