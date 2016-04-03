var margin = {
  top: 20,
  right: 50,
  bottom: 30,
  left: 70
}

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var filerId = 14172;

var url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + filerId + '/';

d3.json(url, function(json) {
  var data = json;
  var parseDate = d3.time.format('%Y-%m-%d').parse;
  var dataSet = data.map(function(item) {
    return {
      date: parseDate(item.tran_date),
      amount: +item.amount
    }
  })


var dateSort = _(dataSet).groupBy(function (item)
  {return item.date}
);

dataSet = _(dateSort).map(function(items) {
  var item = items[0];
  item.amount = _.reduce(items, function(memo, item) {
    return memo + item.amount;
  }, 0)
  return item;
});

  console.log(dataSet);

  var dates = _.map(dataSet, 'date');


  var x = d3.time.scale()
    .domain(d3.extent(dates))
    .range([0, width]);
  var y = d3.scale.linear()
    .domain([0, d3.max(dataSet, function(d) {
      return d.amount;
    })])

    .range([height, 0]);


  var xAxis = d3.svg.axis().scale(x)
    .orient('bottom').ticks(6);
  var yAxis = d3.svg.axis().scale(y)
    .orient('left').ticks(10);

  var svg = d3.select('#content').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  var path = d3.svg.line()
    .x(function(d) {
      return x(d.date)
    })
    .y(function(d) {
      return y(d.amount)
    })

    .interpolate('basis')

  svg.append('path')
    .attr('class', 'line')
    .attr('d', path(dataSet))
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
})
