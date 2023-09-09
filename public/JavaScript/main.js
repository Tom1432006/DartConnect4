const settings = {
"difficulties":{
        "1": [
            {"start": 90, "end": 99},
            {"start": 70, "end": 79},
            {"start": 40, "end": 49},
            {"start": 60, "end": 69},
            {"start": 10, "end": 19},
            {"start": 30, "end": 39}
        ],
        "2": [
            {"start": 100, "end": 109},
            {"start": 90, "end": 99},
            {"start": 60, "end": 69},
            {"start": 80, "end": 89},
            {"start": 30, "end": 39},
            {"start": 50, "end": 59}
        ],
        "3": [
            {"start": 110, "end": 119},
            {"start": 100, "end": 109},
            {"start": 70, "end": 79},
            {"start": 90, "end": 99},
            {"start": 10, "end": 19},
            {"start": 80, "end": 89}
        ],
        "4": [
            {"start": 120, "end": 129},
            {"start": 110, "end": 119},
            {"start": 80, "end": 89},
            {"start": 100, "end": 109},
            {"start": 10, "end": 19},
            {"start": 90, "end": 99}
        ]
    }
};

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
