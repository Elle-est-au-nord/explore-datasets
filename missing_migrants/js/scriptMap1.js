// World map visualizing IOM Missing Migrants data
import { iom } from "./scriptChart1.js";
import * as d3Geo from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";

const yearExtent = d3.extent(iom, d => +d["Incident Year"]);
const countries = await d3.json("data/countries-50m.json");
const land = topojson.feature(countries, countries.objects.land);
const countrymesh = topojson.mesh(countries, countries.objects.countries, (a, b) => a !== b);

const width = 1200, height = 700;
const projection = d3Geo.geoEqualEarth()
    .center([0,20])                // GPS of location to zoom on
    .scale(250)                    // This is like the zoom
    .translate([ 550, 250 ]);
const path = d3.geoPath(projection);

// Create the SVG container.
const svg = d3.select("#map1")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 9px sans-serif;");

// Add a scale for bubble size
const valueExtent = d3.extent(iom, d => +d["Total Number of Dead and Missing"])
const size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([ 1, 40])  // Size in pixel

// Draw the map
svg.append("g")
      .selectAll("path")
      .data(land.features)
      .enter()
      .append("path")
        .attr("fill", "#adb5bd")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "none")
      .style("opacity", .3)

// Add a white mesh.
svg.append("path")
    .datum(countrymesh)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("d", path);

// Add circles:
svg.selectAll("myCircles")
    //.data(iom.sort((a,b) => (+b["Total Number of Dead and Missing"] - +a["Total Number of Dead and Missing"] )).filter((d,i) => i<1000 ))
    .data(iom)
    .enter()
    .append("circle")
      .attr("class", d => ("bubble year-" + d["Incident Year"]) )
      .attr("cx", d => projection([+d["Coordinates"].split(", ")[1], +d["Coordinates"].split(", ")[0]])[0] )
      .attr("cy", d => projection([+d["Coordinates"].split(", ")[1], +d["Coordinates"].split(", ")[0]])[1] )
      .attr("r", d => size(+d["Total Number of Dead and Missing"]) )
      .style("fill", "#8B2323" )
      .attr("stroke", "#D08770" )
      .attr("stroke-width", 1)
      .attr("fill-opacity", .3)
      .append("title") // Tooltips
      .text(d => `${d["Incident Date"]}\n${d["Incident Type"]} in ${d["Country of Incident"]}\n${d["Total Number of Dead and Missing"]} victims`);

// --------------- //
// ADD LEGEND      //
// --------------- //
// Construct the radius scale.
// Add legend: circles
const valuesToShow = [10, 100, 500, 1000];
const xCircle = 70;
const xLabel = 120;
svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", xCircle)
      .attr("cy", d => (height/1.055 - size(d)) )
      .attr("r", d => size(d) )
      .style("fill", "none")
      .attr("stroke", "#D08770");

// Add legend: segments
svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', d => (xCircle + size(d)) )
      .attr('x2', xLabel)
      .attr('y1', d => (height/1.055 - size(d)*1.5) )
      .attr('y2', d => (height/1.055 - size(d)*1.5) )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'));

// Add legend: labels
svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel + 5)
      .attr('y', d => (height/1.055 - size(d)*1.5 + 1) )
      .text( d =>  d + " victims")
      .attr("font-size", "9px")
      .attr('alignment-baseline', 'middle');

// Source
// Add text below
svg
  .append("text")
    .attr("x", width - 50)
    .attr("y", height - 10)
    .text(`Source: the International Organization for Migration (IOM) Missing Migrants Project (missingmigrants.iom.int)`)
    .attr("font-size", "10px")
    .attr("fill",  "#15141A")
    .attr("text-anchor", "end");

