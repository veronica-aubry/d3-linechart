
let filerId = 931;

let url = "http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/" + filerId + "/";

console.log(url);

$.getJSON(url, (json) => {
  var data = json;

  let dataSet = data.map((item) => {
    return {
      date: item.tran_date;
      amount: item.amount;
      type: item.book_type;
    }
  })

  console.log(dataSet[0])

})

const yScale = d3.scale.linear()
  .domain([0, d3.max(dataSet, data => {
    return data.amount
  })])
  .range([height, 0])

const xScale = d3.time.scale()
  .domain([d3.min(dataSet), data => {
    return data.date
  }, d3.max(dataSet), data => {return data.date}])
  .range([0, width])

let path = d3.svg.line()
  .x(d => (d.date))
  .y(d => (d.amount))
  .interpolate('basis')

var svg = d3.select()
