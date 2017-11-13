$(document).ready(function () {
    var gameArr = [];
    var colorArr = ["#blue", "#red", "#green", "#yellow"]
    var playerArr = [];
    var moves = 0;
    var blue = "#3C6E71";
    var red = "#F6625D";
    var green = "#70Ae6E";
    var yellow = "#F2E174";
    var strict = false;
    $("#counter").html("Moves: </br>" + moves);
    $("#strictMode").hide();
    $("#start").click(function () {
        newGame();
        addCount();
        generateMove();
        showMoves();
        $("#counter").html("Moves: </br>" + moves);
        $("#strictMode").show().removeClass("hover");
    })
    $("#strictMode").click(function () {
        strict = true;
        $("#strictMode").addClass("hover");
    })
    function newGame() {
        gameArr = [];
        playerArr = [];
        moves = 0;
        strict = false;
        $("#counter").html("Moves: </br>" + moves);
    }
    function generateMove() {
        gameArr.push(colorArr[(Math.floor(Math.random() * 4))]);
        console.log("game arr:" +gameArr);
        showMoves();
    }
    function addCount() {
        moves++;
        $("#counter").html("Moves: </br>" + moves);
    }
    function showMoves() {
        var i = 0;
        var roboMoves = setInterval(function () {
            roboClick(gameArr[i]);
            i++;
            if (i >= gameArr.length) {
                clearInterval(roboMoves);
            }
        }, 1000)
        clearPlayer();
    }
    function clearPlayer(){
        playerArr = [];
    }
    function roboClick(colorID) {
        $(colorID).addClass("hover");
        $(colorID + "Sound")[0].play();
        setTimeout(function () {
            $(colorID).removeClass("hover");
        }, 400);
    }
    $("#blue, #green, #red, #yellow").click(function () {
        playerArr.push("#" + this.id);
        $("#" + this.id + "Sound")[0].play();
        checkMove();
        console.log("Player Arr:" +playerArr);
    })
    function checkMove() {
        if (playerArr[playerArr.length - 1] !== gameArr[playerArr.length - 1]) {
            if (strict === true) {
                alert("Game Over!");
                newGame();
            }
            else{
                alert("Try again!");
                showMoves();
            }
        }
        else {
            playerArr.length === gameArr.length
            if (playerArr.length === gameArr.length) {
                if (playerArr.length == 20) {
                    alert("You win!");
                    newGame();
                    $("#strictMode").removeClass("hover");
                }
                else {
                    setTimeout(function () {
                         nextRound();
                    }, 400);
                   
                }
            }
        }
    }

function nextRound() {
        addCount();
        generateMove();
    }
 
})