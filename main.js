/*target all elements to save to constants*/
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page1=document.querySelector("#page1");
const page2=document.querySelector("#page2");
const page3=document.querySelector("#page3");

function hideall(){//function to hide all pages
	page1.style.display="none";
	page2.style.display="none";
	page3.style.display="none";
}
/*Listen for clicks on the buttons, assign anonymous event
handler function to call shwo function*/
page1btn.addEventListener("click", function(){
	hideall();//we dont know which page is show, so hideall
	page1.style.display="block";
});
page2btn.addEventListener("click", function(){
	hideall();//we dont know which page is show, so hideall
	page2.style.display="block";
});
page3btn.addEventListener("click", function(){
	hideall();//we dont know which page is show, so hideall
	page3.style.display="block";
});
hideall();//call hideall function to hide all pages

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

/*find references to all the buttons and ball*/
const leftBtn=document.querySelector("#leftBtn");
const rightBtn=document.querySelector("#rightBtn");
const upBtn=document.querySelector("#upBtn");
const downBtn=document.querySelector("#downBtn");
const resetBtn=document.querySelector("#resetBtn");
const ball=document.querySelector("#ball");
var ballX = 0;//initial position of ball
var ballY = 0;

function ResetPos(){
	ballX=ballY=0;
	ball.style.left=ballX+"px";
	ball.style.top=ballY+"px";
	ball.innerText=ballX+","+ballY;
}
function MovePos(leftInc,topInc){
	ballX=ballX+leftInc;
	if (ballY+topInc <= 0){
		ballY = ballY;
	}else{
		ballY = ballY+topInc;
	}
	ball.style.left=ballX+"px";
	ball.style.top=ballY+"px";
	ball.innerText=ballX+","+ballY;
}
function MoveLeft(){
	ballX =ballX-10;
	ballY =ballY+0;
	if (ballX <0){
		ballX=ballX+10;
	}
	ball.style.left=ballX+"px";
	ball.style.top=ballY+"px";
	ball.innerText=ballX+","+ballY;
}
leftBtn.addEventListener("click",MoveLeft);
rightBtn.addEventListener("click",function(){
	MovePos(10,0);
});
upBtn.addEventListener("click",function(){
	MovePos(0,-10);
});
downBtn.addEventListener("click",function(){
	MovePos(0,10);
});
resetBtn.addEventListener("click",ResetPos);

var velX, velY; //to store x and y velocity
const minLeft = 0;
const minTop = 0;
const maxTop = 500;
const maxLeft = 300;
//function to pick random number from a min-max range
function RandomRange(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function MoveBallUsingVelocity() {
	ballX += velX; //increase ball x by velX
	ballY += velY; //increase ball y by velY
	
	if (ballX > maxLeft) {
		velX = -velX; //reverse the X velocity
		ballX = maxLeft; //snap ballX to maxLeft
	}
	if (ballY > maxTop) {
		velY = -velY;
		ballY = maxTop; //snap ballY to maxTop
	}
	if (ballX < minLeft) {
		velX = -velX;
		ballX = minLeft;
	}
	if (ballY < minTop) {
		velY = -velY;
		ballY = minTop;
	}
	ball.style.left = ballX+"px"; //set left property to ball x variable
	ball.style.top = ballY +"px"; //set top property to ball x variable
	ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
//function to activate MoveBallUsingVelocity
function StartAutoMove() {
	velX = RandomRange(-10, 10); //pick btw -10 to 10
	velY = RandomRange(-10, 30); //pick btw -10 to 30
	//repeat calling MoveBallUsingVelocity() every 100ms
	setInterval(MoveBallUsingVelocity, 100);
}
StartAutoMove(); //invoke the function to activate automov


//durina game
const durianId=document.getElementById("durianId");
function GetRandom(min,max){
	return Math.round(Math.random() * (max - min))+min;
}
function MoveDurian(){
	durianId.style.left=GetRandom(0,500)+"px";
	durianId.style.top = GetRandom(0,500)+"px";
	durianId.classList.remove("shrink");
	durianId.classList.add("anim1");
}
setInterval(MoveDurian, 1000);

const scoreBox=document.getElementById("scoreBox");

const popAudio=new Audio("popsound.mp3");

var score=0;
function durianCatch(){
	score++;
	scoreBox.innerHTML="Score: "+score;
	popAudio.play();
	durianId.classList.remove("anim1");
	durianId.classList.add("shrink");
}
durianId.addEventListener("click",durianCatch);

document.addEventListener("keydown",function(evt){
	console.log(evt);
	if(evt.code=="KeyT"){
		durianId.classList.add("shrink");
	}
	if(evt.code=="KeyU"){
		durianId.classList.remove("shrink");
	}
	if(evt.code=="KeyA"){
		durianId.classList.add("anim1");
	}
	if(evt.code=="KeyB"){
		durianId.classList.remove("anim1");
	}
});
