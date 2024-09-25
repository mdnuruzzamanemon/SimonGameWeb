var buttonColors=["red", "green", "blue",  "yellow"];

var gamePattern=[];
var userClickPattern=[];

var started=false;
var level=0;

$(document).keypress(function()
{
    if(!started)
    {
        nextSequence();
        started=true;
    }
});

$(".btn").click(function()
{
    var clickedButton=$(this).attr("id");
    userClickPattern.push(clickedButton);
    playSound(clickedButton);
    buttonAnimation(clickedButton);
    checkAnswer(userClickPattern.length-1);
});

function nextSequence()
{
    userClickPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function buttonAnimation(buttonName)
{
    $("#"+buttonName).addClass("pressed");
    setTimeout(function()
    {
        $("#"+buttonName).removeClass("pressed");
    },100);
}

function checkAnswer(givenLength)
{
    if(userClickPattern[givenLength]===gamePattern[givenLength])
    {
        if(userClickPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
        
    }
    else
    {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver()
{
    started=false;
    level=0;
    gamePattern=[];
    
}