import define1 from "./576f8943dbfbd395@114.js";

function _1(md){return(
md`# Journalists & media workers killed (2018 to 2023)

#### Exploring CPJ's (Committee to Protect Journalists) database and highlighting locations with highest number of journalists & media workers killed in a year`
)}

function _2(md){return(
md`Note: CAR = Central African Republic, DRC = Democratic Republic of the Congo, OPTs = Occupied Palestinian Territories`
)}

async function _3(Plot,FileAttachment,data2018to2023){return(
Plot.plot({
  marginRight: 80,
  width: 900,
  height: 600,
  grid: true,
  nice: true,
  x: {ticks: 6, interval: 1, tickFormat: Number.prototype.toLocaleString(undefined, {useGrouping: false})},
  y: {tickPadding: 15},
  style: {
    padding: 10,
    color: "black",
    background: `url(${await FileAttachment("photo-by-michael-guerrero@1.jpg").url()})`,
    backgroundSize: "cover"
  },
  marks: [
    Plot.dot(data2018to2023,
      Plot.stackY2({
        order: "deaths",
        x: "year",
        y: "deaths",
        r: "deaths",
        stroke: "#fff",
        fill: "color",
        title: (d => (d.location + " - " + d.year + ": " + d.deaths + " death(s)")),
      })),
    Plot.ruleY([0]),
    Plot.text(data2018to2023, Plot.stackY2({
      order: "deaths",
      x: "year",
      y: "deaths",
      text: (d => ( (d.deaths >= 5) ? d.location : "" )), 
      textAnchor: "start", dx: 25}))
  ]
})
)}

function _data2018to2023(FileAttachment){return(
FileAttachment("press-workers-deaths-for-viz@2.csv").csv({typed: true})
)}

function _5(md){return(
md`## 89 Journalists & media workers killed in 2018
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2018&end_year=2018&group_by=year)
`
)}

function _chart2018(pack,data2018,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2018);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _7(html,DOM,rasterize,chart2018,serialize){return(
html`
${DOM.download(await rasterize(chart2018), null, "Download as PNG")}
${DOM.download(await serialize(chart2018), null, "Download as SVG")}
`
)}

function _8(md){return(
md`## 52 Journalists & media workers killed in 2019
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2019&end_year=2019&group_by=year)
`
)}

function _chart2019(pack,data2019,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2019);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _10(html,DOM,rasterize,chart2019,serialize){return(
html`
${DOM.download(await rasterize(chart2019), null, "Download as PNG")}
${DOM.download(await serialize(chart2019), null, "Download as SVG")}
`
)}

function _11(md){return(
md`## 50 Journalists & media workers killed in 2020
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2020&end_year=2020&group_by=year)
`
)}

function _chart2020(pack,data2020,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2020);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _13(html,DOM,rasterize,chart2020,serialize){return(
html`
${DOM.download(await rasterize(chart2020), null, "Download as PNG")}
${DOM.download(await serialize(chart2020), null, "Download as SVG")}
`
)}

function _14(md){return(
md`## 45 Journalists & media workers killed in 2021
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2021&end_year=2021&group_by=year)
`
)}

function _chart2021(pack,data2021,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2021);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _16(html,DOM,rasterize,chart2021,serialize){return(
html`
${DOM.download(await rasterize(chart2021), null, "Download as PNG")}
${DOM.download(await serialize(chart2021), null, "Download as SVG")}
`
)}

function _17(md){return(
md`## 68 Journalists & media workers killed in 2022
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2022&end_year=2022&group_by=year)
`
)}

function _chart2022(pack,data2022,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2022);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _19(html,DOM,rasterize,chart2022,serialize){return(
html`
${DOM.download(await rasterize(chart2022), null, "Download as PNG")}
${DOM.download(await serialize(chart2022), null, "Download as SVG")}
`
)}

function _20(md){return(
md`## 95 Journalists & media workers killed in 2023
#### source: Committee to Protect Journalists (CPJ), explore the dataset [here](https://cpj.org/data/killed/?status=Killed&motiveConfirmed%5B%5D=Confirmed&motiveUnconfirmed%5B%5D=Unconfirmed&type%5B%5D=Journalist&type%5B%5D=Media%20Worker&start_year=2023&end_year=2023&group_by=year)
`
)}

