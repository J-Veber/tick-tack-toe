document.addEventListener('DOMContentLoaded', onLoad);

let userChoice;
let modalChoiceView = document.querySelector("#modal-choice");
let modalCloseBtn = document.querySelector("#close");
let res = document.querySelector(".choice p");
let iteration = 0;
let completeLevel = false;

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
    // modalCloseBtn.addEventListener("click", () => {
    //     modalChoiceView.style.display = "none";
    // });
    // if (completeLevel === true) alert("YO");
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
 * @param inputId - number. ИД ячейки, в которую нужно поставить метку.
 */
function setMark(inputId) {

    if (cells[inputId].empty && (completeLevel === false) && iteration <=9) {
        iteration++;
        cells[inputId].empty = false;
        cells[inputId].co = userChoice;
        if (userChoice) {
            event.currentTarget.style.background = 'url("img/cross.png")';
            event.currentTarget.style.backgroundSize = 'cover';
        } else {
            event.currentTarget.style.background = 'url("img/oval.png")';
            event.currentTarget.style.backgroundSize = 'cover';
        }
        createProgressElement(true, inputId);
        if (checkLines(inputId) === true) exit();
        setTimeout(pcTurn, 100);
    } else {
        if (iteration > 9) exit();
        else console.log("ячейка с номер " + (inputId + 1) + " занята");
    }

}

/**
 * @description проверка одинаковых символов в столбце
 * @param cellId - ИД кликнутой ячейки
 * @return {boolean} - результат - false - не прошла проверка; true - иначе
 */
function checkVerticalLine(cellId) {
    let column = cellId % 3;
    let cellSign = cells[cellId].co;
    let res = true;
    for (let i = 0; i < 3 && res; i++) {
        if (cells[column].empty || cells[column].co !== cellSign) {
            res = false;
        }
        column += 3;
    }
    return res;
}

/***
 * @description проверка одинаковых символов в строке
 * @param cellId - ИД кликнутой ячейки
 * @return {boolean} - результат - false - не прошла проверка; true - иначе
 */
function checkHorizontalLine(cellId) {
    let columns = [0,3,6];
    let cellSign = cells[cellId].co;
    let currentRow = cellId;
    let res = true;
    while (currentRow !== columns[0] || currentRow !== columns[1] || currentRow !== columns[2]) {
        currentRow--;
    }
    for (let i = 0; i < 3 && res; i++) {
        if (cells[currentRow].empty || cells[currentRow].co !== cellSign) {
            res = false;
        }
        currentRow++;
    }
    return res;
}

/***
 * @description проверка одинаковых символов на главной диагонали
 * @param cellId - ИД кликнутой ячейки
 * @return {boolean} - результат - false - не прошла проверка; true - иначе
 */
function checkMainLine(cellId) {
    let cellSign = cells[cellId].co;
    let currentCell = cellId;
    let res = true;
    while (currentCell !== 0) {
        currentCell -= 4;
    }
    for (let i = 0; i < 3 && res; i++) {
        if (cells[currentCell].empty || cells[currentCell].co !== cellSign) {
            res = false;
        }
        currentCell += 4;
    }
    return res;
}

/**
 * @description проверка одинаковых символов на побочной диагонали
 * @param cellId - ИД кликнутой ячейки
 * @return {boolean} - результат - false - не прошла проверка; true - иначе
 */
function checkLeftLine(cellId) {
    let cellSign = cells[cellId].co;
    let currentCell = cellId;
    let res = true;
    while (currentCell !== 2) {
        currentCell -= 2;
    }
    for (let i = 0; i < 3 && res; i++) {
        if (cells[currentCell].empty || cells[currentCell].co !== cellSign) {
            res = false;
        }
        currentCell += 2;
    }
    return res;
}

/**
 * @description проверяет нет ли одинаковых элементов в ряду/диагонали.
 * Если есть, то заканчивает игру, сообщая кто победил.
 * @param cellId - ИД ячейки, которую надо проверить
 */
function checkLines(cellId) {
    let res = true;
    switch (cellId){
        case 4:
            if (!checkVerticalLine(cellId) || !checkHorizontalLine(cellId) || !checkMainLine(cellId) || !checkLeftLine(cellId)) {
                res = false;
            }
            break;
        case 0:
        case 8:
            if (checkVerticalLine(cellId) === false || !checkHorizontalLine(cellId) || !checkMainLine(cellId)) {
                res = false;
            }
            break;
        case 2:
        case 6:
            if (!checkVerticalLine(cellId) || !checkHorizontalLine(cellId) || !checkLeftLine(cellId)) {
                res = false;
            }
            break;
        case 1:
        case 3:
        case 5:
        case 7:
            if (!checkVerticalLine(cellId) || !checkHorizontalLine(cellId)) {
                res = false;
            }
            break;
    }
    return res;
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
        iteration++;
        cells[pcChoice].empty = false;
        cells[pcChoice].co = !userChoice;
        // console.log("pcTurn: ", pcChoice);
        let pcCell = document.getElementById(cells[pcChoice].num.toString());
        if (userChoice) {
            pcCell.style.background = 'url("img/oval.png")';
            pcCell.style.backgroundSize = 'cover';
        } else {
            pcCell.style.background = 'url("img/cross.png")';
            pcCell.style.backgroundSize = 'cover';
        }
        createProgressElement(false, pcChoice);
        if (checkLines(pcChoice) === true) exit();
    } else {
        if (iteration>=9) {
            exit();
        } else pcTurn();
    }
}

function createPCCell() {
    let pcChoice = Math.floor(Math.random() * (9));

    // console.log(cells[pcChoice].num, cells[pcChoice].empty);
    return pcChoice;
}

function exit() {
    completeLevel = true;
    alert("YO");
}