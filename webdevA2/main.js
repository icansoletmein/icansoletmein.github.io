/*target all elements to save to constants*/
const homebtn=document.querySelector("#homebtn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const home=document.querySelector("#home");
const page1=document.querySelector("#page1");
const page2=document.querySelector("#page2");
const page3=document.querySelector("#page3");

//function to hide sub pages 
function hidesubpages(){
	page1.style.display="none";
	page2.style.display="none";
	page3.style.display="none";
}
//function to hide home page
function hidehome(){
	home.style.display="none";
}
//button active
function hidebutton(){
	page1btn.classList.remove('is-clicked');
	page2btn.classList.remove('is-clicked');
	page3btn.classList.remove('is-clicked');
}

function hidehomebutton(){
	homebtn.classList.remove('is-clicked');
}

//check for clicking of the page buttons
homebtn.addEventListener("click", function(){
	hidesubpages();//hides sub pages
	home.style.display="block";//then show the home page
	hidebutton();
	homebtn.classList.add('is-clicked');
});
page1btn.addEventListener("click", function(){
	//hide all the pages
	hidesubpages();
	hidehome();
	page1.style.display="grid";//then show the page you want to show
	hidebutton();
	hidehomebutton();
	page1btn.classList.add('is-clicked');
});
page2btn.addEventListener("click", function(){
	hidesubpages();
	hidehome();
	page2.style.display="block";
	hidebutton();
	hidehomebutton();
	page2btn.classList.add('is-clicked');
});

page3btn.addEventListener("click", function(){
	hidesubpages();
	hidehome();
	page3.style.display="block";
	hidebutton();
	hidehomebutton();
	page3btn.classList.add('is-clicked');
});

//call hideall function to hide sub pages
hidesubpages();
//give homebtn "is-clicked" since it would be the first page that appears
homebtn.classList.add('is-clicked');


//menu button for break point at 800px width
const hamBtn=document.querySelector("#hamIcon");
const menuItemsList=document.querySelector("nav ul");
hamBtn.addEventListener("click",toggleMenus);

function toggleMenus(){
	menuItemsList.classList.toggle("menuShow");//gives the items in mnueItemsList the class "menuShow" then back in css, sets them to block
	if(menuItemsList.classList.contains("menuShow")){
		hamBtn.innerHTML="Close Menu";
	}else{
		hamBtn.innerHTML="Open Menu";
	}
}

//The form
const submitBtn = document.querySelector("#submitBn");
const resetform = document.querySelector("#resetForm");
const formpage = document.querySelector("#formpaper");
const thxbox = document.querySelector("#thxbox");

submitBtn.addEventListener("click", function(){
	formpage.style.display="none";
	thxbox.innerHTML = "Thank you for giving us feedback!";
});

resetform.onclick = function(){
	console.log("formpaper reset");
	formpage.style.display="block";
	thxbox.innerHTML = "";
	formpage.reset();
	
};

//quiz
const correctBox=document.querySelector("#correctBox");
var q1Op1,q1Op2,q1Op3,q1Op4,correct=0;
const quiz = document.getElementById("quiz");
const resetQz = document.getElementById("resetQz");
const submitQz = document.getElementById("submitQz");

resetQz.onclick = function(){
	console.log("quiz reset");
	quiz.reset();
	
};

submitQz.onclick = function(){
	correct=0;
	//Qns 1
	q1Op1=document.getElementById("layer1").value;
	q1Op2=document.getElementById("layer2").value;
	q1Op3=document.getElementById("layer3").value;
	q1Op4=document.getElementById("layer4").value;
	if(q1Op1=="crust" && q1Op2=="mantle" && q1Op3=="outer" && q1Op4=="inner"){
		correct++;
	}
	console.log(q1Op1);
	console.log(q1Op2);
	console.log(q1Op3);
	console.log(q1Op4);
	
	//Qns 2
	//not needed for qns 1 since it already have all of it filled up by default
	//checks if selectedQ2 have something(the if is checking if selected is true, then will collect the value of it)
	const selectedQ2 = document.querySelector('input[name="mostLand"]:checked');
	if (selectedQ2) {
		const q2 = selectedQ2.value;
		console.log(q2);
		if (q2 == "Asia") {
			correct++;
		}
	}
	
	//Qns 3
	const selectedQ3 = document.querySelector('input[name="noOcean"]:checked');
	if (selectedQ3) {
		const q3 = selectedQ3.value;
		console.log(q3);
		if (q3 == "p5") {
			correct++;
		}
	}	
	
	correctBox.innerHTML="Score:"+correct;
};

//earth game
const player_moving = document.querySelector("#gameBox .player");
const up = document.getElementById("up");
const down = document.getElementById("down");
const asteroid = document.getElementById("asteroid");
const asteroid2 = document.getElementById("asteroid2");
const asteroid3 = document.getElementById("asteroid3");
const startBtn=document.getElementById("startBtn");
const scoreBox=document.getElementById("scoreBox");
var score=0;

const flyingPastAudio=new Audio("audio/flyingPast.m4a");
const crashingAudio=new Audio("audio/crashing.m4a");
const timeS=document.getElementById("timeS");
var timeSurvived = 0;
var speedchange = 0;
var gameInterval;
var timeInterval;
var speedupInterval;
const resetGame = document.getElementById("resetGame");

resetGame.onclick = function(){
	clearInterval(gameInterval);
	clearInterval(timeInterval);
	clearInterval(speedupInterval);
	asteroid.style.marginRight="0%";
	asteroid2.style.marginRight="0%";
	asteroid3.style.marginRight="0%";
	asteroid.classList.remove("hidden");
	asteroid2.classList.add("hidden");
	asteroid3.classList.add("hidden");
	scoreBox.innerHTML="Score: ";
	timeS.innerHTML="time survived: ";
	startBtn.classList.remove("playing");
	console.log("game reset");
};

//random num generator function
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//checking for collision
function loop() {
	//Check if the element still has the class
	if (startBtn.classList.contains('playing')) {
		console.log('Looping...');

		//It gets the number of px from the top left of the view point to the top/botton/left/right points of the images
		const rect1 = asteroid.getBoundingClientRect();
		const rect2 = player_moving.getBoundingClientRect();
		const rect3 = asteroid2.getBoundingClientRect();
		const rect4 = asteroid3.getBoundingClientRect();

		// Standard AABB (Axis-Aligned Bounding Box) collision logic
		const Colliding1to2 = !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
		);

		const Colliding3to2 = !(
		rect3.right < rect2.left ||
		rect3.left > rect2.right ||
		rect3.bottom < rect2.top ||
		rect3.top > rect2.bottom
		);
		
		const Colliding4to2 = !(
		rect4.right < rect2.left ||
		rect4.left > rect2.right ||
		rect4.bottom < rect2.top ||
		rect4.top > rect2.bottom
		);
		
		const isColliding = Colliding1to2 || Colliding3to2 || Colliding4to2;
		
		if (isColliding) {
			console.log("Collision detected!");
			player_moving.classList.add('died');
			
			//dying audio
			crashingAudio.play();

			//clear intervals
			clearInterval(gameInterval);
			clearInterval(timeInterval);
			clearInterval(speedupInterval);
			
			//reset posistion
			asteroid.style.marginRight="0%";
			asteroid2.style.marginRight="0%";
			asteroid3.style.marginRight="0%";
			
			asteroid.classList.remove("hidden");
			asteroid2.classList.add("hidden");
			asteroid3.classList.add("hidden");
			
			//updating score and timer
			scoreBox.innerHTML="Earth got hit :(, you got past "+score+" asteroids.";
			timeS.innerHTML="time survived: "+timeSurvived+" secs";
			//stop the game/playing
			startBtn.classList.remove("playing");
		}

		//Continue the loop by requesting the next frame
		requestAnimationFrame(loop);
	}
}

