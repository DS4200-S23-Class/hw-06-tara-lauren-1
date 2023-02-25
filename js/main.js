const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 600; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


const FRAME3 = d3.select("#vis3")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

function build_interactive_bar() {

    d3.csv("data/iris.csv").then((data) => {

        const X_SCALE3 = d3.scaleBand()
                           .range([0, VIS_WIDTH])
                           .domain(data.map((d) => {return d.Species;}))
                           .padding(.3);

        const Y_SCALE3 = d3.scaleBand()
                           .range([VIS_HEIGHT,0])
                           .domain([0,100])


        // Adding X Axis 

        FRAME3.append("g") 
              .attr("transform", "translate(" + MARGINS.left + "," + 
                (VIS_HEIGHT + MARGINS.top) + ")") 
              .call(d3.axisBottom(X_SCALE3).ticks(3)) 
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
                    .attr("class", "bar");})}


build_interactive_bar()

