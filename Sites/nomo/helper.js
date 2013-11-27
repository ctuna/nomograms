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
	data = [];
	if (val === 'retainingWall'){data=retainingWall;}
	else if (val === 'secondOrder'){
		//these come in in wrong order
		data[0]=secondOrder[0];
		data[1]=secondOrder[2];
		data[2]=secondOrder[1];
		}
	else if (val === 'BMI'){data=BMI;}
	else if (val == 'dubois'){data = dubois;}
	else if (val == 'temp'){data = temp;}
	else {
		console.log("we went in bad place");
		data = BMI;
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
	if (numAxes > 2){
		drawLine();
		drawDragPoints();
	}

	
//disable highlighting

}


var xScale;
var line;
var circleRadius = 15;
function drawLine(){
	if (numAxes < 3){
		return;
	}
	

	
	line = svg.append("line")
		.attr("id", "nomoline")
		.attr("stroke-width", 5)
		.attr("x1", xScale ( 
			data[0].points.filter(function(d, i){
				return d3.min(data[0].points, 
						function(e) { return e.y; }) //a number
							== d.y;
							})[0].x.toFixed(2)
						)
					)
			
			
			
			
			
		.attr("y1", yScale(d3.min(data[0].points, function(e) { return e.y; })).toFixed(2))//want highest
		//how to get x of highest y? 
		
		.attr("x2", xScale ( 
			data[2].points.filter(function(d, i){
				return d3.min(data[2].points, 
						function(e) { return e.y; }) //a number
							== d.y;
							})[0].x.toFixed(2)
						)
					)
		.attr("y2", yScale(d3.min(data[2].points, function(e) { return e.y; })).toFixed(2));//want min Y, highest*/ 
}
function drawDragPoints(){

	
	svg.selectAll("circle")
	//
		.data(data.filter(function(d, i) { return i != 1 ; }))
		.enter()
		.append("circle")
		.attr("cx", function(d, i){
			if (i == 0){ return line.attr("x1");}
			else return line.attr("x2");
			})
		.attr("cy", function(d, i){
			if (i == 0){ return line.attr("y1");}
			else return line.attr("y2");
			})
		.attr("r", circleRadius)
		.attr("class", "dragpoint")
		.on("mousedown", function(d, i){clickCircle(i, this)})
		.on("mouseup", mouseup);
	svg.on("mouseup", mouseup);
		
		
}

var currentCircle;
function clickCircle(i, clickevent){
	currentCircle = i;
	
	svg.on("mousemove", mousemove);
}
function moveCircle(i){
	console.log(d3.mouse(this));/**
	if (i == 0){
		line.attr("x1", m[0]);
		line.attr("y1", m[1]);
	}
	else if (i == 1){
		line.attr("x2", m[0]);
		line.attr("y2", m[1]);
		
	}*/
}


function drawTicks(level, axis, wid){

		svg.selectAll("line")
			.data(data[axis].ticks[level])
			.enter()
			.append("line")
			.attr("stroke", "pink")
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("x1", function (d)
				{return xScale
						(d.x) })
			.attr("y1", function(d){return h - yScale(d.y)})
			.attr("x2", function(d)	{
			

				return xScale((d.x + (wid*d.dy)))
					})
			.attr("y2", function(d){
		
				return h - yScale((d.y - (wid*d.dx)))
								
							})
			
			
		
}

function drawAxes(){
	svg = d3.select("svg").remove();
	//SVG container
	svg = d3.select("body").append("svg")
	.attr("width", w)
	.attr("height", h);
	
	//CHANGE TO RESTFUL WAY
	var lineData = [ { "x": 1.55,   "y": 5},  { "x": 20,  "y": 20},
	{ "x": 40,  "y": 10}, { "x": 60,  "y": 40},
	{ "x": 80,  "y": 5},  { "x": 100, "y": 60}];
	//replace with num axes
	//MAKE THE AXES
	for (var i = 0; i < numAxes; i++){
		//LARGEST X WILL BE ON RIGHT-MOST AXIS
		var maxX= 0;
		var maxY =0;
		for (var k = 0; k < numAxes; k++){
			currentMaxY = d3.max(data[k].points, function(d) { return d.y; });
			currentMaxX = d3.max(data[k].points, function(d) { return d.x; });
			if (currentMaxY > maxY){
				maxY = currentMaxY;
			}
			if (currentMaxX > maxX){
				maxX = currentMaxX;
			}
		}
		
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
			return xScale(d3.mean(d.points, function(e) { return e.x; })).toFixed(2);
			})
	
		
			
		.attr("y",function(d) {
			return h - padding/2;  //line up all axes
		})

	
	
}
var tickWidth = 1; 
var granularity = 2;



