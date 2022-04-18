const elements = ["rock", "paper", "scissors"];
const roundsNumber = document.getElementsByName("round-selector");
const choices = document.querySelectorAll(".game__controls__choices");
const playButton = document.getElementById("play-button");
const restartButton = document.getElementById("restart-button");
const cpuAnimation = document.getElementById("cpu-animation");
const usrAnimation = document.getElementById("usr-animation");
const usrScoreDisplay = document.getElementById("usr-score");
const cpuScoreDisplay = document.getElementById("cpu-score");

// Control buttons animations 
const animation = [
    { backgroundColor: "#0F1523" },
    { borderColor: "#0F1523" },
    { boxShadow: "0 0 1rem #333" }
];
  
const animationTiming = {
    duration: 200,
    iterations: 1
}

choices.forEach(choice => choice.addEventListener("click", () => {
    choice.animate(animation, animationTiming);
}));

// initial settings
let usrScore = 0;
let cpuScore = 0;
let gameRunning = false; // defines the state of the game (running or stopped)
playButton.disabled = true;
restartButton.disabled = true;
choices.forEach(choice => choice.disabled = true);

// Event listeners for buttons.
roundsNumber.forEach(item => item.addEventListener("click", activatePlayButton));
playButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
choices.forEach(choice => choice.addEventListener("click", playGame));

// Keyboard shortcuts handling.
window.addEventListener("keydown", keyboardShortcuts)

function keyboardShortcuts(e) {
    if (gameRunning) {
        switch (e.keyCode) {
            case 65:
                let rock = document.getElementById("rock");
                rock.click();
                break;
            case 87:
                let paper = document.getElementById("paper");
                paper.click();
                break;
            case 68:
                let scissors = document.getElementById("scissors");
                scissors.click();
                break;
        };
    };
};

// Activates the play button after selecting the rounds number.
function activatePlayButton() {
    playButton.disabled = false;
};

// Gets the number of rounds from the radio buttons.
function getRounds() {
    let maxRounds;
    for (let i = 0; i < roundsNumber.length; i++) {
        if (roundsNumber[i].checked) {
            maxRounds = parseInt(roundsNumber[i].value);
        };
    };
    return maxRounds;
};

// Starts the game and enables the playing buttons.
function startGame() {
    choices.forEach(choice => choice.disabled = false);
    roundsNumber.forEach(button => button.disabled = true);
    playButton.style.display = "none";
    restartButton.style.display = "block";
    restartButton.disabled = false;
    gameRunning = true;
};

// Restarts the game, resetting all the elements to their default values.
function restartGame() {
    restartButton.style.display = "none";
    playButton.disabled = true;
    playButton.style.display = "block";  
    choices.forEach(choice => choice.disabled = true);
    roundsNumber.forEach(button => button.checked = false);
    roundsNumber.forEach(button => button.disabled = false);
    usrAnimation.textContent = "❓";
    usrAnimation.style.transform = null;
    cpuAnimation.textContent = "❓";
    cpuAnimation.style.transform = null;
    gameRunning = false;
    usrScore = 0;
    cpuScore = 0;
    usrScoreDisplay.textContent = "-";
    cpuScoreDisplay.textContent = "-";
};

// Gets the CPU choice at random.
function getCpuChoice() {
    let randomNumber = Math.floor(Math.random() * elements.length);
    let cpuElement = elements[randomNumber];
    return cpuElement;
};

// Compares the choices from the player and the CPU and returns the winner of the round.
function getRoundWinner(usr, cpu) {
    let winner;

    switch (true) {
        case (usr === elements[0] && cpu === elements[0]):
            winner = "none";
            break;
        case (usr === elements[0] && cpu === elements[1]):
            winner = "cpu";
            break;
        case (usr === elements[0] && cpu === elements[2]):
            winner = "user";
            break;
        case (usr === elements[1] && cpu === elements[0]):
            winner = "user";
            break;
        case (usr === elements[1] && cpu === elements[1]):
            winner = "none";
            break;
        case (usr === elements[1] && cpu === elements[2]):
            winner = "cpu";
            break;     
        case (usr === elements[2] && cpu === elements[0]):
            winner = "cpu";
            break;
        case (usr === elements[2] && cpu === elements[1]):
            winner = "user";
            break;
        case (usr === elements[2] && cpu === elements[2]):
            winner = "none";
            break;           
    };

   return winner;
};

// Sets the score and stops the game if the rounds' limits are met.
function setScore(winner) {
    switch (winner) {
        case "user":
            usrScore++;
            break;
        case "cpu":
            cpuScore++;
            break;
    };

    usrScoreDisplay.textContent = usrScore;
    cpuScoreDisplay.textContent = cpuScore;

    let totalScore = usrScore + cpuScore;
    let roundLimit = getRounds();
    let totalScoreRatio = (totalScore/roundLimit).toFixed(2); 
    let usrRatio = (usrScore/roundLimit).toFixed(2); 
    let cpuRatio = (cpuScore/roundLimit).toFixed(2); 
    
    if (totalScore === roundLimit || (totalScoreRatio > 0.5 && usrScore !== cpuScore 
    && (usrRatio > 0.5 || cpuRatio > 0.5))) {
        gameRunning = false;
        choices.forEach(choice => choice.disabled = true);   
    } else {
        usrScoreDisplay.textContent = usrScore;
        cpuScoreDisplay.textContent = cpuScore; 
    }
};

// Calls all the functions for the game to run and animates the choices.
function playGame(e) {  
    let cpuChoice = getCpuChoice();
    let usrChoice = e.target.id;
    const roundWinner = getRoundWinner(usrChoice, cpuChoice);
    setScore(roundWinner);

    switch (usrChoice) {
        case "rock":
            usrAnimation.textContent = "🤜";
            usrAnimation.style.transform = "rotate(90deg) perspective(0) scaleX(-1)";
            break;
        case "paper":
            usrAnimation.textContent = "✋";
            usrAnimation.style.transform = "scaleX(-1) rotate(-90deg)";
            break;
        case "scissors":
            usrAnimation.textContent = "✌";
            usrAnimation.style.transform = "scaleX(-1) rotate(-90deg)";
            break;
    };

    switch (cpuChoice) {
        case "rock":
            cpuAnimation.textContent = "🤜";
            cpuAnimation.style.transform = "rotate(90deg) perspective(0) scaleX(-1)";
            break;
        case "paper":
            cpuAnimation.textContent = "✋";
            cpuAnimation.style.transform = "rotate(-90deg) perspective(0)";
            break;
        case "scissors":
            cpuAnimation.textContent = "✌";
            cpuAnimation.style.transform = "rotate(-90deg) perspective(0)";
            break;
    };
};