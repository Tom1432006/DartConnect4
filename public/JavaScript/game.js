const board_width = 7;
const board_height = 6;

var difficulty = 1

function generateBoard(){
    $("#game").html("<h1>Laden...</h1>");
    var board = "";

    var used_numbers = [];

    // generate rows
    for(var h = 0; h < board_height; h++){
        var row = "<div class='board_row'>";

        // fill the row
        for(var w = 0; w < board_width; w++){
            var cell_number = getCellNumber()

            // check if number is already used
            while(used_numbers.includes(cell_number)){
                var cell_number = getCellNumber();
            }

            used_numbers.push(cell_number);
            var uniqID = guidGenerator();

            row += "<div class='board_cell' data-state='open' id='"+uniqID.toString()+"'><button class='cell_button' onclick='changeState(\""+uniqID.toString()+"\")'>" + cell_number.toString() + "</button></div>";
        }

        row += "</div>";
        board += row;
    }
    

    $("#game").html(board);
}

function getCellNumber(){
    switch(difficulty){
        case 0:
            var cell_number = getRandomInt(2, 50);
            break;
        case 1:
            var cell_number = getRandomInt(10, 70);
            break;
        case 2:
            var cell_number = getRandomInt(10, 95);
            break;
    }

    return cell_number;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

window.onload = function(){
    generateBoard();
}
  

// functions for changeing the state of a cell
function changeState(id){
    // get current state
    var current_state = $("#"+id).attr("data-state");

    switch(current_state){
        case 'open':
            $("#"+id).attr("data-state", "cross");
            break;
        case 'cross':
            $("#"+id).attr("data-state", "circle");
            break;
        case 'circle':
            $("#"+id).attr("data-state", "open");
            break;
    }   
}

function changeDifficulty(num){
    difficulty = num;
    generateBoard();
}