let whichAst =1;

function startgame(){//this will keep running cuz set interval
	let currentMargin = parseInt(asteroid.style.marginRight) || 0;
	asteroid.style.marginRight=(currentMargin + 5)+"%";
	let currentMargin2 = parseInt(asteroid2.style.marginRight) || 0;
	asteroid2.style.marginRight=(currentMargin2 + 5)+"%";
	let currentMargin3 = parseInt(asteroid3.style.marginRight) || 0;
	asteroid3.style.marginRight=(currentMargin3 + 5)+"%";
	
	//this resets when out of bound
	if (currentMargin > 90 || currentMargin2 > 90 || currentMargin3 >90){
		asteroid.style.marginRight="0%";
		asteroid2.style.marginRight="0%";
		asteroid3.style.marginRight="0%";
		score++;
		scoreBox.innerHTML="Score: "+score;
		flyingPastAudio.play();
		
		asteroid.classList.add("hidden");
		asteroid2.classList.add("hidden");
		asteroid3.classList.add("hidden");
		
		whichAst = getRandomInt(1,3);
		switch(whichAst){
			case 1:
				asteroid.classList.toggle("hidden");
				break;
			case 2:
				asteroid2.classList.toggle("hidden");
				break;
			case 3:
				asteroid3.classList.toggle("hidden");
				break;
			default:
				console.log("random not working");
				asteroid.classList.toggle("hidden");
				break;
		}
	}
}

