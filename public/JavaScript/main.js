import settings from '../settings.json' assert {type: 'json'}

const game = new Game(6,7, settings);

$(document).ready(function(){
    game.drawBoard();

    // event handling
    $("#undo").on('click', function(){
        game.undo();
    })
    $(".change_turn").on('click', function(){
        if($(this).hasClass("active") === false && game.gameDone == false){
            $(".change_turn.active").removeClass("active");
            $(this).addClass("active");
            game.changeTurn($(this).attr("data-turn"));
        }
    })
    $("#new_game_button").on('click', function(){
        // get the selected difficulty
        var difficulty = $("#difficulty").val();
        game.setDifficulty(difficulty);
        game.newGame();
    });
})
