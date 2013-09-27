var board = new Array(81);
for (var i = board.length-1; i>=0; --i) board[i] = 10;
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
	generate_board(15);
	//Connect the reset button to its function
	//document.getElementById("reset").onclick = reset;
}

//called when user clicks on square
function make_move(){

}

// randomly assigns numbers on the board based on difficulty
function generate_board(count){
	for(var j=0;j<count;j++){
		var valid_spot = false;
		while(valid_spot != true){
			var num = Math.floor((Math.random()*9)+1);
			var address = Math.floor((Math.random()*81));
			// if(validate(num, address)){
			// 	valid_spot = true;
			// }
			valid_spot = validate(num, address);
			console.log(valid_spot);
		}
		var c = document.getElementById('board').children[address];
		var ctx = c.getContext('2d');
		ctx.textAlign = 'center';
		ctx.font = "20 Arial";
		ctx.strokeStyle = "#FF0000";
		ctx.strokeText(num, 24, 28);
		board[address] = num;
		//console.log("Address = "+ address);
		//console.log("Array Value = " + board[address]);
	}
}

// returns true if num being place in address is a valid placement
function validate(num, address){
	var temp1 = check_row(num, address);
	var v1 = true;
	if(temp1){
		//return true;
		v1 = true;
	}
	else{
		//return false;
		v1 = false;
	}
	return v1;
}

//checks to see if valid in row
function check_row(num, address){
	var row = Math.floor(address / 9);
	console.log(row);
	var v = true;
	for(var i=0; i<9; i++){
		var cell = (row * 9 + i);
		var x = 10;
		if(board[cell] == num){
			//console.log("false");
			v = false;
		}
	}
	return v;
}

//check if num occurs in column
function check_column(num, address){
	return true;
}

function check_square(num, address){
	return true;
}
