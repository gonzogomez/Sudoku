var board = new Array(81);
var boardEasy = new Array(81);
for(var i = boardEasy.length-1; i>=0; --i) boardEasy[i] = "";
boardEasy[1] = 9;
boardEasy[3] = 7;
boardEasy[6] = 8;
boardEasy[7] = 6;
boardEasy[10] = 3;
boardEasy[11] = 1;
boardEasy[14] = 5;
boardEasy[16] = 2;
boardEasy[18] = 8;
boardEasy[20] = 6;
boardEasy[29] = 7;
boardEasy[31] = 5;
boardEasy[35] = 6;
boardEasy[39] = 3;
boardEasy[41] = 7;
boardEasy[45] = 5;
boardEasy[49] = 1;
boardEasy[51] = 7;
boardEasy[60] = 1;
boardEasy[62] = 9;
boardEasy[64] = 2;
boardEasy[66] = 6;
boardEasy[69] = 3;
boardEasy[70] = 5;
boardEasy[73] = 5;
boardEasy[74] = 4;
boardEasy[77] = 8;
boardEasy[79] = 7;

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

	generate_board(15);
	//Connect the reset button to its function
	//document.getElementById("reset").onclick = reset;
}

function color_square(address){
	console.log("in color_square function");
	var row = Math.floor(address / 9);
	var column = address%9;

	for (var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			cell = (row + i) * 9 + (column +j);
			console.log(cell);
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
		boardEasy[n.className] = number;
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
		ctx.strokeText(boardEasy[i], 24, 28);
	}
}

// randomly assigns numbers on the board based on difficulty
function generate_board(count){
	redraw_board();
	for(var i=0; i < boardEasy.length; i++){
		var c = document.getElementById('board').children[i];
		var ctx = c.getContext('2d');
		ctx.textAlign = 'center';
		ctx.font = "20 Arial";
		ctx.strokeStyle = "#FF0000";
		ctx.strokeText(boardEasy[i], 24, 28);
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

	for (var i=0; i<boardEasy.length; i++){
		// if ((check_row(boardEasy[i], i) && check_column(boardEasy[i], i) && check_square(boardEasy[i], i)) == false){
		// 	console.log("in if statment");
		// 	return false;
		// }
		if(check_square(boardEasy[i], i) == false){
			return false;
		}
	}
	console.log("it made it here");
	return true;
}

//checks to see if valid in row
function check_row(num, address){
	var row = Math.floor(address / 9);
	for (var i=0; i<9; i++){
		var cell = (row * 9 + i);
		if ( cell != address){
			if ((boardEasy[cell] == num) || (boardEasy[cell] == "")){
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
			if ((boardEasy[cell] == num) || (boardEasy[cell] == "")){
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

	for (var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			cell = (row + i) * 9 + (column +j);
			if (cell != address){
				if((boardEasy[cell] == num) || (boardEasy[cell] == "")){
					console.log("cell "+ cell);
					return false;
				}
			}
		}
	}
	return true;
}
