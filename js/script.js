const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;

const pointRadius1 = 3;
const pointRadius2 = 4;
const scaleFactorX = 55;
const scaleFactorY = 50;

const FRAME1 = d3
  .select("#vis1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame-1");

const scaleX = (coord) => coord * scaleFactorX;
const scaleY = (coord) => coord * scaleFactorY;

const chooseColor = (d) => {
  if (d.Species === "setosa") {
    return "gray";
  } else if (d.Species === "versicolor") {
    return "slateblue";
  } else {
    return "teal";
  }
};

d3.csv("./data/iris.csv").then((data) => {
  FRAME1.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => scaleX(d.Petal_Length))
    .attr("cy", (d) => 400 - scaleY(d.Sepal_Length))
    .attr("r", pointRadius1)
    .attr("fill", (d) => chooseColor(d))
    .attr("opacity", "50%")
    .attr("id", (d) => `circle-${d.id}`);
});

const scale2X = (coord) => coord * 140;
const scale2Y = (coord) => coord * 80;

const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame-2");

const handleMouseover = (event, d) => {
  const id = d.id;
  const species = d.Species;
  const element = FRAME1.select(`#circle-${id}`);
  element.style("opacity", "100%");
  element.style("stroke", "orange");
  element.style("stroke-width", "2px");
  let bar = FRAME3.select("#rect-1");
  if (species === "versicolor") {
    bar = FRAME3.select("#rect-2");
  } else if (species === "virginica") {
    bar = FRAME3.select("#rect-3");
  }
  bar.style("stroke", "orange");
  bar.style("stroke-width", "3px");
};

const handleMouseleave = (event, d) => {
  const id = d.id;
  const species = d.Species;
  const element = FRAME1.select(`#circle-${id}`);
  element.style("opacity", "50%");
  element.style("stroke", "none");
  let bar = FRAME3.select("#rect-1");
  if (species === "versicolor") {
    bar = FRAME3.select("#rect-2");
  } else if (species === "virginica") {
    bar = FRAME3.select("#rect-3");
  }
  bar.style("stroke", "none");
};

d3.csv("./data/iris.csv").then((data) => {
  FRAME2.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => scale2X(d.Petal_Width))
    .attr("cy", (d) => 400 - scale2Y(d.Sepal_Width))
    .attr("r", pointRadius2)
    .attr("fill", (d) => chooseColor(d))
    .attr("opacity", "50%")
    .on("mouseover", handleMouseover)
    .on("mouseleave", handleMouseleave);
});

const FRAME3 = d3
  .select("#vis3")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame-3");

FRAME3.append("rect")
  .attr("width", 100)
  .attr("height", 300)
  .attr("x", 20)
  .attr("y", 100)
  .attr("fill", "gray")
  .attr("id", `rect-1`);
FRAME3.append("rect")
  .attr("width", 100)
  .attr("height", 300)
  .attr("x", 140)
  .attr("y", 100)
  .attr("fill", "slateblue")
  .attr("id", `rect-2`);
FRAME3.append("rect")
  .attr("width", 100)
  .attr("height", 300)
  .attr("x", 260)
  .attr("y", 100)
  .attr("fill", "teal")
  .attr("id", `rect-3`);
