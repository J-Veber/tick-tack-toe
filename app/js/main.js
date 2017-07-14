document.addEventListener('DOMContentLoaded', onLoad);

let userChoice = "";
let modalChoiceView = document.querySelector("#modal-choice");
let modalCloseBtn = document.querySelector("#close");
let res = document.querySelector(".choice p");

let cell = {
    num: number,
    empty: boolaen,
    co: boolean
};


function onLoad() {
    // modalChoiceView.style.display = "block";
    modalChoiceView.style.display = "none" ;
    modalCloseBtn.addEventListener("click", () => {
        modalChoiceView.style.display = "none";
    });

}

function displayUserChoice() {
    console.log(userChoice);
    res.style.fontSize = "1.5rem";
    res.textContent = userChoice;
}

function setCross() {
    userChoice = "cross";
    modalChoiceView.style.display = "none";
    displayUserChoice();
}

function setOval() {
    userChoice = "oval";
    modalChoiceView.style.display = "none";
    displayUserChoice();
}

function setRandom() {
    let r = Math.floor(Math.random() * 2);
    if (r === 1) {
        userChoice = "oval";
    } else {
        userChoice = "cross";
    }
    modalChoiceView.style.display = "none";
    displayUserChoice();
}

function setMark(inputdata) {

    currentId = event.currentTarget.id;
    // event.currentTarget.backgroundColor = 'transparent';
    event.currentTarget.css.background = 'url("../img/cross.png")';
    console.log(event.currentTarget.background);
}