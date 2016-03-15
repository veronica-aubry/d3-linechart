var legislator = {
  name: 'Ron Wyden',
  sectors: [
    {
      money_from_pacs: 589360,
      money_from_indivs: 1109475,
      sector_name: 'Finance/Insur/RealEst'
    },
    {
      money_from_pacs: 782240,
      money_from_indivs: 479476,
      sector_name: 'Health'
    },
    {
      money_from_pacs: 184676,
      money_from_indivs: 638566,
      sector_name: 'Lawyers & Lobbyists'
    },
    {
      money_from_pacs: 104350,
      money_from_indivs: 71799,
      sector_name: 'Transportation'
    }
  ]
}

var data = [];

for (var i = 0; i < legislator.sectors.length; i++){
	var item = legislator.sectors[i].money_from_pacs
	data.push(item)
}

// var data = [58.936,78.224,18.4676,10.435]

var h = 250;
var w = 600;

var yScale = d3.scale.linear()
  .domain([0, d3.max(data)*1.1])
  .range([0, h])

var xScale = d3.scale.ordinal()
  .domain(data)
  .rangeBands([0,w], 0.5, 0.25 )

var colorScale = d3.scale.quantize()
  .domain([0, 1, data.length-1, data.length])
  .range(['tomato', 'gold', 'cornflowerBlue'])

var svg = d3.select('#barChart').append('svg')
  .attr('width', w)
  .attr('height', h)

svg.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr('class', 'bar')
.attr('x', function(data, index){
  return xScale(data)
})
.attr('y', function(data){
  return h - yScale(data)
})
.attr('width', xScale.rangeBand)
.style('height', function(data){
    return yScale(data)
})
.attr('fill', function(data, index){
  return colorScale(index)
})
