// Scatter plot visualizing IOM Missing Migrants data

// Colors
export const colorAxes = "#495057";
export const color1 = "#8B2323";
export const color2 = "#e03131";//"#c98c8c";

// Data
export const iom = await d3.csv("data/Missing_Migrants_Global_Figures_allData.csv")
                    .then((d) => d.filter((e) => e.Coordinates !== ""));

const iomData = iom.sort((a, b) => new Date(a["Incident Date"]) - new Date(b["Incident Date"]));

const years = Array.from(new Set(iomData.map(d => d["Incident Year"])));

const dataByYear = Object.groupBy(iomData, (d) => d["Incident Year"]);

const dataByRegion = Object.values(dataByYear)
                       .map( data => Object.groupBy(data, (d) => d["Region of Incident"]) );

var plotData = [];
dataByRegion.map(
  (data, index) => Object.values(data).map(d =>
                                           plotData.push(new Object({
                                             year: years[index],
                                             region: d[0][
"Region of Incident"],
                                             victims: d.reduce( (acc, curr) => 
                                                                acc + parseInt(curr["Total Number of Dead and Missing"]), 0,)}))));

// Declare the chart dimensions and margins.
const width = 640, height = 420,
      marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleLinear()
    .domain(d3.extent(plotData, d => d.year)).nice()
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain(d3.extent(plotData, d => parseInt(d.victims))).nice()
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.select("#chart1")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 9px sans-serif;");

// Add the axes.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, "Y") // Format ticks as years
                          .tickSizeInner(0)
                          .tickPadding(7))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", marginBottom - 4)
        .attr("fill", colorAxes));

svg.append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y).tickSizeInner(0).tickPadding(7))
  .call(g => g.select(".domain").remove())
  .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", colorAxes)
      .attr("text-anchor", "start")
      .text("↑ People who died or went missing"));

// Add grid background
svg.append("rect")
    .attr("x", marginLeft)
    .attr("y", marginTop)
    .attr("width", width - marginLeft - marginRight)
    .attr("height", height - marginTop - marginBottom)
    .attr("fill", "#adb5bd")
    .attr("fill-opacity", 0.3);

// Create the grid.
svg.append("g")
  .attr("fill", "#adb5bd")
  .attr("stroke", colorAxes)
  .attr("stroke-opacity", 0.07)
  .call(g => g.append("g")
    .selectAll("line")
    .data(x.ticks())
    .join("line")
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d))
      .attr("y1", marginTop)
      .attr("y2", height - marginBottom))
  .call(g => g.append("g")
    .selectAll("line")
    .data(y.ticks())
    .join("line")
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d))
      .attr("x1", marginLeft)
      .attr("x2", width - marginRight));

// Add a layer of circles.
svg.append("g")
    .attr("stroke-width", 2)
    .attr("fill", "none")
  .selectAll("circle")
  .data(plotData)
  .join("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.victims))
    .attr("stroke", d => d.region === "Mediterranean" ? color1 : color2)
    .attr("stroke-opacity", d => d.region === "Mediterranean" ? 1 : 0.75)
    .attr("r", 4)
    .append("title") // Tooltips
    .text(d => `${d.region}\n${d3.format(",.4r")(d.victims)} victims`);

// Source
// Add text below
svg
  .append("text")
    .attr("x", width - marginRight)
    .attr("y", height - 1.5)
    .text(`Source: the International Organization for Migration (IOM) Missing Migrants Project (missingmigrants.iom.int)`)
    .attr("font-size", "7px")
    .attr("fill",  "#15141A")
    .attr("text-anchor", "end");

// Add legend
svg
  .append("rect")
  .attr("x", width/1.5 - 30)
  .attr("y", 5)
  .attr("height", height/10 + 7)
  .attr("width", width/3 + 27)
  .attr("fill", colorAxes)
  .attr("fill-opacity", 0.4);
svg
  .append("rect")
  .attr("x", width/1.5 - 30)
  .attr("y", 5)
  .attr("height", height/10 + 5)
  .attr("width", width/3 + 25)
  .attr("fill", "white")
  .attr("fill-opacity", 0.6);

svg
  .append("text")
    .attr("x", width/1.5)
    .attr("y", 20)
    .text("Crossing the Mediterranean Sea")
    .attr("font-size", "11px")
    .attr("font-weight", "bold")
    .attr("fill",  "#15141A" )
    .attr("text-anchor", "start");
svg
  .append("text")
    .attr("x", width/1.5)
    .attr("y", 40)
    .text("On other migration routes")
    .attr("font-size", "11px")
    .attr("font-weight", "bold")
    .attr("fill",  "#15141A" )
    .attr("text-anchor", "start");

svg
  .append("circle")
  .attr("cx", x("2021"))
  .attr("cy", y(5560))
  .attr("r", 4)
  .attr("fill", "none")
  .attr("stroke", color1)
  .attr("stroke-width", 2);
    
svg
  .append("circle")
  .attr("cx", x("2021"))
  .attr("cy", y(5250))
  .attr("r", 4)
  .attr("fill", "none")
  .attr("stroke", color2)
  .attr("stroke-width", 2);
