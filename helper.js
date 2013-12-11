var w = 500;
var h = 500;
var domain =[[0, 5]];
var numTicks=[10];
var padding=20;
var numAxes;
var axisNames=[];
var svg;
var highlight;
var linePos = [];
var circleRadius = 15;
var points=[];
var labelHeight = 50;
var polyWidth = 130;
var polyHeight=50;
var startX;
var startY;
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


	tickColors = ["#444445", "#747475", "#adadae", "#e4e4e4", "#e4e4e4"];
	//padding= circleRadius*3;
	d3.select("#selector")
		.on("change", updateSelector)
		.selectAll("option.auto")
		.data(plist).enter()
		.append("option")
		.attr("value", function(d) { return d; })
		.text(function(d) { return pname[d]; });
		
	wrangle();
	draw();

	
//disable highlighting

}

function draw(){
	drawAxes();
	drawTicks(0);
	drawTicks(1);
	drawTicks(2);
	if (numAxes > 2){
		drawLine();
		drawPointers();
		//drawDragPoints();
	}
	drawInputs();
}
var closestCurrentPoints=[5, 5, 5];




function drawInputs(){
	
		console.log("LEFT: " + closestCurrentPoints[0] + "RIGHT: " + closestCurrentPoints[2]);
	
	var myClass = "axisControl";
	svg.selectAll("."+myClass).remove();
	svg.selectAll("."+myClass)
		.data(data.filter(function(d, i) { return i != 1 ; }))
		.enter()
		.append("text")
		.attr("class", myClass)
		.attr("text-anchor", function(d, i){
			if (i == 0){
				return "start";
			}
			else return "end";
		})

		//change alignment
		.attr("x", function(d, i){
			if (i == 0){	return parseInt(line.attr("x1")) - polyWidth;}
			else { return parseInt(line.attr("x2")) + polyWidth;}
		})
		.attr("y", function(d, i){
			if (i == 0){ return	parseInt(line.attr("y1")) - (polyHeight/2);}
			else { return parseInt(line.attr("y2")) -  (polyHeight/2);}
		})
			//X SHOULD BE THE CURRENT POINT ON THIS AXIS

		.text(function(d, i){
			if (i == 0) {
				return closestCurrentPoints[0].toFixed(2);
				}
			else return closestCurrentPoints[2].toFixed(2);
			})
}

