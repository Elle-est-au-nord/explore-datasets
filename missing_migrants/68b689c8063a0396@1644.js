import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Visualizing Missing Migrants 
## using data from IOM (International Organization for Migration)
#### Source: Missing Migrants Project data [missingmigrants.iom.int/downloads](https://missingmigrants.iom.int/downloads)
Attached file last downloaded from IOM website on February 18, 2025`
)}

function _2(htl){return(
htl.html`<fieldset>
  <legend>View migrants death and disappearance by year:</legend>
  <input type="button" class="filter" value="2014"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2015"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2016"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2017"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2018"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2019"/> 
  <input style="margin-left:7px;" type="button" class="filter" value="2020"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2021"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2022"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2023"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2024"/>
  <input style="margin-left:7px;" type="button" class="filter" value="2025"/> 
  <input style="margin-left:50px;" type="button" class="unfilter" value="Reset/All years"/>
</fieldset>`
)}

function _map(d3Geo,d3,chronoData,land,countrymesh,yearExtent,totalMigrantsDiedMissing)
{
  const width = 1200; const height = 700;
  const projection = d3Geo.geoEqualEarth()
    .center([0,20])                // GPS of location to zoom on
    .scale(250)                    // This is like the zoom
    .translate([ 550, 250 ]);
  const path = d3.geoPath(projection);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

  // Add a scale for bubble size
  const valueExtent = d3.extent(chronoData, d => +d["Total Number of Dead and Missing"])
  const size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([ 1, 40])  // Size in pixel

  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(land.features)
      .enter()
      .append("path")
        .attr("fill", "#b8b8b8")
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
    //.data(chronoData.sort((a,b) => (+b["Total Number of Dead and Missing"] - +a["Total Number of Dead and Missing"] )).filter((d,i) => i<1000 ))
    .data(chronoData)
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

  // Add title and explanation
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "#8B2323")
      .attr("x", width/3.1)
      .attr("y", 30)
      .attr("width", 150)
      .html("WHERE MIGRANTS DIED OR WENT MISSING")
      .attr("font-size", 18);

  const duration = "between " + yearExtent[0] + " and " + yearExtent[1];
  const totalNumber = d3.format(",.5r")(totalMigrantsDiedMissing);

  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "#0F1012")
      .attr("x", width/1.3)
      .attr("y", height-150)
      .attr("width", 100)
      .html(totalNumber + " migrants died or went missing " + duration)
      .attr("font-size", 20)
      .attr("font-style", "italic");

  // --------------- //
  // ADD LEGEND      //
  // --------------- //
  // Construct the radius scale.
  // Add legend: circles
  const valuesToShow = [10,100, 500, 1000];
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
      .text( d =>  d + " people")
      .style("font-size", 5)
      .attr('alignment-baseline', 'middle');

  return svg.node();
}


function _vBarPlot(d3,chronoData,byYearArr)
{
  // Declare the chart dimensions and margins.
  const width = 900;
  const height = 300;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 70;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleBand()
      .domain(Array.from(new Set(chronoData.map(d => d["Incident Year"]))).sort())
      .range([marginLeft, width - marginRight])
      .padding(0.1);
  
  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(byYearArr, d => d.value)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("class", "barchart")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Gridline
  var gridlines = d3.axisLeft()
                    .tickFormat("")
                    .tickSize(-width - marginLeft)
                    .scale(y);

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
     .attr("class", "grid")
     .call(gridlines)
        .style("color", "#b8b8b8")
        .style("opacity", .3);

  // Add a rect for each bar.
  svg.append("g")
      .attr("fill", "#495057")
      .style("stroke", "#b8b8b8")
      .style("opacity", .85)
    .selectAll()
    .data(byYearArr)
    .join("rect")
      .attr("class", d => ("bar year-" + d.year) )
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .append("title") // Tooltips
      .text(d => `${d3.format(",.4r")(d.value)} victims\nin ${d.year}`);;

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).tickPadding(8))
      .call(g => g.select(".domain").remove()); // remove axis line

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeInner(0))
      .call(g => g.select(".domain").remove()) // remove axis line
      .call(g => g.append("text")
          .attr("x", -marginLeft/2)
          .attr("y", 20)
          .attr("fill", "#495057")
          .attr("text-anchor", "start")
          .text("↑ Number of migrants who died or went missing"));

  // Return the SVG element.
  return svg.node();
}


function _calendar(byRegionsObj,byYear,parseNum,d3,totalMigrantsDiedMissing,yearExtent)
{
  // Data preparation
  const valuesForCal = Object.values(byRegionsObj); const namesForCal = Object.keys(byRegionsObj);
  const yearsForCal = Object.keys(byYear);
  const dataCal = Object.create(Object.prototype);
  // For each region create an array w/ arrays of data for each years in yearsForCal
  const valuesByYear = valuesForCal.map(
    regionData => yearsForCal.map(year => regionData.filter(data => data["Incident Year"] == year) )
  );
  dataCal.values = valuesByYear.map(
    regionData => regionData.map(
      yearlyDataArr => yearlyDataArr.reduce((acc, curr) => acc + parseNum(curr["Total Number of Dead and Missing"]), 0)
  ));
  dataCal.names = namesForCal;
  dataCal.years = yearsForCal.map(d => parseInt(d));
  
  // Declare the chart dimensions and margins.
  const marginTop = 20;
  const marginRight = 5;
  const marginBottom = 65;
  const marginLeft = 130;
  const rowHeight = 16;
  const width = 928;
  const height = rowHeight * dataCal.names.length + marginTop + marginBottom;

  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("class", "calendarChart")
      .attr("viewBox", [0, 0, width, height])
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

  // Create the scales.
  const x = d3.scaleLinear()
    .domain([d3.min(dataCal.years), d3.max(dataCal.years) + 1])
    .rangeRound([marginLeft, width - marginRight])

  const y = d3.scaleBand()
    .domain(dataCal.names)
    .rangeRound([marginTop, height - marginBottom])

  const color = d3.scaleSequentialSqrt([0, d3.max(dataCal.values, d => d3.max(d))], d3.interpolateGreys);

  // Append the axes.
  svg.append("g")
      .call(g => g.append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(d3.axisTop(x).ticks(null, "d"))
        .call(g => g.select(".domain").remove()))
      .call(g => g.append("g")
        .attr("transform", `translate(0,${height - marginBottom + 4})`)       
        .call(g => g.select(".domain").remove()));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select(".domain").remove());

  // Create a cell for each (state, year) value.
  const f = d3.format(",d"); const format2 = d3.format(".0%");
  const format = d => isNaN(d) ? "No victim"
      : d === 0 ? "No victim"
      : d === 1 ? "1 victim"
      : `${f(d)} victims`;

  svg.append("g")
    .selectAll("g")
    .data(dataCal.values)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${y(dataCal.names[i])})`)
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(dataCal.years[i]) + 1)
      .attr("width", (d, i) => x(dataCal.years[i] + 1) - x(dataCal.years[i]) - 1)
      .attr("height", y.bandwidth() - 1)
      .attr("fill", d => isNaN(d) ? "#eee" : d === 0 ? "#fff" : color(d))
    .append("title")
      .text((d, i) => `${format(d)} in ${dataCal.years[i]}`);

  // Most dangerous region for migrants
  const sumRegions = dataCal.values.map( values => values.reduce((a, b) => a + b, 0) );
  const highestCount = d3.max(sumRegions);
  const highestCountRegion = dataCal.names[sumRegions.indexOf(highestCount)];

  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "#0F1012")
      .attr("x", width-10)
      .attr("y", height-35)
      .attr("width", 100)
      .html(`${f(highestCount)} migrants (${format2(highestCount/totalMigrantsDiedMissing)}) died or went missing in the ${highestCountRegion}`)
      .attr("font-size", 19)
      .attr("font-style", "italic");
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "#0F1012")
      .attr("x", width-10)
      .attr("y", height-10)
      .attr("width", 100)
      .html(`making it the most perilous region between ${yearExtent[0]} and ${yearExtent[1]}.`)
      .attr("font-size", 19)
      .attr("font-style", "italic");

  // Highlight the year selected in red
  svg.node().highlightYear = function(year){
    const yearIdx = dataCal.years.indexOf(parseInt(year)); const valuesArr = dataCal.values.map(d => d[yearIdx]);
    const maxVict = d3.max(valuesArr); const maxLoc = dataCal.names[d3.maxIndex(valuesArr)];
    const yearWidth = x(year) - x(year-1); const sortedVals = valuesArr.toSorted((a, b) => a < b);
    const mostVict = sortedVals.slice(0, 3).map(d => Object.create({ value: d, name: dataCal.names[valuesArr.indexOf(d)] }) );
    // One red rect to highlight the year
    svg.append("rect").attr("class", "highlight")
      .attr("x", x(year) - yearWidth / 2 + 10)
      .attr("y", -2)
      .attr("width", yearWidth - 20)
      .attr("height", y.bandwidth())
      .attr("fill", "#8B2323").attr("fill-opacity", .4)
    // One red rectangle around data for the year
    svg.append("rect").attr("class", "highlight")
      .attr("x", x(year))
      .attr("y", marginTop)
      .attr("width", yearWidth)
      .attr("height", y.bandwidth() * dataCal.names.length )
      .attr("fill", "none").attr("stroke-opacity", .6)
      .attr("stroke-width", 3).attr("stroke", "#8B2323")
      .attr("rx", 3);
    // Write red text for the "top 3" locations (highest casualties)
    svg.append("g").attr("class", "highlight-max")
      .selectAll("text")
      .data(mostVict)
      .join("text")
        .attr("text-anchor", "middle")
        .attr("x", x(year) + yearWidth/2)
        .attr("y", (d) => y(d.name) + rowHeight/1.2)
        .html((d) => `${f(d.value)}`)
        .style("fill", "#c01c28")
        .attr("font-size", 14)
  }

  return Object.assign(svg.node(), {scales: {color}});
}


