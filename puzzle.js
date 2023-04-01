
var rows = 4;
var cols = 4;

var currTile;
var otherTile;  //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
var imgOrder = ["5", "1", "2", "8", "10", "7", "4", "12", "9", "6", "3", "11", "13", "14", "15", "16"]

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for(let c=0; c < cols; c++){

            // <img id="0-0" scr="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            //  dragging tiles
             tile.addEventListener("dragstart", dragStart);  //click an image to drag
             tile.addEventListener("dragover", dragOver);    //moving image around while clicked
             tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
             tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
             tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
             tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
 

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("13.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }


}