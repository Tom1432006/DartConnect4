const board_width = 7;
const board_height = 6;

var ids = [];
// fill ids with empty values
for(var y = 0;y < board_height; y++){
    var row = [];
    for(var x = 0;x < board_width;x++){
        row.push(0);
    }
    ids.push(row);
}

var difficulty = 0;

// define all the difficulties
const num_s1_start = [9,7,4,6,1,3];
const num_s1_end = [9,8,5,7,2,4];

const num_s2_start = [10,9,6,8,3,5];
const num_s2_end = [11,10,7,9,4,6];

const num_s3_start = [11,10,7,9,1,8];
const num_s3_end = [12,10,7,9,2,8];

const num_s4_start = [12,11,8,10,1,9];
const num_s4_end = [13,11,8,10,2,9];

function generateBoard(){
    $("#game").html("<h1>Laden...</h1>");
    var board = "";

    var used_numbers = [];

    // generate rows
    for(var h = 0; h < board_height; h++){
        var row = "<div class='board_row'>";

        // fill the row
        for(var w = 0; w < board_width; w++){
            var cell_number = getCellNumber(h)

            // check if number is already used
            while(used_numbers.includes(cell_number)){
                var cell_number = getCellNumber(h);
            }

            used_numbers.push(cell_number);
            var uniqID = guidGenerator();

            ids[h][w] = uniqID;

            var state = "open";
            if(h < board_height-1){
                state = "disabled";
            }
            row += "<div class='board_cell' data-state='"+state+"' id='"+uniqID.toString()+"'><button class='cell_button' onclick='changeState(\""+uniqID.toString()+"\")'>" + cell_number.toString() + "</button></div>";
        }

        row += "</div>";
        board += row;
    }
    

    $("#game").html(board);
}

function getCellNumber(row){
    switch(difficulty){
        case 0:
            var top = num_s1_start[row]*10;
            var bottom = (num_s1_end[row] + 1)*10;
            break;
        case 1:
            var top = num_s2_start[row]*10;
            var bottom = (num_s2_end[row] + 1)*10;
            break;
        case 2:
            var top = num_s3_start[row]*10;
            var bottom = (num_s3_end[row] + 1)*10;
            break;
        case 3:
            var top = num_s4_start[row]*10;
            var bottom = (num_s4_end[row] + 1)*10;
            break;
        }
            
    return getRandomInt(top, bottom);
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
    // get the position on the board from the id
    pos = findPositionInArray(id, ids);
    y = pos[0];
    x = pos[1];

    var upper_cell_state = "";
    // get the id of the upper field
    if(y != 0){
        upper_cell_state = document.getElementById(ids[y-1][x]).getAttribute("data-state");
    }

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
            if(upper_cell_state == "disabled" || upper_cell_state == "open" || y == 0){
                $("#"+id).attr("data-state", "open");
            }else{
                $("#"+id).attr("data-state", "cross");
            }
            break;
    }  
    
    updateDisabledCells();
}

function updateDisabledCells(){
    // loop through the hole board except the last row
    for(var y = 0;y < board_height-1;y++){
        for(var x = 0;x < board_width;x++){
            var cell_under_id = ids[y+1][x];
            var cell_id = ids[y][x];

            var cell_under_state = document.getElementById(cell_under_id).getAttribute("data-state");
            var cell_state = document.getElementById(cell_id).getAttribute("data-state");

            // if the cell below is filled in, open the cell
            if((cell_under_state == "cross" || cell_under_state == "circle") && cell_state == "disabled"){
                $("#"+cell_id).attr("data-state", "open");
            }

            // if the cell below is open and the curent cell is also open close the current one
            if(cell_state == "open" && cell_under_state == "open"){
                $("#"+cell_id).attr("data-state", "disabled");
            }
        }
    }
}

function changeDifficulty(num){
    difficulty = num;
    generateBoard();
}

function findPositionInArray(id, array){
    for(var y = 0; y < board_height; y++){
        for(var x = 0 ;x < board_width; x++){
            if(array[y][x] == id){
                return [y, x];
            }
        }
    }
    return [null, null];
}