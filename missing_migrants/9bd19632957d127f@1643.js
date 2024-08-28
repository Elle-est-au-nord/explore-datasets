function _1(md){return(
md`# Missing Migrants Project by International Organization for Migration (IOM)`
)}

function _2(md){return(
md`## Migrants (including refugees and asylum-seekers) who have died or gone missing`
)}

function _3(md){return(
md`**\`Data\`**`
)}

function _getdata(md){return(
md`Attached file last downloaded from IOM website on August 28, 2024`
)}

function _5(md){return(
md`*Statistical data from IOM - https://missingmigrants.iom.int/downloads*`
)}

function _6(md,iom,datextent){return(
md`- Entries: ${iom.length}
- Start:  ${datextent[0]}
- End: ${datextent[1]}`
)}

function _7(md){return(
md`**\`Years\`**`
)}

function _year(Inputs,yearrange,All){return(
Inputs.range(yearrange, {
  label: "year",
  step: 1,
  value: 2023,
  disabled: All
})
)}

function _All(Inputs){return(
Inputs.toggle({ label: "All", value: false })
)}

function _10(md){return(
md`**\`Bubbles\`**`
)}

function _fill(Inputs){return(
Inputs.color({ label: "Color", value: "#241f31" })
)}

function _dorling(Inputs){return(
Inputs.toggle({ label: "Avoid overlap", value: false })
)}

function _k(Inputs){return(
Inputs.range([5, 50], { label: "Radius max", step: 1, value: 20 })
)}

function _map(bertin,d3proj,footer,dots,countries,land){return(
bertin.draw({
  params: {
    // projection: "epsg:3035",
    // projection: "Globe",
    projection: d3proj.geoVanDerGrinten4(),
    clip:true,
    width:1200,
    extent: [[11, -43],[15, -90]],
    margin: [15, 30, 50, 30],
    background: "#C6D9E8"
  },
  layers: [
    {
      type: "text",
      text: "Migrants who have died or gone missing",
      anchor: "middle",
      position: [1200 / 2, 50],
      fontSize: 28,
      fill: "#241f31",
      fontWeight: "bold",
      fontFamily: "Ubuntu"
    },
    {
      id: "txt",
      type: "header",
      text: " ",
      background: "white"
    },
    {
      type: "text",
      text: footer,
      position: "bottomright",
      fontSize: 12,
      fill: "#9e9696"
    },
    {
      type: "bubble",
      id: "bub",
      geojson: dots,
      fill: "#241f31",
      fixmax: 100,
      k: 20,
      fillOpacity: 0.8,
      values: "2023",
      tooltip: [
        (d) => d.properties["Cause of Death"],
        (d) => "Date: " + d.properties["Incident Date"],
        (d) => "Region of Incident: " + d.properties["Region of Incident"],
        (d) =>
          "People dead or gone missing: " +
          d.properties["Total Number of Dead and Missing"],
        (d) => "Female victims: " + d.properties["Number of Females"] 
               + ", male victims: " + d.properties["Number of Males"] 
               + ", children victims: " + d.properties["Number of Children"],
        (d) => "Migration Route: " + d.properties["Migration Route"]
      ]
    },

    { type: "graticule", step: [4, 2] },
    { geojson: countries, fill: "#E2C4A5", stroke: "#ffc078" },
    { type: "scalebar" },
    { geojson: land, fill: "#E8D0B7", stroke: "#d08770", fillOpacity: 0.7 }
  ]
})
)}

function _15(md){return(
md`### Data Import & handling`
)}

function _16(md){return(
md`Statistical data from IOM - https://missingmigrants.iom.int/downloads`
)}

async function _iom(FileAttachment)
{
  let output;
  
  output = await FileAttachment("Missing_Migrants_Global_Figures_allData_new.csv")
    .csv()
    .then((d) => d.filter((e) => e.Coordinates !== ""));
  
  return output;
}


function _data(iom)
{
  let obj = [...iom];
  Array.from(new Set(iom.map((d) => d["Incident Year"]))).forEach((year) => {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = {
        ...obj[i],
        [year]:
          obj[i]["Incident Year"] == year
            ? +obj[i]["Total Number of Dead and Missing"]
            : 0
      };
    }
  });
  return obj;
}


function _dots(geo,data){return(
geo.clip(
  geo.coords2geo(data, {
    coords: "Coordinates"
  }),
  //{ clip: bb }
)
)}

function _land(FileAttachment){return(
FileAttachment("countries.json").json()
)}

function _countries(jsts,geo,land)
{
  let reader = new jsts.io.GeoJSONReader();
  let writer = new jsts.io.GeoJSONWriter();
  return writer.write(
    jsts.densify.Densifier.densify(
      reader.read(geo.clip(land, {})).features[0].geometry,
      1
    )
  );
}


