
    //SVG dimension variables
    var w = 900, h = 500;
window.onload = function(){
    //start of a block named "container"
    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //assign a class (same as the block name)
        .style("background-color", "rgba(0,0,0,0.2)");
    var innerRect=container.append("rect") //add a <rect> element
    .datum(400) //a single value is a DATUM
    .attr("width", function(d){ //rectangle width
        return d * 2; //400 * 2 = 800
    })
    .attr("height", function(d){ //rectangle height
        return d; //400
    })
    .attr("class", "innerRect") //class name
    .attr("x", 50) //position from left on the x (horizontal) axis
    .attr("y", 50) //position from top on the y (vertical) axis
    .style("fill", "#FFFFFF"); //fill color
    var cityPop = [ // an array containing an object for each of four cities
        {
            city: 'Nanjing',
            population: 8230000
        },
        {
            city: 'Los Angeles',
            population: 3884307
        },
        {
            city: 'Barcelona',
            population: 1604555
        },
        {
            city: 'Paris',
            population: 2229621
        }
    ];
    //color scale generator
    var minPop = d3.min(cityPop, function(d){//find the minimum value of the array
          return d.population;
      });


    var maxPop = d3.max(cityPop, function(d){ //find the maximum value of the array
        return d.population;
    });
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);
    var x = d3.scaleLinear() //create the linear scale or a generator function that will be used to decide where in the range each output value lies based on each input datum sent to it.
            .range([120, 700]) //output min and max
            .domain([0, 3]); //input min and max; bc index of datum ranges from 0 to 3

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([
            1000000,
            9000000
        ]) ;
    var circles = container.selectAll(".circles") //create an empty selection; placeholer for future element with class name "circles"
        .data(cityPop) // feed in an array
        .enter() //join the data to the selection, creating an array of placeholders for one markup element per data value in the array

        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles; again, use identical name as the element
        .attr("id", function(d){ //d holds each of our array values, an object with two properties (city and population)
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.0005;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            //applying the y scale to return the circles' center y coordinates
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
    //creating the y axis generator
    var yAxis = d3.axisLeft(y);//creates an axis generator function, where the argument is our scale generator
    //create a <g> (group) element to hold the axis and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)") //translating the axis 50 pixels right
        .call(yAxis);//   equiv to yAxis(axis);
    //create a text element and add the title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    //create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        // .attr("x", function(d,i){
        //     //horizontal position to the right of each circle
        //     return x(i) + Math.sqrt(d.population * 0.0005 / Math.PI) + 5;
        // })
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 5;
        })
        //first line of label
    var nameLine = labels.append("tspan") //tspan element, child element of text
      .attr("class", "nameLine")
      .attr("x", function(d,i){
          //horizontal position to the right of each circle
          return x(i) + Math.sqrt(d.population * 0.0005 / Math.PI) + 5;
      })
      .text(function(d){
          return d.city;
      });

    //second line of label
    var popLine = labels.append("tspan")
      .attr("class", "popLine")
      .attr("x", function(d,i){
          //horizontal position to the right of each circle
          return x(i) + Math.sqrt(d.population * 0.0005 / Math.PI) + 5;
      })
      .text(function(d){
          return "Pop. " + d.population;
      })
      .attr("dy", "15"); //vertical offset

};

//call the initialize function when the document has loaded