function _treemapChart(d3,chronoData,byCausesOfDeath,causesOfDeaths,parseNum,DOM,byCausesArr)
{
  const width = 1000; const height = 450; const marginRight = 300;
  // Specify the color scale.
  const greys = ["#212529", "#495057", "#ADB5BD", "#C0BFBC", "#E5E9F0", "#9A9996", "#868E96"];
  //const reds = ["#8B2323", "#BF4040", "#B85959", "#EC5757", "#B26060", "#B87C7C", "#D08770"];
  const reds = ["#d08770", "#B56161", "#A46771", "#9F5757", "#8B2323", "#B01313", "#E94747"];
  var color; var opacity;
  // Create the SVG container.
  const svg = d3.create("svg")
    .attr("class", "treemap")
    .attr("viewBox", [-32, 0, width+32, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; font-size: 11px;");

  svg.node().drawTreemap = function(timeFrame){
     var causesFiltered = new Map();
    // Prepare data
    const grpByCauses = d3.group(chronoData, (d) => d["Cause of Death"]); //Filter causes of death
    if(timeFrame !== "Reset/All years"){ //Keep all year or filter data by year
      for(const [key, value] of byCausesOfDeath){
        causesFiltered.set(key, value.filter( (d) => d["Incident Year"] == timeFrame ));
      }
      color = d3.scaleOrdinal(Array.from(causesOfDeaths), reds); opacity = 0.9;
    } else { 
      causesFiltered = grpByCauses;
      color = d3.scaleOrdinal(Array.from(causesOfDeaths), greys); opacity = 0.65;     
    }
    const dataByCauses = Array.from(causesFiltered,
                       m => new Object({
                         name: m[0],
                         value: m[1].reduce( (acc, curr) => acc + parseNum(curr["Number of Dead"]), 0,)
                       }));
    // Treemap dataset
    const causesData = { name: "Cause of death", children: dataByCauses};
    // Other variables 
    const yearlyTotal = causesData.children.reduce((acc, curr) => acc + curr.value, 0,);
    // Compute Treemap the layout.
    const root = d3.treemap()
      .tile(d3.treemapBinary)
      .size([width-marginRight, height])
      .padding(2)
      .round(true)
    (d3.hierarchy(causesData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value));
    // Add a cell for each leaf of the hierarchy.
    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);
    // Append a tooltip.
    leaf.append("title")
      .text(d => `${d.ancestors().reverse().map(d => d.data.name).join(": ")}\n${format(d.value)} victims`);
    // Append a color rectangle. 
    leaf.append("rect")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", opacity)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0);
    // Append a clipPath to ensure text does not overflow.
    leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
      .append("use")
      .attr("xlink:href", d => d.leafUid.href);
  
  function formatName(d) {
    if(d.data.name.length <= 16){
      return [d.data.name, `${format(d.value)} victims\n(${format2(d.value / yearlyTotal)})`];
    } else {
      return [d.data.name.substring(0,19), d.data.name.substring(19, 38),
              d.data.name.substring(38, 59), d.data.name.substring(59),
              `${format(d.value)} victims\n(${format2(d.value / yearlyTotal)})`];
      //return d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value));
    } 
  }
    // Append multiline text. The last line shows the value and has a specific formatting.
    leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => formatName(d))
    .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.2 + i}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .text(d => d);
    
    if(timeFrame !== "Reset/All years"){ 
      // Add text
      svg
      .append("text")
        .attr("class", "red-text")
        .attr("text-anchor", "end")
        .style("fill", "#8B2323")
        .attr("x", width-50)
        .attr("y", height/3)
        .attr("width", 100)
        .html(`including ${format(yearlyTotal)} deaths`)
        .attr("font-size", 20)
        .attr("font-style", "italic");
      svg
      .append("text")
        .attr("class", "red-text")
        .attr("text-anchor", "end")
        .style("fill", "#8B2323")
        .attr("x", width-50)
        .attr("y", height/3 + 25)
        .attr("width", 100)
        .html(`in ${timeFrame}`)
        .attr("font-size", 20)
        .attr("font-style", "italic");
    }
  }
  
  // Formatting
  const format = d3.format(",d"); const format2 = d3.format(".0%");
  // Add text for all Treemaps
  const total = byCausesArr.reduce((acc, curr) => acc + curr.value, 0,);
  const timeExtent = d3.extent(chronoData, d => +d["Incident Year"]);
  const duration = "between " + timeExtent[0] + " and " + timeExtent[1];
  const totalNumber = format(total);
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "#0F1012")
      .attr("x", width-50)
      .attr("y", height/8)
      .attr("width", 100)
      .html(`${totalNumber} migrants died`)
      .attr("font-size", 20)
      .attr("font-style", "italic");
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width-50)
    .attr("y", height/8 +25)
    .html(`on their migration route`)
    .attr("font-size", 20)
    .attr("font-style", "italic");
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width-50)
    .attr("y", height/8 +50)
    .html(`${duration}`)
    .attr("font-size", 20)
    .attr("font-style", "italic");

  return Object.assign(svg.node(), {scales: {color}});
}


