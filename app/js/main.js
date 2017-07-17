document.addEventListener('DOMContentLoaded', onLoad);

let userChoice;
let modalChoiceView = document.querySelector("#modal-choice");
let modalCloseBtn = document.querySelector("#close");
let res = document.querySelector(".choice p");
let iteration = 0;
let exit = false;

/**
 * @description mas for table cells
 * @param num - this is ID of table cell
 * @param co - cross or oval. cross - true; oval - false.
 * @param cell is empty - true; else -false
 */
var cells = [
    {
        num: 0,
        empty: true,
        co: undefined
    },
    {
        num: 1,
        empty: true,
        co: undefined
    },
    {
        num: 2,
        empty: true,
        co: undefined
    },
    {
        num: 3,
        empty: true,
        co: undefined
    },
    {
        num: 4,
        empty: true,
        co: undefined
    },
    {
        num: 5,
        empty: true,
        co: undefined
    },
    {
        num: 6,
        empty: true,
        co: undefined
    },
    {
        num: 7,
        empty: true,
        co: undefined
    },
    {
        num: 8,
        empty: true,
        co: undefined
    },
];


function onLoad() {
    modalChoiceView.style.display = "block";
    // modalChoiceView.style.display = "none" ;
    modalCloseBtn.addEventListener("click", () => {
        modalChoiceView.style.display = "none";
    });
    if (exit === true) alert("YO");
}

/**
 * @description Отображение выбора пользователя в колонке справа
 */
function displayUserChoice() {
    if (userChoice) {
        console.log("cross");
        res.style.fontSize = "1.5rem";
        res.textContent = "Крестик";
    } else {
        console.log("oval");
        res.style.fontSize = "1.5rem";
        res.textContent = "Нолик";
    }
}

/**
 * @description выбор пользователя - следующие 3 функции
 */
function setCross() {
    userChoice = true;
    modalChoiceView.style.display = "none";
    displayUserChoice();
}

function setOval() {
    userChoice = false;
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

/**
 * @description Функция для установки кретика/нолика для пользователя и ПК
 * @param inputid - number. ИД ячейки, в которую нужно поставить метку.
 */
function setMark(inputid) {

    if (cells[inputid].empty && (exit === false) && iteration <=9) {
        cells[inputid].empty = false;
        cells[inputid].co = userChoice;
        if (userChoice) {
            event.currentTarget.style.background = 'url("img/cross.png")';
            event.currentTarget.style.backgroundSize = 'cover';
        } else {
            event.currentTarget.style.background = 'url("img/oval.png")';
            event.currentTarget.style.backgroundSize = 'cover';
        }
        createProgressElement(true, inputid);
        setTimeout(pcTurn, 100);
        // pcTurn();
    } else {
        if (iteration === 9) exit = true;
        else console.log("ячейка с номер " + (inputid + 1) + " занята");
    }
}

/**
 * @description создание элемента в истории ходов.
 * @param inputUser - true - user; false - PC
 * @param inputid - ячейка, в которой был сделан ход
 */
function createProgressElement(inputUser, inputid) {
    let p = document.createElement('p');
    if (inputUser) {
        p.innerHTML = "User: " + inputid;
    } else {
        p.innerHTML = "PC: " + inputid;
    }
    progress.appendChild(p);
}


/**
 * @description Ход компьютера
 */
function pcTurn() {
    let pcChoice = createPCCell();

    if (cells[pcChoice].empty) {
        cells[pcChoice].empty = false;
        cells[pcChoice].co = !userChoice;
        let pcCell = document.getElementById(cells[pcChoice].num.toString());
        console.log(pcCell);
        if (userChoice) {
            pcCell.style.background = 'url("img/oval.png")';
            pcCell.style.backgroundSize = 'cover';
        } else {
            pcCell.style.background = 'url("img/cross.png")';
            pcCell.style.backgroundSize = 'cover';
        }
        createProgressElement(false, pcChoice);
    } else {
        pcTurn();
    }
}

function createPCCell() {
    let pcChoice = Math.floor(Math.random() * (9));

    console.log(cells[pcChoice].num, cells[pcChoice].empty);
    return pcChoice;
}

