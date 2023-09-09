class Game{
    board = [];
    last_moves = [];
    board_label = [];
    winboard = [];
    difficulty = 1;

    gameDone = false;
    turn = 1;

    // current numbers for current difficulty
    difficulties = [];

    used_numbers = [];

    constructor(height, width, settings){
        this.height = height;
        this.width = width;
        this.settings = settings
        this.boardSize = this.height*this.width;

        this.loadDifficulties();
        this.generateBoard();
    }

    /* methods for controlling the game */
    makeMove(collumn){
        this.last_board = this.board;

        // go down the collum until one occupyed cell is hit
        var pos = -1;
        for(var i = parseInt(collumn);i<this.boardSize;i+=this.width){
            if(this.board[i] != 0){
                break;
            }

            pos = i;
        }

        // if collumn is full
        if(pos == -1){
            return;
        }

        this.board[pos] = this.turn;
        this.last_moves.unshift([pos]);

        this.checkWin();

        this.drawBoard();
    }

    checkWin(){
        for(var i = 0;i < this.boardSize;i++){
            this.winboard[i] = 0;
        }

        var game_won = false;

        var directions = [1,this.width,this.width+1,this.width-1];
        for(var i = 0;i < this.boardSize; i++){
            if(this.board[i] != this.turn){continue;}

            for (const dir of directions) {
                var notWon = false;
                var won_fields = [];
                for(var n = 0; n < 4; n++){
                    won_fields.push(i+dir*n);
                    if(this.board[i+dir*n] != this.turn){
                        notWon = true;
                    }
                    // stop the search if it has reached the edge of the board
                    // and it it is not the last field to check n != 3
                    if(((i+dir*n) % this.width+1 == 0 || (i+dir*n) >= this.boardSize || (i+dir*n) % this.width == this.width) && n != 3){
                        notWon = true;
                        break;
                    }
                }

                if(notWon == false){break;}
            }
            if(notWon == false){
                game_won = true;

                var win_color = "#153bf9"; // blue
                if(this.turn == 1){
                    win_color = "#da2716"; // red
                }
                startConfetti(win_color);
                break;
            }else{
                stopConfetti();
            }
            
        }

        // save the won fields if the game is one
        if(game_won == true){
            $(".change_turn").removeClass("won");
            $(".change_turn.active").addClass("won");
            this.gameDone = true;
            
            for (const i of won_fields) {
                this.winboard[i] = 1;
            }
        }else{
            this.gameDone = false;
            $(".change_turn").removeClass("won");
        }
    }

    changeTurn(newTurn){
        this.turn = parseInt(newTurn);
    }
    changeDifficulty(newDifficulty){
        this.turn = parseInt(newDifficulty);
    }

    undo(){
        if(this.last_moves.length > 0){
            this.board[this.last_moves[0]] = 0;
            this.last_moves.shift();
            this.checkWin();
            this.drawBoard();
        }
    }

    /* Drawing methods */
    newGame(){
        // reset variables
        this.board = [];
        this.board_label = [];
        this.winboard = [];
        this.last_moves = [];
        this.used_numbers = [];
        this.gameDone = false;

        this.loadDifficulties();
        this.generateBoard();
        this.drawBoard();
        stopConfetti();
    }

    generateBoard(){
        // generate board to indicate, which player has checked which field
        for(var i = 0;i < this.boardSize;i++){
            this.board.push(0);
        }

        // generate the board to incicate the cell the player has won on
        for(var i = 0;i < this.boardSize;i++){
            this.winboard.push(0);
        }


        this.used_numbers = [];
        // generate the labels to show which number is to check
        for(var i = 0;i< this.boardSize;i++){
            var height = parseInt(i / this.width);
            this.board_label.push(this.getBoardLabel(height));
        }
    }

    drawBoard(){
        var result = "<div class='board_row'>";
        for(var i = 0;i < this.boardSize;i++){
            if(i % this.width == 0 && i != 0){
                result += "</div><div class='board_row'>";
            }

            result += this.drawCell(i);
        }
        result += "</div>";

        $("#game").html(result);

        // add click event to the buttons if the game is still going
        if(this.gameDone == false){
            addClickEventsToBoard(this);
        }
    }

    getBoardLabel(height){
        var num = this.getRandomInt(this.difficulties[height]["start"], this.difficulties[height]["end"]);
        
        while(this.used_numbers.includes(num)){
            var num = this.getRandomInt(this.difficulties[height]["start"], this.difficulties[height]["end"]);
        }

        this.used_numbers.push(num);
        return num;
    }

    drawCell(i){
        var result = "";

        // get the collumn
        var col = i % this.width;

        // get the cell state
        var cell_state = this.board[i];

        // get the cell number
        var cell_number = this.board_label[i];

        // cls == class
        var cls = "board_cell";
        if(this.winboard[i] === 1){
            cls += " won";
        }

        if(cell_state == 0){
            result += "<div class='" + cls + "' data-collumn='"+col+"'><div class='circle gray'></div><p class='text'>" + cell_number + "</p></div>";
        }
        else if(cell_state == 1){
            result += "<div class='" + cls + "' data-collumn='"+col+"'><div class='circle red'></div></div>";
        }
        else if(cell_state == 2){
            result += "<div class='" + cls + "' data-collumn='"+col+"'><div class='circle blue'></div></div>";
        }

        return result;
    }

    loadDifficulties(){
        this.difficulties = this.settings["difficulties"][this.difficulty.toString()];
    }

    setDifficulty(newDifficulty){
        this.difficulty = newDifficulty;
        this.loadDifficulties();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}