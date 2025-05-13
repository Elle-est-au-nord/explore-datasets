// Mediterranean map visualizing IOM Missing Migrants data
import { iom, color1, color2, colorAxes } from "./scriptChart1.js";
import * as d3Geo from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";

const yearExtent = d3.extent(iom, d => +d["Incident Year"]);
const countries = await d3.json("data/countries-50m.json");
const land = topojson.feature(countries, countries.objects.land);
const countrymesh = topojson.mesh(countries, countries.objects.countries, (a, b) => a !== b);
const width = 1100, height = 750;
const color1Stroke = "#D08770"; const color2Stroke = "#bf616a";

const projection = d3Geo.geoAzimuthalEqualArea() //geoOrthographic() 
    .center([5.42,39.14])                // GPS of location to zoom on
    .scale(1100)                    // This is like the zoom
    .translate([ 550, 250 ]);
const path = d3.geoPath(projection);

// Create the SVG container.
const svg = d3.select("#map2")
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
      .style("fill", d => d["Region of Incident"] === "Mediterranean" ? color1 : color2 )
      .attr("stroke", d => 
            d["Region of Incident"] === "Mediterranean" ? color1Stroke
            : color2Stroke )
      .attr("stroke-width", 1.5)
      .attr("fill-opacity", .35)
      .append("title") // Tooltips
      .text(d => `${d["Incident Date"]}\n${d["Total Number of Dead and Missing"]} victims in ${d["Country of Incident"]}\nRegion: ${d["Region of Incident"]}\nRoute: ${d["Migration Route"]}\nCause of death: ${d["Cause of Death"]}`)
      .attr("font-size", "12px");

// --------------- //
// ADD LEGEND      //
// --------------- //
// Construct the radius scale.
// Add legend: circles
const valuesToShow = [10, 100, 500, 1000];
const xCircle = 40;
const xLabel = 90;
svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", xCircle)
      .attr("cy", d => (90 - size(d)) )
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
      .attr('y1', d => (90 - size(d)*1.5) )
      .attr('y2', d => (90 - size(d)*1.5) )
      .attr('stroke', 'black')
      .style('stroke-dasharray', ('2,2'));

// Add legend: labels
svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel + 5)
      .attr('y', d => (90 - size(d) * 1.5 + 1) )
      .text( d =>  d + " victims")
      .attr("font-size", "11px")
      .attr('alignment-baseline', 'middle');

// Add colours legend
const colorLegend = [{name: "Mediterranean", fill: color1, stroke: color1Stroke},
                     {name: "other regions", fill: color2, stroke: color2Stroke}];

svg
  .append("rect")
  .attr("x", 5)
  .attr("y", 112)
  .attr("height", height/10 + 8)
  .attr("width", width/7 + 3)
  .attr("fill", colorAxes)
  .attr("fill-opacity", 0.4);
svg
  .append("rect")
  .attr("x", 5)
  .attr("y", 112)
  .attr("height", height/10 + 5)
  .attr("width", width/7)
  .attr("fill", "white")
  .attr("fill-opacity", 0.6);

svg
  .append("text")
    .attr("x", 15)
    .attr("y", 130)
    .text("Region of incidents:")
    .attr("font-size", "13px")
    .attr("alignment-baseline", "start");
svg
  .selectAll("colorLegend")
  .data(colorLegend)
  .enter()
  .append("circle")
    .attr("cx", 25)
    .attr("cy", (d, i) => 150 + i * 25)
    .attr("r", 10)
    .style("fill", d => d.fill)
    .attr("stroke", d => d.stroke)
    .attr("stroke-width", 1.5)
    .attr("fill-opacity", .4);
svg
  .selectAll("colorLegend")
  .data(colorLegend)
  .enter()
  .append("text")
    .attr("x", 40)
    .attr("y", (d, i) => 155 + i * 25)
    .text( d => d.name)
    .attr("font-size", "12px")
    .attr("alignment-baseline", "start");

// Source
// Add text below
svg
  .append("text")
    .attr("x", width - 6)
    .attr("y", height - 1.5)
    .text(`Source: the International Organization for Migration (IOM) Missing Migrants Project (missingmigrants.iom.int)`)
    .attr("font-size", "12px")
    .attr("fill",  "#15141A")
    .attr("text-anchor", "end");