function _7(md){return(
md`___`
)}

function _8(md){return(
md`#### CSS`
)}

function _9(htl){return(
htl.html`<style>
  input.unfilter{
    cursor:pointer;
    padding: 5px;
  }
  input.filter{
    cursor:pointer;
    background-color: #868E96;
    color: white;
    border-radius: 7px;
    padding: 5px;
  }
  input.filter:hover{
    background-color: #4c566a;
  }
  input.filter:focus{
    background-color: #8B2323;
  }
</style>`
)}

function _10(md){return(
md`___`
)}

function _11(md){return(
md`#### Events`
)}

function _12(d3,update,reset)
{
  d3.selectAll("input.filter").on("click", update);
  d3.selectAll("input.unfilter").on("click", reset);
}


function _13(md){return(
md`___`
)}

function _14(md){return(
md`#### Helper functions`
)}

function _15(treemapChart){return(
treemapChart.drawTreemap("Reset/All years")
)}

function _size(d3,valueExtent){return(
d3.scaleSqrt()
    .domain(valueExtent)
    .range([ 1, 40])
)}

function _update(d3,size,byYearArr,treemapChart,calendar){return(
function update(){
  const btn = d3.select(this);
  const grp = btn.property("value");
  const svg = d3.selectAll("svg");
  // Filter bubbles on the map
  svg.selectAll(".bubble:not( .year-"+grp+")")
    .transition().duration(1500).attr("r", 0);
  svg.selectAll(".bubble.year-"+grp)
    .transition().duration(1500).attr("r", (d) => size(+d["Total Number of Dead and Missing"]));
  // Highlight bar on the bar chart
  svg.selectAll(".bar:not( .year-"+grp+")")
    .attr("fill", "#495057").attr("stroke", "#b8b8b8").attr("fill-opacity", .85);
  svg.selectAll(".bar.year-"+grp)
    .attr("fill", "#8B2323").attr("stroke", "#D08770" ).attr("fill-opacity", .9);
  // Add text
  const map = d3.selectAll("svg.map");
  const barchart = d3.selectAll("svg.barchart");
  const number = d3.format(",.4r")(byYearArr.filter((d) => d.year == grp)[0].value);
  const bar = d3.select("rect.bar.year-"+grp)["_groups"][0][0];
  map.append("text").attr("class", "text-map t-"+grp)
      .style("fill", "#8B2323")
      .attr("x", 410)
      .attr("y", 580)
      .html("including " + number + " migrants in " + grp)
      .attr("font-size", 20).attr("font-style", "italic");
  map.select("text.text-map:not(.t-"+grp+")").remove();
  barchart.append("text").attr("class", "text-barchart t-"+grp)
    .style("fill", "#8B2323")
    .attr("x", parseInt(bar.getAttribute("x"))+10)
    .attr("y", parseInt(bar.getAttribute("y"))-5)
    .html(number)
    .attr("font-size", 18);
  barchart.select("text.text-barchart:not(.t-"+grp+")").remove();
  // Filter data and redraw treemap
  const treemap = d3.select("svg.treemap");
  treemap.selectAll("g").remove();
  treemap.selectAll("text.red-text").remove();
  treemapChart.drawTreemap(grp);
  // Highlight data on  calendar chart
  const calChart = d3.select("svg.calendarChart");
  calChart.selectAll("rect.highlight").remove(); calChart.selectAll("g.highlight-max").remove();
  calendar.highlightYear(grp);
}
)}

