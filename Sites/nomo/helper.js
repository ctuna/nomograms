var w = 200;
var h = 200;
var domain =[0, 400];
var padding = 30;
var numTicks = 10;
var svg;
var highlight;


function init() {

//disable highlighting
	var yScale = d3.scale.linear().domain(domain).range([h-padding, padding]);
	var yAxis = d3.svg.axis().orient("left").scale(yScale).ticks(numTicks);
	highlight =  "#4CB4F5";
	svg = d3.select("body").append("svg").attr("width", w).attr("height", h).on('mousedown.drag', null);
	svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxis);


	line = svg.append("line")
		.attr("id", "nomoline")
		.attr("x1", padding)
		.attr("y1", padding)
		.attr("x2", w - padding)
		.attr("y2", padding);
	line.on("mousedown", mousedown);
	svg.on("mouseup", mouseup);
	numTicks = d3.selectAll(".tick line")[0].length; //actual number of ticks found by d3 
//TAKE AVERAGE OF AXIS REGIONS TO DETERMINE WHICH POINT TO MOVE.
//MAKE TICKS LIGHT UP
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
	console.log("closest tick index is: " + closestTick(this)[0]);
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
}


function mouseup() {
	var closest = closestTick(this);
	line.attr("y1", closest[1]); 	//change position to closest position
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