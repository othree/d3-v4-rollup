import { timeFormat, timeParse } from 'd3-time-format';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { line } from 'd3-shape';
import { select } from 'd3-selection';
import { csv } from 'd3-request';
import { extent } from 'd3-array';
import yDomain from './modules/y-domain';

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = timeParse("%d-%b-%y");
var formatTime = timeFormat("%e %B");

// Set the ranges
var x = scaleTime().range([0, width]);
var y = scaleLinear().range([height, 0]);

// Define the axes
var xAxis = axisBottom(x).ticks(5)
    .tickSizeInner(0)
    .tickSizeOuter(0)
    .tickPadding(10);

var yAxis = axisLeft(y).ticks(3)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(10);

// Define the line
var valueline = line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// Adds the svg canvas
var svg = select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
csv("/data/data.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(extent(data, function(d) { return d.date; }));
    y.domain(yDomain(data));

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")	
        .data(data)			
    .enter().append("circle")								
        .attr("r", 5)		
        .attr("cx", function(d) { return x(d.date); })		 
        .attr("cy", function(d) { return y(d.close); })		

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
});