function _chart2023(pack,data2023,d3,DOM,width,height,fillColor,lightColor,darkColor,fit,format)
{
  const root = pack(data2023);
  const leaves = root.leaves().filter(d => d.depth && d.value);

  const svg = d3.select(DOM.svg(width, height))
      .style("background", "#fff")
      .style("width", "70%")
      .style("height", "auto");

  svg.append("g")
      .attr("fill", fillColor)
    .selectAll("circle")
    .data(leaves)
    .enter().append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.data.color);

  svg.append("g")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
    .selectAll("text")
    .data(leaves)
    .enter().append("text")
      .attr("fill", d => d3.lab(d.data.color).l < 60 ? lightColor : darkColor)
      .attr("transform", d => {
        const {lines, radius} = fit(d.data.name, isNaN(d.data.value) ? undefined : format(d.data.value));
        d.lines = lines;
        if (!isNaN(d.data.value)) d.lines[d.lines.length - 1].value = true;
        return `translate(${d.x},${d.y}) scale(${Math.min(3, Math.max(0, (d.r - 5) / radius))})`;
      })
    .selectAll("tspan")
    .data(d => d.lines)
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, data) => (i - data.length / 2 + 0.8) * 12)
      .text(d => d.text)
    .filter(d => d.value)
      .attr("font-weight", 300)
      .attr("fill-opacity", 0.5);

  return svg.node();
}


async function _22(html,DOM,rasterize,chart2023,serialize){return(
html`
${DOM.download(await rasterize(chart2023), null, "Download as PNG")}
${DOM.download(await serialize(chart2023), null, "Download as SVG")}
`
)}

function _data2018(){return(
[
{name: "Afghanistan", value: 16, color: "#333"},
{name: "Brazil", value: 3, color: undefined},
{name: "Bulgaria", value: 1, color: undefined},
{name: "Central African Republic", value: 3, color: undefined},
{name: "Colombia", value: 3, color: undefined},
{name: "Ethiopia", value: 1, color: undefined},
{name: "Guatemala", value: 1, color: undefined},
{name: "India", value: 5, color: undefined},
{name: "Indonesia", value: 1, color: undefined},
{name: "Israel and the Occupied Palestinian Territory", value: 2, color: undefined},
{name: "Libya", value: 1, color: undefined},
{name: "Mexico", value: 11, color: undefined},
{name: "Nicaragua", value: 1, color: undefined},
{name: "Pakistan", value: 2, color: undefined},
{name: "Philippines", value: 4, color: undefined},
{name: "Russia", value: 1, color: undefined},
{name: "Saudi Arabia", value: 1, color: undefined},
{name: "Sierra Leone", value: 1, color: undefined},
{name: "Slovakia", value: 1, color: undefined},
{name: "Somalia", value: 7, color: undefined},
{name: "Syria", value: 9, color: undefined},
{name: "USA", value: 6, color: undefined},
{name: "Yemen", value: 8, color: undefined}
]
)}

function _data2019(){return(
[
{name: "Afghanistan", value: 2, color: undefined},
{name: "Brazil", value: 2, color: undefined},
{name: "Cameroon", value: 1, color: undefined},
{name: "Chad", value: 1, color: undefined},
{name: "Colombia", value: 2, color: undefined},
{name: "Democratic Republic of the Congo", value: 1, color: undefined},
{name: "Ghana", value: 1, color: undefined},
{name: "Haiti", value: 2, color: undefined},
{name: "Honduras", value: 4, color: undefined},
{name: "India", value: 1, color: undefined},
{name: "Iraq", value: 2, color: undefined},
{name: "Libya", value: 1, color: undefined},
{name: "Mexico", value: 11, color: "#333"},
{name: "Nigeria", value: 1, color: undefined},
{name: "Pakistan", value: 2, color: undefined},
{name: "Peru", value: 1, color: undefined},
{name: "Philippines", value: 3, color: undefined},
{name: "Somalia", value: 2, color: undefined},
{name: "South Africa", value: 1, color: undefined},
{name: "Syria", value: 7, color: undefined},
{name: "UK", value: 1, color: undefined},
{name: "Ukraine", value: 1, color: undefined},
{name: "Yemen", value: 1, color: undefined},
{name: "Zambia", value: 1, color: undefined}
]
)}

