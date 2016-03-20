


var data = _.map( [58.936,78.224,18.4676,10.435, 30.552, 40.765, 20.866, 90.34],
function(d) {
  return {
    x: d + 3,
    y: 250 - d,
    r: 2
  };
});

var margin = {top:0, right:0, bottom:15, left:0};

var h = 250 - margin.top - margin.bottom;

var w = 600 - margin.left - margin.right;

var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function(data) {
    return data.y;
  }
  )])
  .range([0, h])

var xScale = d3.scale.linear()
  .domain([0,100])
  .range([0,w])

var colorScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range(['gold', 'tomato'])

var svg = d3.select('#barChart').append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate('+margin.left+', '+margin.top+')');

svg.selectAll('circle')
.data(data)
.enter()
.append('circle')
.attr('class', 'scatter')
.attr('cx', function(data){
  return xScale(data.x)
})
.attr('cy', function(data){
  return yScale(data.y)
})
.attr('r', function(data){
  return data.r
})
.attr('width', xScale.rangeBand)
.style('height', function(data){
    return yScale(data)
})
.attr('fill', function(data, index){
  return colorScale(data)
})