function mousedown() {
    var m = d3.mouse(this);
	console.log("moused down: ");
    //svg.on("mousemove", mousemove);
}

function getY(s){
	return s.split(',')[1].split(')')[0];
}

function mousemove() {
	var m = d3.mouse(this);
	
	
	d3.selectAll("circle")
		.filter(function (d, i){ return i ==currentCircle;})
		.attr("cx", m[0]);
	d3.selectAll("circle")
		.filter(function (d, i){ return i ==currentCircle;})
		.attr("cy", m[1]);
    var closestPointReturn;
	if (currentCircle == 0){
		//find closest point
		closestPointReturn = closestPoint(m)
		line.attr("x1", closestPointReturn[0]);
		line.attr("y1", closestPointReturn[1]);
		d3.selectAll("circle")
			.filter(function (d, i){ return i ==currentCircle;})
			.attr("cx", closestPointReturn[0])
			.attr("cy", closestPointReturn[1]);
			
		
	}
	else if (currentCircle == 1){
		closestPointReturn= closestPoint(m)
		line.attr("x2", closestPointReturn[0]);
		line.attr("y2", closestPointReturn[1]);
		d3.selectAll("circle")
			.filter(function (d, i){ return i ==currentCircle;})
			.attr("cx", closestPointReturn[0])
			.attr("cy", closestPointReturn[1]);
	}
}


function mouseup() {
	 svg.on("mousemove", null);
//	var closest = closestTick(this);
	//line.attr("y1", closest[1]); 	//change position to closest position
//	circle1.attr("cy", closest[1]);
   
//	var g = d3.selectAll("g .tick")
///	d3.selectAll("g .tick").style("fill", "black");
//	d3.select(g[0][closestTick(this)[0]]).style("fill", highlight);
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

function closestPoint(m){
	var dataIndex = 0;
	if (currentCircle == 1){
		dataIndex=2;
	}
	var currentDistance, minDistance, xScaled, yScaled;
	minDistance = 100000;
	//iterate to find closest point in new scheme
	for (var i=0;i<data[dataIndex].points.length;i++){
		xScaled = xScale(data[dataIndex].points[i].x.toFixed(2));
		yScaled = yScale(data[dataIndex].points[i].y.toFixed(2));
		currentDistance = euclid ([m[0], m[1]], [xScaled, yScaled]);
		
		//find closest tick to current y position
		if (currentDistance < minDistance){
			minDistance = currentDistance;
			destinationX = xScaled;
			destinationY = yScaled;
			
			}
	}
	return [destinationX, destinationY];    
}




function updateSelector(){
	d = this.value;
	wrangle(d);
	drawAxes();
	drawLine();
	drawDragPoints();
}

function drawNomo(){
	
		document.getElementById('domain1').value = domain[0];
		document.getElementById('domain2').value = domain[1];
		document.getElementById('ticks1').value = numTicks;
		
		
		highlight =  "#4CB4F5";


}

function euclid(a, b) {

  // return Math.sqrt(
  //   Math.pow(a[0]-b[0], 2) +
  //   Math.pow(a[1]-b[1], 2) +
  //   Math.pow(a[2]-b[2], 2)
  // )

  // return Math.sqrt(
  //   [0,1,2].reduce(function(prev, current, i) {
  //     return prev + Math.pow(a[i]-b[i], 2);
  //   }, 0)
  // );

  var sum = 0;
  var n;
  for (n=0; n < a.length; n++) {
    sum += Math.pow(a[n]-b[n], 2);
  }
  return Math.sqrt(sum);
}
