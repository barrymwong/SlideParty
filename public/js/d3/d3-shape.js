var shape = d3.select('#d3-shape')
  .append('svg')
    .attr({
      width: 600,
      height: 300 
    });

  shape.append("circle")
    .attr({
      x: 100,
      y: 400,
      cx: 30,
      cy: 30,
      r: 30,
      fill: 'red'
    })
    .transition()
    .duration(10000)
    .attr("r", 10);

  shape.append("circle")
    .attr({
      cx: 200,
      cy: 200,
      r: 100,
      fill: 'green'
    });
