const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 600; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 





function build_interactive_bar() {
    d3.csv("data/iris.csv").then((data3) => {
        
        const FRAME3 = d3.select("#barchart")
                          .append("svg")
                          .attr("height", FRAME_HEIGHT)
                          .attr("width", FRAME_WIDTH)
                          .attr("class", "frame"); 


        const X_SCALE3 = d3.scaleBand()
                           .range([0, VIS_WIDTH])
                           .domain(["setosa", "versicolor", "virginica"]);

        const Y_SCALE3 = d3.scaleBand()
                           .range([0, VIS_WIDTH])
                           .domain([80,0]);


        // Adding X Axis 

        FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + "," + 
                (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 

        // Adding Y Axis

        FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left +
              "," + (MARGINS.bottom) + ")") 
            .call(d3.axisLeft(Y_SCALE3).ticks(4)) 
            .attr("font-size", '20px');


        // Adding bars

        FRAME2.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d) { return X_SCALE3(d.species) + MARGINS.left;})
                .attr("width", X_SCALE3.bandwidth())
                .attr("y", 50 + MARGINS.bottom);
                .attr("height", function(d) { return VIS_HEIGHT - 50;})
                .attr("class", "bar");})}


build_interactive_bar()