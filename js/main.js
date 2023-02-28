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

    const color = d3.scaleOrdinal()
                    .domain(["setosa", "versicolor", "virginica" ])
                    .range([ "royalblue", "violet", "green"])
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

  	// Add points
   pts1 = FRAME1.selectAll("points")  
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

    const color = d3.scaleOrdinal()
                    .domain(["setosa", "versicolor", "virginica" ])
                    .range([ "royalblue", "violet", "green"])

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

  	// Add points
  pts2 =  FRAME2.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); }) 
            .attr("r", 4)
            .attr("fill", function(d) { return color(d.Species); })
            .attr("opacity", 0.5)
            .attr("class", "point");

    // Add brushing
    FRAME2.call( d3.brush()                 // Add the brush feature using the d3.brush function
            .extent( [ [0,0], [FRAME_WIDTH, FRAME_HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    )

    // Function that is triggered when brushing is performed
    function updateChart(event) {
        const extent = event.selection;
        pts1.classed("selected", function(d){return isBrushed(extent, (X_SCALE2(d.Sepal_Width) + MARGINS.left), (Y_SCALE2(d.Petal_Width) + MARGINS.top))})
        bars1.classed("selected", function(d){return isBrushed(extent, (X_SCALE2(d.Sepal_Width) + MARGINS.left), (Y_SCALE2(d.Petal_Width) + MARGINS.top))})                                                        
        pts2.classed("selected", function(d){return isBrushed(extent, (X_SCALE2(d.Sepal_Width) + MARGINS.left), (Y_SCALE2(d.Petal_Width) + MARGINS.top))})};
  // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
       var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1};    // This return TRUE or FALSE depending on if the points is in the selected area
  
})}





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

    const Y_SCALE3 = d3.scaleLinear()
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
            .attr("transform", 
                "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
            .call(d3.axisLeft(Y_SCALE3).ticks(2))
            .attr("font-size", "20px");


    // Adding bars
  bars1 =  FRAME3.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left); }) 
                .attr("width", X_SCALE3.bandwidth())
                .attr("y", (d) => {return Y_SCALE3(50) + MARGINS.top})
                .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE3(50)})
                .attr("class", "bar")
                .attr("fill", (d) => { return color(d.Species);})
})};



build_interactive_bar()

