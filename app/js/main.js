let userChoice;
let modalChoiceView = document.querySelector("#modal-choice");
let resultWindow = document.querySelector("#modal-result");
let modalCloseBtn = document.querySelector("#close");
let res = document.querySelector(".choice p");
let tableCell = document.querySelector(".blocks-wrapper");
let resString = document.querySelector("#result-string");
let iteration = 0;
let completeLevel = false;

/**
 * @description mas for table cells
 * @param num - this is ID of table cell
 * @param co - cross or oval. cross - true; oval - false.
 * @param cell is empty - true; else -false
 */
const cells = [
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

document.addEventListener('DOMContentLoaded', onLoad);

(function eventListeners() {
    modalCloseBtn.addEventListener("click", () => {
        hideModalResultWindow();
    });

    tableCell.onclick = function (event) {
        let target = event.target.id;
        console.log(target);
        setMark(target);
    };
})();

function onLoad() {
   showModalChoiceView();
}

function showModalChoiceView() {
    modalChoiceView.style.display = "block";
}

function hideModalChoiceView() {
    modalChoiceView.style.display = "none";
}

function showModalResultWindow() {
    resultWindow.style.display = "block";
}

function hideModalResultWindow() {
    resultWindow.style.display = "none";
}

/**
 * @description Отображение выбора пользователя в колонке справа
 */
function displayUserChoice() {
    res.textContent = userChoice ? "Крестик" : "Нолик";
}

/**
 * @description выбор пользователя - следующие 3 функции
 */
function setCross() {
    userChoice = true;
    hideModalChoiceView();
    displayUserChoice();
}
function setOval() {
    userChoice = false;
    hideModalChoiceView();
    displayUserChoice();
}
function setRandom() {
    let r = Math.floor(Math.random() * 2);
    if (r === 1) {
        userChoice = "oval";
    } else {
        userChoice = "cross";
    }
    hideModalChoiceView();
    displayUserChoice();
}

/**
 * @description Функция для установки крестика/нолика для пользователя и ПК
 * @param inputId - number. ИД ячейки, в которую нужно поставить метку.
 */
function setMark(inputId) {
    inputId = Number.parseInt(inputId);
    if (cells[inputId].empty && (completeLevel === false) && iteration <=9) {
        iteration++;
        cells[inputId].empty = false;
        cells[inputId].co = userChoice;
        let currentCell = document.getElementById(inputId);
        currentCell.style.background = userChoice ? 'url("img/cross.png")' : 'url("img/oval.png")';
        createProgressElement(true, inputId);
        if (checkLines(inputId) === true) {
            exit(true);
        }
        if (iteration < 9 && completeLevel === false) setTimeout(pcTurn, 100);
        if (iteration === 9 && completeLevel === false) exit();
    } else {
        console.log("ячейка с номер " + (inputId) + " занята");
    }
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
        let pcCell = document.getElementById(cells[pcChoice].num.toString());
        if (userChoice) {
            pcCell.style.background = 'url("img/oval.png")';
            pcCell.style.backgroundSize = 'cover';
        } else {
            pcCell.style.background = 'url("img/cross.png")';
            pcCell.style.backgroundSize = 'cover';
        }
        createProgressElement(false, pcChoice);
        if (checkLines(pcChoice) === true) exit(false);
    } else {
        if (iteration >= 9) {
            exit();
        } else pcTurn();
    }
}

/**
 * @description проверяет нет ли одинаковых элементов в ряду/диагонали.
 * Если есть, то заканчивает игру, сообщая кто победил.
 * @param cellId - ИД ячейки, которую надо проверить
 * @return {boolean} - результат - false - не прошла проверка; true - иначе
 */
function checkLines(cellId) {
    let res = true;
    switch (cellId){
        case 4:
            if (checkVerticalLine(cellId) === false && checkHorizontalLine(cellId) === false
                && !checkMainLine(cellId) && !checkLeftLine(cellId)) {
                res = false;
            }
            break;
        case 0:
        case 8:
            if (checkVerticalLine(cellId) === false && checkHorizontalLine(cellId) === false
                && !checkMainLine(cellId)) {
                res = false;
            }
            break;
        case 2:
        case 6:
            if (!checkVerticalLine(cellId) && !checkHorizontalLine(cellId) && !checkLeftLine(cellId)) {
                res = false;
            }
            break;
        case 1:
        case 3:
        case 5:
        case 7:
            if (!checkVerticalLine(cellId) && !checkHorizontalLine(cellId)) {
                res = false;
            }
            break;
    }
    return res;
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
    let cellSign = cells[cellId].co;
    let currentRow = cellId;
    let res = true;
    while (currentRow !== 0 && currentRow !== 3 && currentRow !== 6) {
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
 * @description создает запись в истории ходов.
 * @param inputUser - true - user; false - PC
 * @param inputId - ячейка, в которой был сделан ход
 */
function createProgressElement(inputUser, inputId) {
    let p = document.createElement('p');
    if (inputUser) {
        p.innerHTML = "User: " + inputId;
    } else {
        p.innerHTML = "PC: " + inputId;
    }
    progress.appendChild(p);
}

/**
 * @description Логика выбора ячейки для ПК
 * @return {number} - ячейка, которая была выбрана
 */
function createPCCell() {
    let pcChoice = Math.floor(Math.random() * (9));

    return pcChoice;
}

/**
 * @description завершение текущей игры и вывод победителя
 * @param inputUser - победивший игрок
 */
function exit(inputUser) {
    if (completeLevel) resString.textContent = "Ничья" ;
    resString.textContent =  inputUser ? "Вы победили!" : "Вы проиграли.";
    showModalResultWindow();
    completeLevel = true;
}

function resetLevel() {
    iteration = 0;
    completeLevel = false;
    for (let i = 0; i < cells.length; i++) {
        cells[i].co = undefined;
        cells[i].empty = true;
    }
    hideModalResultWindow();
    let table = document.querySelectorAll(".block");
    let progressList = document.querySelectorAll(".progress p");
    for (let i = 0; i < table.length; i++) {
        table[i].style.background = "#ada4a4";
    }
    for (let i = 0; i < progressList.length; i++) {
        progressList[i].remove();
    }
    modalChoiceView.display = "block";
}