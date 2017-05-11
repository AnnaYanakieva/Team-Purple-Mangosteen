//window.localStorage.clear(); /// clear scoring history
			
let counter = 0;

var snake = new Object;
snake['size'];
snake['position'];

var speed = new Object;
speed['slow'] = 100;
speed['medium'] = 75;
speed['fast'] = 50;
speed['cheetah'] = 40;
speed['insane'] = 25;
snake['speed'];

var direction = new Object;
direction['up'] = [0,-10];
direction['down'] = [0,10];
direction['left'] = [-10,0];
direction['right'] = [10,0];

snake['direction'];
snake['dead'];
         
var tail;
var prey = new Object;
prey['position'];
prey['type'];
prey['draw'] = function(context) {
	var image = new Image();
	image.src = "img/" + prey['type']+ ".png";
	context.drawImage(image,prey['position'][0],prey['position'][1]);
};
prey['cherry'] = 50.0/1;
prey['apple'] = 10.0/1;
prey['grape'] = 5.0/1;
prey['banana'] = 2.0/1;
prey['onion'] = 1.0/1;
let highscores = new Array();
var localStorage = supportsHtml5Storage();

// preload images
if (document.images){
	var img = new Array();
	img[0] = new Image();
	img[0].src = 'img/apple.png';
	img[1] = new Image();
	img[1].src = 'img/banana.png';
	img[2] = new Image();
	img[2].src = 'img/cherry.png';
	img[3] = new Image();
	img[3].src = 'img/grape.png';
	img[4] = new Image();
	img[4].src = 'img/headdown.png';
	img[5] = new Image();
	img[5].src = 'img/headleft.png';
	img[6] = new Image();
	img[6].src = 'img/headright.png';
	img[7] = new Image();
	img[7].src = 'img/headup.png';
	img[8] = new Image();
	img[8].src = 'img/leftbottom.png';
	img[9] = new Image();
	img[9].src = 'img/lefttop.png';
	img[10] = new Image();
	img[10].src = 'img/onion.png';
	img[11] = new Image();
	img[11].src = 'img/rightbottom.png';
	img[12] = new Image();
	img[12].src = 'img/righttop.png';
	img[13] = new Image();
	img[13].src = 'img/tailendbottom.png';
	img[14] = new Image();
	img[14].src = 'img/tailendleft.png';
	img[15] = new Image();
	img[15].src = 'img/tailendright.png';
	img[16] = new Image();
	img[16].src = 'img/tailendtop.png';
	img[17] = new Image();
	img[17].src = 'img/tailmiddle.png';
	img[18] = new Image();
	img[18].src = 'img/tailmiddlehorizontal.png';
}

function setup(){
	printUsername();
	for(var i = 0; i<localStorage.length; i++)
	{
		highscores[i] = localStorage[i];
	}
	printScores();
}

function printUsername(){
	// const username = localStorage.getItem('username'); // if we use localStorage for username
	const username = window.location.hash.toString().split("/:")[1];
	document.getElementById("username").innerHTML = username;
}

function supportsHtml5Storage() {
	try {
    		return 'localStorage' in window && window['localStorage'] !== null;
  	} 
  	catch (e) {
    		return false;
  	}
}

function submit(){
	for(let i = 0; i < 5; i++){
		if(highscores[i] > -1){
		localStorage[i] = highscores[i];
		} else{
		localStorage[i] = 0;
		}				
	}
}

function checkScore(){
	for(let i = 0; i < 5; i++){
		if(localStorage[i]){
			highscores[i] = localStorage[i];
		}
	}
	
	highscores[6] = counter;
	highscores.sort(function (a, b) {
                     return b - a;
	});
	submit();
}

function printScores(){
	for(var i = 0; i < 5; i++){ // 5 top positions					
		document.getElementById("score"+ (i+1)).innerHTML = localStorage[i].toString();
	}
}

function count(){
	counter += (1500 / (speed[snake['speed']]))*(prey[prey['type']]);
	document.getElementById("counter").innerHTML = counter;
}

function addTail(){
	tail[tail.length] = [-100,100];
}

function moveSnake(){
	for(var i = tail.length-1;i > 0;i--){
		tail[i] = tail[i-1];
	}
	tail[0] = snake['position'].slice(0);				
	snake['position'][0] += direction[snake['direction']][0];
	snake['position'][1] += direction[snake['direction']][1];
}

function checkCollision(){
	if(snake['position'][0] < 0 || 						//if snake is dead
			snake['position'][0] > 400-snake['size'] || 
			snake['position'][1] < 0 || 
			snake['position'][1] > 400-snake['size']){
		snake['dead'] = true;
	}
	
	if(prey['position'][0] == snake['position'][0] && 
			prey['position'][1] == snake['position'][1]){	
		addTail();
		count();
		makePrey();		
	}
	
	for(let i in tail){
		if(snake['position'][0] == tail[i][0] && snake['position'][1] == tail[i][1]){
			snake['dead'] = true;
		}
	}
}

function checkPosValid(pos){
	if(pos === snake['position']){
		return false;
	}
	
	for(var i = 0;i < tail.length;i++){
		if(pos === tail){
			return false;
		}
	}
	
	return true;
}