function _reset(d3,size,treemapChart){return(
function reset(){
  const svg = d3.selectAll("svg");
  svg.selectAll(".bubble").transition().duration(3000).style("opacity", 1)
    .attr("r", (d) => size(+d["Total Number of Dead and Missing"]));
  svg.selectAll(".bar").attr("fill", "#495057").attr("stroke", "#b8b8b8").attr("fill-opacity", .85);
  // Remove text
  const map = d3.selectAll("svg.map");
  const barchart = d3.selectAll("svg.barchart");
  map.select(".text-map").remove(); barchart.select(".text-barchart").remove();
  // Redraw default treemap
  const treemap = d3.select("svg.treemap");
  treemap.selectAll("g").remove();
  treemap.selectAll("text.red-text").remove();
  treemapChart.drawTreemap("Reset/All years");
  // Remove year highlight on  calendar chart
  const calChart = d3.select("svg.calendarChart");
  calChart.selectAll("rect.highlight").remove(); calChart.selectAll("g.highlight-max").remove();
}
)}

function _19(md){return(
md`___`
)}

function _20(md){return(
md`#### Data`
)}

function _yearExtent(d3,chronoData){return(
d3.extent(chronoData, d => +d["Incident Year"])
)}

function _valueExtent(d3,chronoData){return(
d3.extent(chronoData, d => +d["Total Number of Dead and Missing"])
)}

