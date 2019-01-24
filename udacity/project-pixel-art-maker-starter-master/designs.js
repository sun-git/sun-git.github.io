
const table = document.querySelector("#pixelCanvas");
const height = document.querySelector("#inputHeight");
const width = document.querySelector("#inputWidth");
const sizePicker = document.querySelector("#sizePicker");
const color = document.querySelector("#colorPicker");

sizePicker.onsubmit = function(event){
    event.preventDefault();
    clearGrid();
    makeGrid();
};


function makeGrid() {
    for (let r=0; r<height.value; r++){
        const row = table.appendChild(document.createElement("tr"));
        for (let c=0; c<width.value; c++){
            const cell = row.appendChild(document.createElement("td"));
        }
    }
    table.addEventListener("click", colorSquare);
}

function clearGrid(){
    while (table.firstElementChild){
         table.removeChild(table.firstElementChild);
    }
}

function colorSquare (evt) {
    if(evt.target.nodeName === "TD"){
        evt.target.style.backgroundColor = color.value;
    }
}


