const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 450; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

 
// Left scatter plot
const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 
 
function build_scatter_1() {
	// Open file
  d3.csv("data/iris.csv").then((data) => { 



    const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

    const X_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_X1 + 1)]) 
                        .range([0, VIS_WIDTH]);

    const Y_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_Y1 + 1)]) 
                        .range([VIS_HEIGHT, 0]);
    // Add x axis
    FRAME1.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE1).ticks(10)) 
            .attr("font-size", '20px');

    // Add y axis 
    FRAME1.append("g")
            .attr("transform", 
                "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
            .call(d3.axisLeft(Y_SCALE1).ticks(10))
            .attr("font-size", "10px");

    const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "royalblue", "violet", "green"])

  	// Add points
    FRAME1.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.top); }) 
            .attr("r", 4)
            .attr("fill", function(d) { return color(d.Species); })
            .attr("opacity", 0.5)
            .attr("class", "point");})}

build_scatter_1()



// Middle scatter plot
const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 
 
function build_scatter_2() {
	// Open file
d3.csv("data/iris.csv").then((data) => { 

    const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
    const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

    const X_SCALE2 = d3.scaleLinear() 
                        .domain([0, 8]) 
                        .range([0, VIS_WIDTH]);

    const Y_SCALE2 = d3.scaleLinear() 
                        .domain([0, (MAX_Y2 + 1)]) 
                        .range([VIS_HEIGHT, 0]);

    // Add x axis
    FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE2).ticks(10)) 
            .attr("font-size", '20px');

    // Add y axis 
    FRAME2.append("g")
            .attr("transform", 
                "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
            .call(d3.axisLeft(Y_SCALE2).ticks(10))
            .attr("font-size", "10px");

    const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "royalblue", "violet", "green"])

  	// Add points
    FRAME2.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
            .attr("r", 4)
            .attr("fill", function(d) { return color(d.Species); })
            .attr("opacity", 0.5)
            .attr("class", "point");})}

build_scatter_2()



// Bar graph 
const FRAME3 = d3.select("#vis3")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

function build_interactive_bar() {
// Open file
d3.csv("data/iris.csv").then((data) => {

    const X_SCALE3 = d3.scaleBand()
                           .range([0, VIS_WIDTH])
                           .domain(data.map((d) => {return d.Species;}))
                           .padding(.3);

    const Y_SCALE3 = d3.scaleBand()
                           .range([VIS_HEIGHT, 0])
                           .domain([0,100])


    const color = d3.scaleOrdinal()
                    .domain(["setosa", "versicolor", "virginica" ])
                    .range([ "royalblue", "violet", "green"])


    // Adding X Axis 
    FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + "," + 
                (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE3))
            .attr("font-size", '20px'); 

    // Adding Y Axis
    FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left +
              "," + (MARGINS.bottom) + ")") 
            .call(d3.axisLeft(Y_SCALE3).ticks(4)) 
            .attr("font-size", '20px');


    // Adding bars
    FRAME3.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", function(d) { return X_SCALE3(d.Species) + MARGINS.left;})
                .attr("width", X_SCALE3.bandwidth())
                .attr("y", VIS_HEIGHT)
                .attr("height", 50)
                .attr("class", "bar")
                .attr("fill", function(d) { return color(d.Species);})
                .attr("opacity", 0.5)})};

    




build_interactive_bar()