async function _iomData(FileAttachment)
{
  let output;
  
  output = await FileAttachment("Missing_Migrants_Global_Figures_allData.csv")
    .csv()
    .then((d) => d.filter((e) => e.Coordinates !== ""));
  
  return output;
}


function _chronoData(iomData){return(
iomData.sort((a, b) => new Date(a["Incident Date"]) - new Date(b["Incident Date"]))
)}

function _world(FileAttachment){return(
FileAttachment("countries-110m.json").json()
)}

function _land(topojson,world){return(
topojson.feature(world, world.objects.land)
)}

function _countrymesh(topojson,world){return(
topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
)}

function _land110(FileAttachment){return(
FileAttachment("land-110m.json").json()
)}

function _land50(FileAttachment){return(
FileAttachment("land-50m.json").json()
)}

function _outline(){return(
{type: "Sphere"}
)}

function _graticule(d3Geo){return(
d3Geo.geoGraticule10()
)}

function _byYear(chronoData){return(
Object.groupBy(chronoData, (d) => d["Incident Year"])
)}

function _byYearIter(d3,chronoData){return(
d3.group(chronoData, d => d["Incident Year"])
)}

function _byYearArr(byYearIter){return(
Array.from(byYearIter,
                       m => new Object({
                         year: m[0],
                         value: m[1].reduce( (acc, curr) => acc + parseInt(curr["Total Number of Dead and Missing"]), 0,)
                       }))
)}