//timer
function timer() {
	timeSurvived++;
	timeS.innerHTML="time survived: "+timeSurvived+" secs";
}


function speedup(){
	clearInterval(gameInterval);
	speedchange+= 5;
	gameInterval = setInterval(startgame, 50-speedchange);
}

//to start game
startBtn.addEventListener("click",function(){
	startBtn.classList.toggle("playing");
	player_moving.style.marginLeft="0%";
	player_moving.style.marginBottom="0vh";
	//setInterval and reset
	if (startBtn.classList.contains("playing")){
		gameInterval = setInterval(startgame, 50);
		player_moving.classList.remove('died');
		//to get the loop going
		requestAnimationFrame(loop);
		score=0;//needs to reset
		//timer
		timeSurvived=0;
		speedchange=0;
		timeInterval = setInterval(timer, 1000);
		speedupInterval = setInterval(speedup, 5000);//5 secs
		
		console.log("game playing");	
		/*to make sure the game resets when the game start*/
		asteroid.style.marginRight="0%";
		asteroid2.style.marginRight="0%";
		asteroid3.style.marginRight="0%";
		asteroid.classList.remove("hidden");
		asteroid2.classList.add("hidden");
		asteroid3.classList.add("hidden");
	}
	else{
		console.log("game ended");
		clearInterval(gameInterval);
		clearInterval(timeInterval);
		clearInterval(speedupInterval);
		asteroid.style.marginRight="0%";
		asteroid2.style.marginRight="0%";
		asteroid3.style.marginRight="0%";
		asteroid.classList.remove("hidden");
		asteroid2.classList.add("hidden");
		asteroid3.classList.add("hidden");
	}
});

//player movement for laptop
document.addEventListener("keydown",function(evt){
	console.log(evt);
	if(evt.code == "KeyW"){
		//makes the sprite change
		player_moving.classList.add("player_jump");
		player_moving.classList.remove("player_normal");
		//gets the current margin-bottom
		let currentPlayerMarginBottom = parseInt(player_moving.style.marginBottom) || 0;
		//add to get the new posistion
		let newMarginBottom=(currentPlayerMarginBottom + 110);
		//checks for out of bound before updating the actual margin
		if (newMarginBottom < 230){
			player_moving.style.marginBottom = newMarginBottom + "px";
		}
		else{
			player_moving.style.marginBottom="230px";
		}
	}
	if(evt.code == "KeyS"){
		player_moving.classList.remove("player_jump");
		player_moving.classList.add("player_normal");
		let currentPlayerMarginBottom = parseInt(player_moving.style.marginBottom) || 0;
		let newMarginBottom=(currentPlayerMarginBottom - 110);
		if (newMarginBottom > 0){
			player_moving.style.marginBottom = newMarginBottom + "px";
		}
		else{
			player_moving.style.marginBottom="0px";
		}
	}
});

//movement for phone
up.onclick = function(){
	//makes the sprite change
	player_moving.classList.add("player_jump");
	player_moving.classList.remove("player_normal");
	//gets the current margin-bottom
	let currentPlayerMarginBottom = parseInt(player_moving.style.marginBottom) || 0;
	//add to get the new posistion
	let newMarginBottom=(currentPlayerMarginBottom + 110);
	//checks for out of bound before updating the actual margin
	if (newMarginBottom < 230){
		player_moving.style.marginBottom = newMarginBottom + "px";
	}
	else{
	player_moving.style.marginBottom="230px";
	}
};

down.onclick = function(){
	player_moving.classList.remove("player_jump");
	player_moving.classList.add("player_normal");
	let currentPlayerMarginBottom = parseInt(player_moving.style.marginBottom) || 0;
	let newMarginBottom=(currentPlayerMarginBottom - 110);
	if (newMarginBottom > 0){
		player_moving.style.marginBottom = newMarginBottom + "px";
	}
	else{
		player_moving.style.marginBottom="0px";
	}
};
