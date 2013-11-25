var w = 500;
var h = 500;
var domain =[[0, 5]];
var numTicks=[10];
var padding;
var numAxes;
var axisNames=[];
var svg;
var highlight;
var linePos = [];
var circleRadius = 15;
var points=[];

var data;

function wrangle(val){

	if (val === 'retainingWall'){data=retainingWall;}
	else if (val === 'secondOrder'){data=secondOrder;}
	else if (val === 'BMI'){data=BMI;}
	else {
		console.log("we went in bad place");
		data = retainingWall;
	}

	numAxes = data.length;
	for (var i = 0; i <numAxes; i++){
		axisNames[i]= data[i].name;
		for (var p = 0; p < data[i].points.length; p++){
			points[i]=data[i].points;
		}
	}	
}


function init() {
	//The SVG Container



	padding= circleRadius*3;
	d3.select("#selector")
		.on("change", updateSelector)
		.selectAll("option.auto")
		.data(plist).enter()
		.append("option")
		.attr("value", function(d) { return d; })
		.text(function(d) { return pname[d]; });
		
	wrangle();
	drawAxes();
	
//disable highlighting

}
var xScale;
function drawAxes(){
	svg = d3.select("svg").remove();
	//SVG container
	svg = d3.select("body").append("svg")
	.attr("width", w)
	.attr("height", h);
	
	
	var lineData = [ { "x": 1.55,   "y": 5},  { "x": 20,  "y": 20},
	{ "x": 40,  "y": 10}, { "x": 60,  "y": 40},
	{ "x": 80,  "y": 5},  { "x": 100, "y": 60}];
	//replace with num axes
	//MAKE THE AXES
	for (var i = 0; i < numAxes; i++){
		var maxX= d3.max(data[numAxes-1].points, function(d) { return d.x; });
		var maxY = d3.max(data[numAxes-1].points, function(d) { return d.y; });
		xScale = d3.scale.linear()
			.domain([0, maxX])
			.range([0+padding, w-padding]);
		yScale = d3.scale.linear()
			.domain([0, maxY])
			.range([0+padding, h- padding]);
	
		var lineFunction = d3.svg.line()
			.x(function(d) {return xScale(d.x.toFixed(2)) ; })
			.y(function(d) {return h - yScale(d.y.toFixed(2)) ; })
			.interpolate("linear");
		console.log("in here");
		//The line SVG Path we draw
		var lineGraph = svg.append("path")
			.attr("d", lineFunction(data[i].points))
			//.attr("d", lineFunction(lineData))
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("fill", "none");
	}
	//LABEL THE AXES
	
	svg.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) {
			return d.name;
		})
		.attr("x", function(d){
			return xScale(d3.min(d.points, function(e) { return e.x; })).toFixed(2);
			})
	
		
			
		.attr("y",function(d) {
			return h - padding/2;  //line up all axes
		})

	
	
}




function mousedown() {
    var m = d3.mouse(this);
    svg.on("mousemove", mousemove);
}

function getY(s){
	return s.split(',')[1].split(')')[0];
}

function mousemove() {
	
    var m = d3.mouse(this);
	var g = d3.selectAll("g .tick")
	d3.selectAll("g .tick").style("fill", "black");

	d3.select(g[0][closestTick(this)[0]]).style("fill", highlight);
		if (m[1]>h- padding){
			 line.attr("y1", h - padding);
		}
		else if (m[1]<padding){
			line.attr("y1", padding);
		}
        else {
			line.attr("y1", m[1]);
		}
		linePos[0]=padding;
		linePos[1]=m[1];
		circle1
		.attr("cx", linePos[0])
		.attr("cy", linePos[1]);
}


function mouseup() {
	var closest = closestTick(this);
	line.attr("y1", closest[1]); 	//change position to closest position
	circle1.attr("cy", closest[1]);
    svg.on("mousemove", null);
	var g = d3.selectAll("g .tick")
	d3.selectAll("g .tick").style("fill", "black");
	d3.select(g[0][closestTick(this)[0]]).style("fill", highlight);
}


//returns a list 0 is tick object, 1 is y coordinate of tick
function closestTick(event){
	var m = d3.mouse(event);
	var ticks = d3.selectAll("g .tick")[0];
	var currentDistance, minDistance, currentTickIndex, closestTickIndex, currentY, destinationY;
	minDistance = 100000;
	for (var i=0;i<numTicks;i++){
		
		currentTickIndex = i;
		currentTick = ticks[i].getAttribute("transform");
		currentY = getY(currentTick);
		currentDistance = Math.abs(currentY - m[1]);
		
		//find closest tick to current y position
		if (currentDistance < minDistance){
			minDistance = currentDistance;
			destinationY = currentY;
			closestTickIndex= i;
			
			}
	}
	return [closestTickIndex, destinationY];    
}



function updateSelector(){
	d = this.value;
	wrangle(d);
	drawAxes();
}
function makeAxis(index){
	var currentScale = d3.scale.linear().domain(domain[index]).range([h-padding, padding]);
	var currentAxis = d3.svg.axis().orient("left").scale(currentScale).ticks(numTicks[index]);
	svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding*(index+1) + ",0)").call(currentAxis);
}
function drawNomo(){
	
		document.getElementById('domain1').value = domain[0];
		document.getElementById('domain2').value = domain[1];
		document.getElementById('ticks1').value = numTicks;
		
		
	
		
		
		//var yScale = d3.scale.linear().domain(domain).range([h-padding, padding]);
		//var yAxis1 = d3.svg.axis().orient("left").scale(yScale).ticks(numTicks);
		//	2nd axis
		//var yAxis2 = d3.svg.axis().orient("left").scale(yScale).ticks(numTicks);
		
		
		highlight =  "#4CB4F5";
		svg = d3.select("body").append("svg").attr("width", w).attr("height", h).on('mousedown.drag', null);
		for (var i = 0; i < numTicks.length; i++ ){
			makeAxis(i);
			numTicks[i] = d3.selectAll(".tick line")[i].length;
		}
		
		//todo:unduplicate axis code 
		//svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxis1);
		//svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxis2);

		line = svg.append("line")
			.attr("id", "nomoline")
			.attr("x1", padding)
			.attr("y1", padding)
			.attr("x2", w - padding)
			.attr("y2", padding);
		linePos[0]=padding;
		linePos[1]=padding;
		circle1 = svg.append("circle")
	    .attr("cx", padding)
		.attr("cy", padding)
		.attr("r", circleRadius)
		.attr("id", "circle1");
		circle1.on("mousedown", mousedown);
		line.on("mousedown", mousedown);
		svg.on("mouseup", mouseup);
		 //actual number of ticks found by d3 
		d3.selectAll("g .tick text")
			.attr("x", "-20")
			.style("font-size", "15px");
	//TAKE AVERAGE OF AXIS REGIONS TO DETERMINE WHICH POINT TO MOVE.
	//MAKE TICKS LIGHT UP

}
function generate(index, inputd1, inputd2, inputNumTicks){
	domain[index] = [inputd1, inputd2];
	numTicks[index] = inputNumTicks;
	d3.select("svg").remove();
	drawNomo(); 
}