function _totalMigrantsDiedMissing(byYearArr){return(
byYearArr.reduce( (acc, curr) => acc + curr.value, 0,)
)}

function _causesOfDeaths(chronoData){return(
new Set(chronoData.map( cases => cases["Cause of Death"] ))
)}

function _byCausesOfDeath(d3,chronoData){return(
d3.group(chronoData, (d) => d["Cause of Death"])
)}

function _parseNum(){return(
function parseNum(x) {
  const parsed = Number.parseInt(x);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}
)}

function _byCausesArr(byCausesOfDeath,parseNum){return(
Array.from(byCausesOfDeath,
                       m => new Object({
                         name: m[0],
                         value: m[1].reduce( (acc, curr) => acc + parseNum(curr["Number of Dead"]), 0,)
                       }))
)}

function _causesByYear(){return(
new Map()
)}

function _41(byCausesOfDeath,causesByYear)
{
  for(const [key, value] of byCausesOfDeath){
    causesByYear.set(key, value.filter( (d) => d["Incident Year"] == 2014 ));
  }
}


function _42(causesByYear){return(
causesByYear
)}

function _test1(chronoData){return(
chronoData.filter( (d) => d["Incident Year"] == "2018" )
)}

function _byRegions(d3,chronoData){return(
d3.group(chronoData, (d) => d["Region of Incident"])
)}

function _byRegionsObj(byRegions){return(
Object.fromEntries(byRegions)
)}

function _inAmericas(d3,chronoData){return(
d3.filter( chronoData, d => d["Region of Incident"] === "North America" || d["Region of Incident"] === "Central America" || d["Region of Incident"] === "Caribbean" || d["Region of Incident"] === "South America")
)}

function _routesInAmericas(d3,inAmericas){return(
d3.group(inAmericas, (d) => d["Migration Route"])
)}

function _aroundTheMediterranean(d3,chronoData){return(
d3.filter( chronoData, d => d["Region of Incident"] === "Europe" || d["Region of Incident"] === "Mediterranean" || d["Region of Incident"] === "Northern Africa" )
)}

function _49(md){return(
md`___`
)}

function _50(md){return(
md`#### Imports`
)}