/**
		
	})	
	.attr("y",function(d) {
		return h - padding/2;  //line up all axes
})
*/

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
							})[0].x
						)
					)
			
			
			
			
			
		.attr("y1", yScale(d3.min(data[0].points, function(e) { return e.y; })))//want highest

		
		.attr("x2", xScale ( 
			data[2].points.filter(function(d, i){
				return d3.min(data[2].points, 
						function(e) { return e.y; }) //a number
							== d.y;
							})[0].x
						)
					)
		.attr("y2", yScale(d3.min(data[2].points, function(e) { return e.y; })));//want min Y, highest*/ 
	
	//initialize closest point labels
	var leftCoords = [line.attr("x1"), line.attr("y1")];
	closestCurrentPoints[0]=closestPoint(leftCoords)[2];
	currentCircle = 1;
	var rightCoords = [line.attr("x2"), line.attr("y2")];
	closestCurrentPoints[2]=closestPoint(rightCoords)[2];
}
function drawDragPoints(){

	d3.selectAll("circle").remove();
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

var textDistance = [1.0, 1.0/4, 1.0/4, 1.0/4, 1.0/4];
var halfEx = 6;

function labelTransform(level, x, y, dx, dy) {
	var dist = textDistance[level];
	if (dy < 0) {
		// flip
		dx = -dx;
		dy = -dy;
		dist = -dist;
	}
	var tx = x + dist * dy;
	var ty = y - dist * dx;
	var e = xScale(tx) - halfEx * dx;
	var f = h - yScale(ty) + halfEx * dy;
	var a = dy;
	var b = dx;
	var c = -dx;
	var d = dy;
	return 'matrix(' + [a, b, c, d, e, f] + ')';
}

function labelAnchor(dy) {
	return dy < 0 ? 'end' : 'start';
}

var tickLength = [3.0/4, 0.9/4, 0.5/4, 0.3/4, 0.2/4];
var tickColors =[];
function drawTicks(level){

	var myClass;
	for (var axis = 0; axis < numAxes; axis ++){
		myClass = "axis"+axis+"-level"+level;
		svg.selectAll("."+"myClass")
			.data(data[axis].ticks[level])
			.enter()
			.append("line")
			.attr("stroke", tickColors[level])
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("class", myClass)
			.attr("x1", function (d)
				{return xScale	(d.x) })
			.attr("y1", function(d){return h - yScale(d.y)})
			.attr("x2", function(d)	{return xScale((d.x + (tickLength[level]*d.dy)))})
			.attr("y2", function(d){return h - yScale((d.y - (tickLength[level]*d.dx)))})
			}

	if (level == 0) {
			for (var axis = 0; axis < numAxes; axis ++){
				myClass = "label-"+"axis"+axis+"-level"+level;
				svg.selectAll("."+"myClass")
					.data(data[axis].ticks[level])
					.enter()
					.append("text")
					//.attr("stroke", tickColors[level])
					//.attr("stroke-width", 2)
					//.attr("fill", "none")
					.attr("class", myClass)
					.attr("transform", function (d) { return labelTransform(level, d.x, d.y, d.dx, d.dy); })
					.attr("text-anchor", function (d) { return labelAnchor(d.dy); })
					.text(function(d) { 
						if (d.u.toFixed(0) == d.u.toFixed(2)){return d.u.toFixed(0);}
						else return d.u.toFixed(2) })
					//.attr("x2", function(d)	{return xScale((d.x + (tickLength[level]*d.dy)))})
					//.attr("y2", function(d){return h - yScale((d.y - (tickLength[level]*d.dx)))})
					}
	}
			
			
			
		
}

function drawAxes(){
	svg = d3.select("svg").remove();
	//SVG container

	//CHANGE TO RESTFUL WAY

	//replace with num axes
	//MAKE THE AXES
	var maxX=0;
	var maxY=0;
	var currentMaxX=0;
	var currentMaxY=0;
	var minX = 1000;
	var minY = 1000;
	var currentMinX = 1000;
	var currentMinY = 1000;
	for (var k = 0; k < numAxes; k++){
			currentMaxY = d3.max(data[k].points, function(d) { return d.y; });
			currentMaxX = d3.max(data[k].points, function(d) { return d.x; });
			currentMinY = d3.min(data[k].points, function(d) { return d.y; });
			currentMinX = d3.min(data[k].points, function(d) { return d.x; });
			if (currentMaxY > maxY){maxY = currentMaxY;}
			if (currentMaxX > maxX){maxX = currentMaxX;	}
			if (currentMinY < minY){minY = currentMinY;}
			if (currentMinX < minX){minX = currentMinX;	}
		}
	
	var xRatio = (maxX - minX)/(w- 2*padding);
	h= (maxY-minY)/xRatio + 2*padding;
	xScale = d3.scale.linear()
		.domain([0, maxX])
		.range([0+padding+polyWidth, w-padding-polyWidth]);
	yScale = d3.scale.linear()
		.domain([0, maxY])
		.range([0+padding+ labelHeight, h - padding]);
	console.log("h is initialized to: " + h);
	//now that we know width, make SVG
	svg = d3.select("body").append("svg")
	//TODO FIND OUT WHY THIS IS WEIRD
		.attr("width", w+ (polyWidth*2) + 50)
		.attr("height", h+ labelHeight);
		
	var lineFunction = d3.svg.line()
			.x(function(d) {return xScale(d.x) ; })
			.y(function(d) {return h - yScale(d.y) ; })
			.interpolate("linear");
		console.log("in here");
		//The line SVG Path we draw
	for (var i = 0; i < numAxes; i++){
		//DRAW AXES
		var lineGraph = svg.append("path")
			.attr("d", lineFunction(data[i].points))
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("fill", "none")
			.attr("class", "axis");
		//LABEL THE AXES
		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d.name;
			})
			.attr("x", function(d){
				return xScale(d3.mean(d.points, function(e) { return e.x; }));
			})	
			.attr("y",function(d) {
				return h - padding/2;  //line up all axes
		})

	
	
}
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
	