function _footer(){return(
`Cartography: modified from Nicolas Lambert, 2023
Statistical data: IOM - https://missingmigrants.iom.int/downloads
Original map available at https://observablehq.com/@neocartocnrs/dead-and-missing-migrants`
)}

function _set(Event){return(
function set(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
)}

function _value(All,year){return(
All ? "Total Number of Dead and Missing" : year
)}

function _yearrange(d3,data){return(
d3.extent(data.map((d) => d["Incident Year"]))
)}

function _datextent(d3,iom){return(
d3.extent(iom.map((d) => new Date(d["Incident Date"])))
)}

function _27(md){return(
md`### Map Update`
)}

function _28(map,All,d3,data,value,yearrange,year){return(
map.update({
  id: "txt",
  attr: "text",
  value: All
    ? `${d3.sum(data.map((d) => d[value]))} people from ${yearrange[0]} to ${
        yearrange[1]
      }`
    : `${d3.sum(data.map((d) => d[value]))} people in ${year}`,
  duration: 500
})
)}

function _29(map,dorling){return(
map.update({
  id: "bub",
  attr: "dorling",
  value: dorling,
  duration: 500
})
)}

function _30(map,fill){return(
map.update({
  id: "bub",
  attr: "fill",
  value: fill,
  duration: 500
})
)}

function _31(map,k){return(
map.update({
  id: "bub",
  attr: "k",
  value: k,
  duration: 500
})
)}

function _32(map,value){return(
map.update({
  id: "bub",
  attr: "values",
  value: value,
  duration: 500
})
)}

function _33(md){return(
md`### Libs `
)}

function _jsts(require){return(
require("jsts@2.7.0")
)}

function _bertin(require){return(
require("bertin")
)}

function _geo(require){return(
require("geotoolbox@1.9")
)}

function _d3proj(require){return(
require("d3-geo-projection@4")
)}

function _causes_of_deaths(data){return(
data.map( cases => cases["Cause of Death"] )
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries.json", {url: new URL("./files/02c298b3d409245c2538593ea8a711c3d1d0dd2ef352e6ea35f8da7e050bc3fe0fc0220543876e4188d76428f97cf149b580f0833230551161ab7ca451632d0d.json", import.meta.url), mimeType: "application/json", toString}],
    ["Missing_Migrants_Global_Figures_allData_new.csv", {url: new URL("./files/657338c2e999b104d2c6baf1c911f65ab3fc35e290aa5fb40b0f36091d30f40b4915046a95f0b3278b651063109c6e6c58356ea59e0e1122bd9bb424e1a6794e.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("getdata")).define("getdata", ["md"], _getdata);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md","iom","datextent"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof year")).define("viewof year", ["Inputs","yearrange","All"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("viewof All")).define("viewof All", ["Inputs"], _All);
  main.variable(observer("All")).define("All", ["Generators", "viewof All"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof fill")).define("viewof fill", ["Inputs"], _fill);
  main.variable(observer("fill")).define("fill", ["Generators", "viewof fill"], (G, _) => G.input(_));
  main.variable(observer("viewof dorling")).define("viewof dorling", ["Inputs"], _dorling);
  main.variable(observer("dorling")).define("dorling", ["Generators", "viewof dorling"], (G, _) => G.input(_));
  main.variable(observer("viewof k")).define("viewof k", ["Inputs"], _k);
  main.variable(observer("k")).define("k", ["Generators", "viewof k"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["bertin","d3proj","footer","dots","countries","land"], _map);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("iom")).define("iom", ["FileAttachment"], _iom);
  main.variable(observer("data")).define("data", ["iom"], _data);
  main.variable(observer("dots")).define("dots", ["geo","data"], _dots);
  main.variable(observer("land")).define("land", ["FileAttachment"], _land);
  main.variable(observer("countries")).define("countries", ["jsts","geo","land"], _countries);
  main.variable(observer("footer")).define("footer", _footer);
  main.variable(observer("set")).define("set", ["Event"], _set);
  main.variable(observer("value")).define("value", ["All","year"], _value);
  main.variable(observer("yearrange")).define("yearrange", ["d3","data"], _yearrange);
  main.variable(observer("datextent")).define("datextent", ["d3","iom"], _datextent);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["map","All","d3","data","value","yearrange","year"], _28);
  main.variable(observer()).define(["map","dorling"], _29);
  main.variable(observer()).define(["map","fill"], _30);
  main.variable(observer()).define(["map","k"], _31);
  main.variable(observer()).define(["map","value"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("jsts")).define("jsts", ["require"], _jsts);
  main.variable(observer("bertin")).define("bertin", ["require"], _bertin);
  main.variable(observer("geo")).define("geo", ["require"], _geo);
  main.variable(observer("d3proj")).define("d3proj", ["require"], _d3proj);
  main.variable(observer("causes_of_deaths")).define("causes_of_deaths", ["data"], _causes_of_deaths);
  return main;
}
