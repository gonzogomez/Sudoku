var board = new Array(81);


window.onload = function(){	
	//Create 81 canvases for the 81 squares in the sudoku game
	for(i=0;i<81;i++){
		var c = document.createElement("canvas");
		c.setAttribute('id','newcanvas'+(i+1));			//Give the canvas a unique ID
		c.setAttribute('width',50);					//Set the width and height of the cavas
		c.setAttribute('height',50);
		c.className = i;								//Give the canvas a unique Class (needed for later use)
		
		c.onclick = make_move;
		
		document.getElementById('board').appendChild(c);		//Add the canvas to the division
		
		//Make some HTML5 modifications to each canvas
		var ctx=c.getContext('2d');								//Get the context - needed for HTML5 manipulation

		ctx.fillStyle='#FFFFFF';								//Make it blank to begin with
		ctx.fillRect(0,0,48,48);
	}

	color_square(0);
	color_square(6);
	color_square(54);
	color_square(30);
	color_square(60);

	generate_board("easy");
	//Connect the reset button to its function
	//document.getElementById("reset").onclick = reset;
}

function easy_board(){
	for(var i = board.length-1; i>=0; --i) board[i] = "";
	board[1] = 9;
	board[3] = 7;
	board[6] = 8;
	board[7] = 6;
	board[10] = 3;
	board[11] = 1;
	board[14] = 5;
	board[16] = 2;
	board[18] = 8;
	board[20] = 6;
	board[29] = 7;
	board[31] = 5;
	board[35] = 6;
	board[39] = 3;
	board[41] = 7;
	board[45] = 5;
	board[49] = 1;
	board[51] = 7;
	board[60] = 1;
	board[62] = 9;
	board[64] = 2;
	board[66] = 6;
	board[69] = 3;
	board[70] = 5;
	board[73] = 5;
	board[74] = 4;
	board[77] = 8;
	board[79] = 7;
}

function medium_board(){
	for(var i = board.length-1; i>=0; --i) board[i] = "";
	board[1] = 8;
	board[2] = 4;
	board[3] = 3;
	board[8] = 1;
	board[10] = 7;
	board[11] = 5;
	board[15] = 9;
	board[16] = 8;
	board[18] = 3;
	board[19] = 6;
	board[31] = 9;
	board[32] = 3;
	board[34] = 1;
	board[36] = 7;
	board[39] = 5;
	board[41] = 8;
	board[44] = 6;
	board[46] = 5;
	board[48] = 7;
	board[49] = 4;
	board[61] = 4;
	board[62] = 7;
	board[64] = 1;
	board[65] = 7;
	board[69] = 6;
	board[70] = 9;
	board[72] = 8;
	board[77] = 7;
	board[78] = 1;
}

function hard_board(){
	for(var i = board.length-1; i>=0; --i) board[i] = "";
	board[0] = 1;
	board[5] = 5;
	board[8] = 3;
	board[9] = 7;
	board[10] = 4;
	board[12] = 8;
	board[13] = 3;
	board[15] = 2;
	board[16] = 1;
	board[18] = 9;
	board[19] = 3;
	board[21] = 1;
	board[24] = 6;
	board[27] = 8;
	board[31] = 6;
	board[35] = 7;
	board[36] = 2;
	board[44] = 4;
	board[45] = 5;
	board[49] = 9;
	board[53] = 1;
	board[56] = 1;
	board[59] = 2;
	board[61] = 3;
	board[63] = 6;
	board[65] = 9;
	board[68] = 4;
	board[70] = 5;
	board[71] = 2;
	board[75] = 7;
}

function color_square(address){
	var row = Math.floor(address / 9);
	var column = address%9;

	for (var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			cell = (row + i) * 9 + (column +j);
			var c = document.getElementById('board').children[cell];
			var ctx=c.getContext('2d');
			ctx.font = "20 Arial";
			ctx.strokeStyle = "33CCFF";
			ctx.strokeText(0, 24, 28);
			ctx.fillStyle='#33CCFF';
			ctx.fillRect(0,0,48,48);
		}
	}
}

//called when user clicks on square
function make_move(){
	var number = prompt("Please enter a number from 1-9");
	if(/\D/.test(number) || (number >= 10 || number < 1)) {
		alert("Only Numeric values 1-9");
	}
	else {
		var n = document.getElementById(this.id);
		board[n.className] = number;
		redraw_board();
	}
}

function redraw_board(){
	for(i=0;i<81;i++){
		var c = document.getElementById('board').children[i];
		var ctx=c.getContext('2d');
		ctx.fillStyle='#FFFFFF';
		ctx.fillRect(0,0,48,48);
	}
	color_square(0);
	color_square(6);
	color_square(54);
	color_square(30);
	color_square(60);
	for(i=0;i<81;i++){
		var c = document.getElementById('board').children[i];
		var ctx=c.getContext('2d');
		ctx.textAlign = 'center';
		ctx.font = "20 Arial";
		ctx.strokeStyle = "#FF0000";
		ctx.strokeText(board[i], 24, 28);
	}
}

// randomly assigns numbers on the board based on difficulty
function generate_board(diff){
	if (diff == 'easy') {
		easy_board();
	}
	else if (diff == 'medium'){
		medium_board();
	}
	else {
		hard_board();
	}

	redraw_board();
	for(var i=0; i < board.length; i++){
		var c = document.getElementById('board').children[i];
		var ctx = c.getContext('2d');
		ctx.textAlign = 'center';
		ctx.font = "20 Arial";
		ctx.strokeStyle = "#FF0000";
		ctx.strokeText(board[i], 24, 28);
	}

}

// returns true if num being place in address is a valid placement
function check_answer(){
	console.log("In check answer function");
	var win = false;
	console.log("right before solution call")
	win = solution();
	if (win){
		alert("Great Job");
	}
	else {
		alert("You blew it");
	}
}

function solution() {

	for (var i=0; i<board.length; i++){
		if ((check_row(board[i], i) && check_column(board[i], i) && check_square(board[i], i)) == false){
			console.log("in if statment");
			return false;
		}
	}
	return true;
}

//checks to see if valid in row
function check_row(num, address){
	var row = Math.floor(address / 9);
	for (var i=0; i<9; i++){
		var cell = (row * 9 + i);
		if ( cell != address){
			if ((board[cell] == num) || (board[cell] == "")){
				console.log("row "+row);
				return false;
			}
		}
	}
	return true;
}

//check if num occurs in column
function check_column(num, address){
	var column = address%9;
	for (var i=0; i<9; i++){
		var cell = (column + 9*i);
		console.log("cell: "+cell);
		if ( cell != address){
			if ((board[cell] == num) || (board[cell] == "")){
				console.log("column "+column);
				return false;
			}
		}
	}
	return true;
}

function check_square(num, address){
	var row = Math.floor(address / 9);
	var column = address%9;

	row = Math.floor(row/3) * 3;
	column = Math.floor(column/3) *3;

	for (var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			cell = (row + i) * 9 + (column +j);
			if (cell != address){
				if((board[cell] == num) || (board[cell] == "")){
					console.log("cell "+ cell);
					return false;
				}
			}
		}
	}
	return true;
}
