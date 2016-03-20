


var data = _.map( [58.936,78.224,18.4676,10.435, 30.552, 40.765, 20.866, 90.34],
function(d, index) {
  return {
    x: index * 10,
    y: d,
    r: 2
  };
});

var margin = {top:10, right:10, bottom:30, left:30};

var h = 250 - margin.top - margin.bottom;

var w = 600 - margin.left - margin.right;

var yScale = d3.scale.linear()
  .domain([0, d3.max(data, function(data) {
    return data.y;
  }
  )])
  .range([h,0])

var xScale = d3.scale.linear()
  .domain([0,100])
  .range([0,w])

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(10)
  .tickSize(12)
  .outerTickSize(2)
  .tickPadding(0)

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .ticks(10)
  .tickSize(3)
  .outerTickSize(2)
  .tickPadding(0)

var colorScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range(['gold', 'tomato'])

var svg = d3.select('#content').append('svg')
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

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0 '+(h+0)+')')
  .call(xAxis)

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis)