function _data2020(){return(
[
{name: "Afghanistan", value: 6, color: undefined},
{name: "Bangladesh", value: 1, color: undefined},
{name: "Barbados", value: 1, color: undefined},
{name: "Brazil", value: 1, color: undefined},
{name: "Colombia", value: 2, color: undefined},
{name: "Guatemala", value: 2, color: undefined},
{name: "Honduras", value: 4, color: undefined},
{name: "India", value: 2, color: undefined},
{name: "Iran", value: 1, color: undefined},
{name: "Iraq", value: 3, color: undefined},
{name: "Liberia", value: 1, color: undefined},
{name: "Mexico", value: 9, color: "#333"},
{name: "Nigeria", value: 3, color: undefined},
{name: "Pakistan", value: 1, color: undefined},
{name: "Paraguay", value: 1, color: undefined},
{name: "Philippines", value: 4, color: undefined},
{name: "Somalia", value: 1, color: undefined},
{name: "Syria", value: 4, color: undefined},
{name: "Venezuela", value: 1, color: undefined},
{name: "Yemen", value: 2, color: undefined}
]
)}

function _data2021(){return(
[
{name: "Afghanistan", value: 4, color: undefined},
{name: "Azerbaijan", value: 2, color: undefined},
{name: "Bangladesh", value: 1, color: undefined},
{name: "Burkina Faso", value: 2, color: undefined},
{name: "Colombia", value: 1, color: undefined},
{name: "Democratic Republic of the Congo", value: 1, color: undefined},
{name: "Ethiopia", value: 2, color: undefined},
{name: "Georgia", value: 1, color: undefined},
{name: "Greece", value: 1, color: undefined},
{name: "Haiti", value: 1, color: undefined},
{name: "India", value: 5, color: undefined},
{name: "Indonesia", value: 1, color: undefined},
{name: "Israel and the Occupied Palestinian Territory", value: 1, color: undefined},
{name: "Lebanon", value: 1, color: undefined},
{name: "Mexico", value: 9, color: "#333"},
{name: "Myanmar", value: 2, color: undefined},
{name: "Netherlands", value: 1, color: undefined},
{name: "Pakistan", value: 3, color: undefined},
{name: "Philippines", value: 3, color: undefined},
{name: "Somalia", value: 2, color: undefined},
{name: "Yemen", value: 1, color: undefined}
]
)}

function _data2022(){return(
[
{name: "Bangladesh", value: 2, color: undefined},
{name: "Brazil", value: 2, color: undefined},
{name: "Central African Republic", value: 1, color: undefined},
{name: "Chad", value: 2, color: undefined},
{name: "Chile", value: 1, color: undefined},
{name: "Colombia", value: 2, color: undefined},
{name: "Ecuador", value: 1, color: undefined},
{name: "Guatemala", value: 1, color: undefined},
{name: "Haiti", value: 7, color: undefined},
{name: "Honduras", value: 2, color: undefined},
{name: "India", value: 2, color: undefined},
{name: "Israel and the Occupied Palestinian Territory", value: 1, color: undefined},
{name: "Kazakhstan", value: 1, color: undefined},
{name: "Kenya", value: 1, color: undefined},
{name: "Mexico", value: 13, color: undefined},
{name: "Myanmar", value: 2, color: undefined},
{name: "Paraguay", value: 1, color: undefined},
{name: "Philippines", value: 5, color: undefined},
{name: "Somalia", value: 2, color: undefined},
{name: "Syria", value: 1, color: undefined},
{name: "Turkey", value: 1, color: undefined},
{name: "Ukraine", value: 15, color: "#333"},
{name: "USA", value: 1, color: undefined},
{name: "Yemen", value: 1, color: undefined}
]
)}

function _data2023(){return(
[
{name: "Afghanistan", value: 1, color: undefined},
{name: "Albania", value: 1, color: undefined},
{name: "Bangladesh", value: 1, color: undefined},
{name: "Cameroon", value: 2, color: undefined},
{name: "Colombia", value: 1, color: undefined},
{name: "Haiti", value: 1, color: undefined},
{name: "India", value: 1, color: undefined},
{name: "Israel and the Occupied Palestinian Territory", value: 74, color: "#000"},
{name: "Lebanon", value: 3, color: undefined},
{name: "Lesotho", value: 1, color: undefined},
{name: "Mexico", value: 1, color: undefined},
{name: "Paraguay", value: 1, color: undefined},
{name: "Philippines", value: 2, color: undefined},
{name: "Rwanda", value: 1, color: undefined},
{name: "Sudan", value: 1, color: undefined},
{name: "Ukraine", value: 2, color: undefined},
{name: "USA", value: 1, color: undefined}
]
)}

function _29(md){return(
md`---

## Appendix`
)}

function _pack(d3,width,height){return(
data2018 => {
  let alt = d3.median(data2018, d => d.value);
  if (!alt) alt = 1;
  return d3.pack()
    .size([width, height])
      .padding(3)
    (d3.hierarchy({children: data2018})
      .sum(d => isNaN(d.value) ? alt : d.value));
}
)}

