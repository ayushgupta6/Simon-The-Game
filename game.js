var gamepattern = [];
var userpattern = [];
var btncolor = ["red","blue","green","yellow"];
var level=0;
var started=false;

function playsound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userpattern = [];
    var random = Math.floor(Math.random()*4);
    var rancolor= btncolor[random];
    gamepattern.push(rancolor);
    level++;
    $("#level-title").text("Level "+ level);
    $("#"+rancolor).fadeOut().fadeIn();
    playsound(rancolor);
}

$(".btn").click(function() {
    var usercolor = $(this).attr("id");
    userpattern.push(usercolor);
    playsound(usercolor);
    animatePress(usercolor);
    checkAnswer(userpattern.length-1);
});

$(document).keypress(function(event){
    if(!started)
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
    else{
        var usercolor ;
        switch(event.key)
        {
            case "w":
                usercolor= "green";
                break;
            case "e":
                usercolor= "red";
                break;
            case "s":
                usercolor= "yellow";
                break;
            case "d":
                usercolor= "blue";
                break;
            default:
                startover();
                break;
        }
        userpattern.push(usercolor);
        playsound(usercolor);
        animatePress(usercolor);
        checkAnswer(userpattern.length-1);
    }
});

function checkAnswer(clevel){
    if(userpattern[clevel] === gamepattern[clevel]){
        console.log("success");

        if(gamepattern.length === userpattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 100);
        }
    }
    else   
    {
        startover(); 
    }
}

function startover()
{
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);  
    $("h1").text("Game Over, Press Any Key to Restart");
    started=false;
    gamepattern=[];
    level = 0;
}