function makePrey(){
	var pos = [Math.floor(Math.random()*40),Math.floor(Math.random()*40)];
	
	while(!checkPosValid(pos)){
		pos = [Math.floor(Math.random()*40),Math.floor(Math.random()*40)];
	}
	
	prey['position'] = new Array(pos[0]*10,pos[1]*10);
	var num = Math.floor(Math.random()*50+1);
	
	if(num % prey['cherry'] == 0){
		prey['type'] = 'cherry';
	}
	else if(num % prey['apple'] == 0){
		prey['type'] = 'apple';
	}
	else if(num % prey['grape'] == 0){
		prey['type'] = 'grape';
	}
	else if(num % prey['banana'] == 0){
		prey['type'] = 'banana';
	}
	else{
		prey['type'] = 'onion';
	}
}

function keyListener(e){
	if(!snake['dead']){
		if(!e){
			e = window.event;
		}
		if(e.keyCode == 38 && (snake['direction'] == 'left' || snake['direction'] == 'right')){
			snake['direction'] = 'up';
		}		
		else if(e.keyCode == 40 && (snake['direction'] == 'left' || snake['direction'] == 'right')){
			snake['direction'] = 'down';
		}
		else if(e.keyCode == 37 && (snake['direction'] == 'up' || snake['direction'] == 'down')){
			snake['direction'] = 'left';
		}
		else if(e.keyCode == 39 && (snake['direction'] == 'up' || snake['direction'] == 'down')){
			snake['direction'] = 'right';
		}
	}
}

function determineBlock(prev,block,next){
	if (prev[1] == block[1] && block[1] == next[1]){
		return "img/tailmiddlehorizontal.png";
	}
	else if (prev[0] == block[0] && block[0] == next[0]){
		return "img/tailmiddle.png";
	}
	if (prev[0] == block[0]){
		if (prev[1] > block[1]){
			var topbottom = "bottom";
		}
		else if (prev[1] < block[1]){
			var topbottom = "top";
		}
		if (next[0] > block[0]){
			var leftright = "right";
		}
		else if (next[0] < block[0]){
			var leftright = "left";
		}
	}
	else if (prev[1] == block[1]){
		if (prev[0] > block[0]){
			var leftright = "right";
		}
		else if (prev[0] < block[0]){
			var leftright = "left";
		}
		if (next[1] > block[1]){
			var topbottom = "bottom";
		}
		else if (next[1] < block[1]){
			var topbottom = "top";
		}
	}
	return "img/" + leftright + topbottom + ".png";
}

function draw()
{
	var canvas = document.getElementById("screen");
	var context = canvas.getContext("2d");
	context.clearRect(0,0,400,400);
	var image = new Image();
	image.src = "img/head" + snake['direction'] + ".png";
	context.drawImage(image,snake['position'][0],snake['position'][1]);
	for (var i = 0;i < tail.length-1;i++){
		var image = new Image();
		if (i == 0){
			image.src = determineBlock(snake['position'],tail[0],tail[1]);
		}
		else {
			image.src = determineBlock(tail[i-1],tail[i],tail[i+1]);
		}
		context.drawImage(image,tail[i][0],tail[i][1]);
	}
	
	var image = new Image();
	if (tail[tail.length-2][0] == tail[tail.length-1][0] && tail[tail.length-2][1] > tail[tail.length-1][1]){
		image.src = "img/tailendbottom.png";
	}
	else if (tail[tail.length-2][0] == tail[tail.length-1][0] && tail[tail.length-2][1] < tail[tail.length-1][1]){
		image.src = "img/tailendtop.png";
	}
	else if (tail[tail.length-2][0] > tail[tail.length-1][0] && tail[tail.length-2][1] == tail[tail.length-1][1]){
		image.src = "img/tailendright.png";
	}
	else if (tail[tail.length-2][0] < tail[tail.length-1][0] && tail[tail.length-2][1] == tail[tail.length-1][1]){
		image.src ="img/tailendleft.png";
	}
	context.drawImage(image,tail[tail.length-1][0],tail[tail.length-1][1]);
	prey['draw'](context);
}

function step(){
	moveSnake();
	checkCollision();
	draw();
	
	if(snake['dead']){
		document.getElementById("result").innerHTML = "You Died!";
		document.getElementById("button").style.visibility = 'visible';
		checkScore();
		printScores();
	}
	else{
		waitForStep();
	}

}

function waitForStep(){
	setTimeout('step()',speed[snake['speed']]);
}

function game(){
	snake['size'] = 10;
	snake['position'] = [40,10];
	snake['speed'] = document.getElementById("speed").value;
	snake['direction'] = 'right';
	snake['dead'] = false;
	counter = 0;
	tail = new Array(new Array(30,10),new Array(20,10),new Array(10,10),new Array(0,10));
	document.getElementById("button").style.visibility = 'hidden';
	document.getElementById("result").innerHTML = "";
	document.onkeydown = keyListener;
	document.getElementById("counter").innerHTML = counter;
	makePrey();
	draw();
	waitForStep();
}