/**	
	d3.selectAll("polygon")
		.filter(function (d, i){ return i ==currentCircle;})
		//RESET POINTS
		.attr("points",function(d, i) { 
			var pts = [];
			startX = parseInt(m[0]);
			startY = parseInt(m[1]);
			//retreive polygon origin 
			if (i == 0){
			
				
				pts = [startX, startY, 
						startX-(polyWidth/4), startY - (polyHeight/2), 
						startX - polyWidth, startY - (polyHeight/2),
						startX - polyWidth, startY + (polyHeight/2),
						startX - (polyWidth/4), startY + (polyHeight/2)
								];		
			}
			else {
			
				pts = [startX, startY, 
						startX+(polyWidth/4), startY - (polyHeight/2), 
						startX + polyWidth, startY - (polyHeight/2),
						startX + polyWidth, startY + (polyHeight/2),
						startX + (polyWidth/4), startY + (polyHeight/2)
								];
			}

			return pts.join(",");
		})
		*/
		

    var closestPointReturn;

		//find closest point
		closestPointReturn = closestPoint(m)


		console.log("CURRENT CIRCLE IS: "+ currentCircle);
		d3.selectAll("polygon")
			.filter(function (d, i){ return i ==currentCircle;})
			.attr("points",function(d, i) { 
				var pts = [];
				//retreive polygon origin 
				if (currentCircle == 0){
					line.attr("x1", closestPointReturn[0]);
					line.attr("y1", closestPointReturn[1]);
					startX =  closestPointReturn[0];
					startY = closestPointReturn[1];
					//console.log("aaaaaaaaa");
					pts = [startX, startY, 
							startX-(polyWidth/4), startY - (polyHeight/2), 
							startX - polyWidth, startY - (polyHeight/2),
							startX - polyWidth, startY + (polyHeight/2),
							startX - (polyWidth/4), startY + (polyHeight/2)
									];		
				}
				else {
					//console.log("AAAAAAAAAAAAAA");
							startX =  closestPointReturn[0];
							startY = closestPointReturn[1];
							line.attr("x2", closestPointReturn[0]);
							line.attr("y2", closestPointReturn[1]);
					pts = [startX, startY, 
							startX+(polyWidth/4), startY - (polyHeight/2), 
							startX + polyWidth, startY - (polyHeight/2),
							startX + polyWidth, startY + (polyHeight/2),
							startX + (polyWidth/4), startY + (polyHeight/2)
									];
				}

				return pts.join(",");
			})
			
		
	
	drawInputs();
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
	else if (currentCircle == 2){
		dataIndex = 1;
	}
	
	var minSqDistance, xScaled, yScaled, closestPointValue;
	minSqDistance = 1e10;
	var axisPoints = data[dataIndex].points;
	var numPoints = axisPoints.length;
	var mx = xScale.invert(m[0]);
	var my = yScale.invert(h - m[1]);
	var destXRaw, destYRaw;
	//iterate to find closest point in new scheme
	for (var i=0;i<numPoints;i++){
		var point = axisPoints[i];
		var px = point.x;
		var py = point.y;
		var currentSqDistance = (mx - px) * (mx - px) + (my - py) * (my - py);
		//find closest tick to current y position
		if (currentSqDistance < minSqDistance){
			var currentPointValue = point.u;
			closestPointValue = currentPointValue;
			minSqDistance = currentSqDistance;
			destXRaw = px;
			destYRaw = py;
			}
	}
	closestCurrentPoints[dataIndex]=closestPointValue;
	xScaled = xScale(destXRaw);
	yScaled = h - yScale(destYRaw);
	return [xScaled, yScaled, closestPointValue];
}


function drawPointers(){
	//var polyWidth = 100;
	//var polyHeight=50;
	//var startX;
	//var startY;
	
	svg.selectAll("polygon")
	    .data(data.filter(function(d, i) { return i != 1 ; }))
	  	.enter().append("polygon")
	    .attr("points",function(d, i) { 
			var pts = [];
			//retreive polygon origin 
			if (i == 0){
				startX = parseInt(line.attr("x1"));
				startY = parseInt(line.attr("y1"));
				
				pts = [startX, startY, 
						startX-(polyWidth/4), startY - (polyHeight/2), 
						startX - polyWidth, startY - (polyHeight/2),
						startX - polyWidth, startY + (polyHeight/2),
						startX - (polyWidth/4), startY + (polyHeight/2)
								];		
			}
			else {
				startX = parseInt(line.attr("x2"));
				startY = parseInt(line.attr("y2"));
				pts = [startX, startY, 
						startX+(polyWidth/4), startY - (polyHeight/2), 
						startX + polyWidth, startY - (polyHeight/2),
						startX + polyWidth, startY + (polyHeight/2),
						startX + (polyWidth/4), startY + (polyHeight/2)
								];
			}

			return pts.join(",");
		})
					
	    .attr("fill","blue")
	    .attr("stroke-width",2)
		.attr("class", "dragpoint")
		.on("mousedown", function(d, i){clickCircle(i, this)})
		.on("mouseup", mouseup);
		svg.on("mouseup", mouseup);
	}


function updateSelector(){
	d = this.value;
	wrangle(d);
	draw();
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
