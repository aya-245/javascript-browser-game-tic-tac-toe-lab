/*------------------------ Cached Element References ------------------------*/
const squareElement = document.querySelectorAll(".sqr")
const messageElement = document.querySelector("#message")
const boardElement = document.querySelector(".board")
const resetButtonElement = document.querySelector("#reset")
const timerElement = document.querySelector('#timer')

console.log(boardElement)
console.log(squareElement)
console.log(messageElement)
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner
let tie
let time = 5
let interval

/*-------------------------------- Functions --------------------------------*/
function init(){
    stopTime()
    startTime()
    console.log("initialized")
    board = ["","","","","","","","",""]
    turn = "The Avengers"
    winner = false
    tie = false

    render()
}

function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(){
    for( let i=0; i <board.length; i++){
        const currentSquare = squareElement[i]
        if(board[i] === "The Avengers"){
            currentSquare.innerHTML = '<img src= "assets/avengers.png" alt="X">'
        }
        else if(board[i] === "The X-Men"){
            currentSquare.innerHTML = '<img src= "assets/x-men.png" alt="X">'
        }
        else{
            currentSquare.innerHTML = ""
        }
    }

}

function updateMessage(){
    if(winner === false && tie === false){
        messageElement.textContent = "It is " + turn + "'s turn"
    }
    else if(winner === false && tie === true){
        messageElement.textContent = "It is a tie"
    }
    else if(time === 0){
        messageElement.textContent = "You ran out of time"
    }
    else{
        messageElement.textContent = turn + " won"
    }
}

function handleClick(event){
    console.log(event.target)
    const squareIndex = event.target.id
    if(!event.target.classList.contains("sqr")){
        return
    }
    if(board[squareIndex] === "The Avengers" || board[squareIndex] === "The X-Men"){
        return
    }
    if(winner === true){
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()

    if(winner === false && tie === false){
        resetTimer()
    }
    render()
}

function placePiece(index){
    board[index] = turn
    console.log(board)
}

function checkForWinner(){
    for(let i=0; i<winningCombos.length; i++){
        const combo = winningCombos[i]
        const first = board[combo[0]]
        const second = board[combo[1]]
        const third = board[combo[2]]

        if(first !== "" && second === first && third === first){
            winner = true
            stopTime()

        }
    }
    console.log(winner)
}

function checkForTie(){
     if(winner === true){
        return
    }
    for(const square of board){
        if(square === ""){
            return
        }
    }
    tie = true
console.log(tie)
}

function switchPlayerTurn(){
    if(winner === true){
        return
    }
    if(turn === "The Avengers"){
        turn = "The X-Men"
    }
    else{
        turn ="The Avengers"
    }
    console.log(turn)
}

function stopTime(){
    clearInterval(interval)

}

function startTime(){
    time = 5
interval= setInterval(()=>{
    if(time === 0){
        stopTime()
        messageElement.textContent = "You ran out of time!"
        return
    }
    time--
    timerElement.textContent = time
},1000)
}

function resetTimer(){
    stopTime()
    startTime()
    timerElement.textContent = time
}

/*----------------------------- Event Listeners -----------------------------*/
init()
boardElement.addEventListener("click", handleClick)
resetButtonElement.addEventListener("click", init)
