var shape = d3.select('.d3-shape')
  .append('svg')
    .attr({
      width: 600,
      height: 300 
    });

setInterval(function(){
  shape.append("circle")
    .attr({
      cx: 30,
      cy: 30,
      r: 200,
      fill: 'red'
    })
    .transition()
    .duration(5000)
    .attr("r", 10)
    .remove();

  shape.append("circle")
    .attr({
      cx: 100,
      cy: 100,
      r: 100,
      fill: 'green'
    })
    .transition()
    .duration(2000)
    .attr({
      cx: 500,
      cy: 100,
      fill: 'blue'
    })
    .remove();

},5000);