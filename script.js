let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".rst-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".hide");
let msg = document.querySelector(".Winner");

let turnO = true; //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8] 
]

const drawWinLine = (pattern) => {
  const winLine = document.getElementById("win-line");

  const box1 = boxes[pattern[0]];
  const box3 = boxes[pattern[2]];

  const gameRect = document.querySelector(".game").getBoundingClientRect();
  const box1Rect = box1.getBoundingClientRect();
  const box3Rect = box3.getBoundingClientRect();

  const x1 = box1Rect.left + box1Rect.width / 2 - gameRect.left;
  const y1 = box1Rect.top + box1Rect.height / 2 - gameRect.top;
  const x2 = box3Rect.left + box3Rect.width / 2 - gameRect.left;
  const y2 = box3Rect.top + box3Rect.height / 2 - gameRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  winLine.style.width = `${length}px`;
  winLine.style.left = `${x1}px`;
  winLine.style.top = `${y1}px`;
  winLine.style.transform = `rotate(${angle}deg)`;
  winLine.style.display = "block";
};


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
    document.getElementById("win-line").style.display = "none";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turnO) {
            box.style.color = "#0acdff";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color = "#ff9fb2";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";

    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    newGameBtn.classList.remove("hide");
    drawWinLine(pattern);
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val, pattern);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);