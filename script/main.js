$(function() {
  var canvas = document.getElementById('canvas');
  if(!canvas || !canvas.getContext)return false;
  var context = canvas.getContext('2d');
     
  var startX,
      startY,
      x,
      y,
      borderWidth = 10,
      isDrawing = false;
 
  $('canvas').mousedown(function(e){
    isDrawing = true;
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
    })
  .mousemove(function(e){
    if(!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(x,y);
    context.stroke();
    startX = x;
    startY =y;
  })
  .mouseup(function(){
    isDrawing = false;
  })
  .mouseleave(function(){
    isDrawing =false;
  });
 })