function _width(){return(
900
)}

function _height(width){return(
width
)}

function _fillColor(){return(
"#ddd"
)}

function _lightColor(){return(
"#fff"
)}

function _darkColor(){return(
"#000"
)}

function _format(d3){return(
d3.format(",d")
)}

function _fit(measureWidth){return(
function fit(text, value) {
  let line;
  let lineWidth0 = Infinity;
  const lineHeight = 12;
  const targetWidth = Math.sqrt(measureWidth(text.trim()) * lineHeight);
  const words = text.split(/\s+/g); // To hyphenate: /\s+|(?<=-)/
  if (!words[words.length - 1]) words.pop();
  if (!words[0]) words.shift();
  const lines = [];
  for (let i = 0, n = words.length; i < n; ++i) {
    let lineText1 = (line ? line.text + " " : "") + words[i];
    let lineWidth1 = measureWidth(lineText1);
    if ((lineWidth0 + lineWidth1) / 2 < targetWidth) {
      line.width = lineWidth0 = lineWidth1;
      line.text = lineText1;
    } else {
      lineWidth0 = measureWidth(words[i]);
      line = {width: lineWidth0, text: words[i]};
      lines.push(line);
    }
  }
  if (value !== undefined) lines.push({width: measureWidth(value), text: value});
  let radius = 0;
  for (let i = 0, n = lines.length; i < n; ++i) {
    const dy = (Math.abs(i - n / 2 + 0.5) + 0.5) * lineHeight;
    const dx = lines[i].width / 2;
    radius = Math.max(radius, Math.sqrt(dx ** 2 + dy ** 2));
  }
  return {lines, radius};
}
)}

function _measureWidth()
{
  const context = document.createElement("canvas").getContext("2d");
  return text => context.measureText(text).width;
}


function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["press-workers-deaths-for-viz@2.csv", {url: new URL("./files/881a7bc598feb9ac7cfd7f17ad8477f6bb180266ee2c4bcdf797b5226e8a0906d39161d3629fc925250c3d61ca268efb6698d73e7cbcde02bd9132bfaeb20f30.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["photo-by-michael-guerrero@1.jpg", {url: new URL("./files/1e096e75f5fec66a3331f70316cc3def823f6a4725bd3fe337bdd3377481508e64e4ceba01503b6031f14545ea08fadaa8eaf20971194938fdc134f97317089f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Plot","FileAttachment","data2018to2023"], _3);
  main.variable(observer("data2018to2023")).define("data2018to2023", ["FileAttachment"], _data2018to2023);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("chart2018")).define("chart2018", ["pack","data2018","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2018);
  main.variable(observer()).define(["html","DOM","rasterize","chart2018","serialize"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("chart2019")).define("chart2019", ["pack","data2019","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2019);
  main.variable(observer()).define(["html","DOM","rasterize","chart2019","serialize"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("chart2020")).define("chart2020", ["pack","data2020","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2020);
  main.variable(observer()).define(["html","DOM","rasterize","chart2020","serialize"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("chart2021")).define("chart2021", ["pack","data2021","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2021);
  main.variable(observer()).define(["html","DOM","rasterize","chart2021","serialize"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("chart2022")).define("chart2022", ["pack","data2022","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2022);
  main.variable(observer()).define(["html","DOM","rasterize","chart2022","serialize"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("chart2023")).define("chart2023", ["pack","data2023","d3","DOM","width","height","fillColor","lightColor","darkColor","fit","format"], _chart2023);
  main.variable(observer()).define(["html","DOM","rasterize","chart2023","serialize"], _22);
  main.variable(observer("data2018")).define("data2018", _data2018);
  main.variable(observer("data2019")).define("data2019", _data2019);
  main.variable(observer("data2020")).define("data2020", _data2020);
  main.variable(observer("data2021")).define("data2021", _data2021);
  main.variable(observer("data2022")).define("data2022", _data2022);
  main.variable(observer("data2023")).define("data2023", _data2023);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("pack")).define("pack", ["d3","width","height"], _pack);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("fillColor")).define("fillColor", _fillColor);
  main.variable(observer("lightColor")).define("lightColor", _lightColor);
  main.variable(observer("darkColor")).define("darkColor", _darkColor);
  main.variable(observer("format")).define("format", ["d3"], _format);
  main.variable(observer("fit")).define("fit", ["measureWidth"], _fit);
  main.variable(observer("measureWidth")).define("measureWidth", _measureWidth);
  const child1 = runtime.module(define1);
  main.import("rasterize", child1);
  main.import("serialize", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