function _d3Geo(require){return(
require("d3-geo@3", "d3-geo-projection@4")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Missing_Migrants_Global_Figures_allData.csv", {url: new URL("./files/daa56fe2454e8a07e7bdd6d037530cdbed83e92789f177498e95b207b647e71fdeee8033ab70531851421de6d1b5b28101d2f15d2c00e03a2cf1ab97af5a29fd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["land-50m.json", {url: new URL("./files/88c7319e70fd6af7ed36dff96f6e39837ef2a3f1733770008554268221238bef718ddbb07045a3e2b7a531f96d89877b7468facbaaf1aaee63b3a98b67b9cfbe.json", import.meta.url), mimeType: "application/json", toString}],
    ["land-110m.json", {url: new URL("./files/eb3cf2004901ac67c600e74bb895394d6e415f6d6dcd96e1576eb8b6f0f7ca2d2277b9165904b6abc883f7e2c85210e9ada547aeeb72390815c7024c804b4577.json", import.meta.url), mimeType: "application/json", toString}],
    ["countries-110m.json", {url: new URL("./files/7d83b04cc7f7fd279cd676dac7b983bfd51cf1d0345e9ca92ccfd4ae966b9725c3d3ba0e0296f281fcb7525daaf01a7fcb9f9641aeb23591aa9d255f82db3e33.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer("map")).define("map", ["d3Geo","d3","chronoData","land","countrymesh","yearExtent","totalMigrantsDiedMissing"], _map);
  main.variable(observer("vBarPlot")).define("vBarPlot", ["d3","chronoData","byYearArr"], _vBarPlot);
  main.variable(observer("calendar")).define("calendar", ["byRegionsObj","byYear","parseNum","d3","totalMigrantsDiedMissing","yearExtent"], _calendar);
  main.variable(observer("treemapChart")).define("treemapChart", ["d3","chronoData","byCausesOfDeath","causesOfDeaths","parseNum","DOM","byCausesArr"], _treemapChart);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["d3","update","reset"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["treemapChart"], _15);
  main.variable(observer("size")).define("size", ["d3","valueExtent"], _size);
  main.variable(observer("update")).define("update", ["d3","size","byYearArr","treemapChart","calendar"], _update);
  main.variable(observer("reset")).define("reset", ["d3","size","treemapChart"], _reset);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("yearExtent")).define("yearExtent", ["d3","chronoData"], _yearExtent);
  main.variable(observer("valueExtent")).define("valueExtent", ["d3","chronoData"], _valueExtent);
  main.variable(observer("iomData")).define("iomData", ["FileAttachment"], _iomData);
  main.variable(observer("chronoData")).define("chronoData", ["iomData"], _chronoData);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("land")).define("land", ["topojson","world"], _land);
  main.variable(observer("countrymesh")).define("countrymesh", ["topojson","world"], _countrymesh);
  main.variable(observer("land110")).define("land110", ["FileAttachment"], _land110);
  main.variable(observer("land50")).define("land50", ["FileAttachment"], _land50);
  main.variable(observer("outline")).define("outline", _outline);
  main.variable(observer("graticule")).define("graticule", ["d3Geo"], _graticule);
  main.variable(observer("byYear")).define("byYear", ["chronoData"], _byYear);
  main.variable(observer("byYearIter")).define("byYearIter", ["d3","chronoData"], _byYearIter);
  main.variable(observer("byYearArr")).define("byYearArr", ["byYearIter"], _byYearArr);
  main.variable(observer("totalMigrantsDiedMissing")).define("totalMigrantsDiedMissing", ["byYearArr"], _totalMigrantsDiedMissing);
  main.variable(observer("causesOfDeaths")).define("causesOfDeaths", ["chronoData"], _causesOfDeaths);
  main.variable(observer("byCausesOfDeath")).define("byCausesOfDeath", ["d3","chronoData"], _byCausesOfDeath);
  main.variable(observer("parseNum")).define("parseNum", _parseNum);
  main.variable(observer("byCausesArr")).define("byCausesArr", ["byCausesOfDeath","parseNum"], _byCausesArr);
  main.variable(observer("causesByYear")).define("causesByYear", _causesByYear);
  main.variable(observer()).define(["byCausesOfDeath","causesByYear"], _41);
  main.variable(observer()).define(["causesByYear"], _42);
  main.variable(observer("test1")).define("test1", ["chronoData"], _test1);
  main.variable(observer("byRegions")).define("byRegions", ["d3","chronoData"], _byRegions);
  main.variable(observer("byRegionsObj")).define("byRegionsObj", ["byRegions"], _byRegionsObj);
  main.variable(observer("inAmericas")).define("inAmericas", ["d3","chronoData"], _inAmericas);
  main.variable(observer("routesInAmericas")).define("routesInAmericas", ["d3","inAmericas"], _routesInAmericas);
  main.variable(observer("aroundTheMediterranean")).define("aroundTheMediterranean", ["d3","chronoData"], _aroundTheMediterranean);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("d3Geo")).define("d3Geo", ["require"], _d3Geo);
  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
