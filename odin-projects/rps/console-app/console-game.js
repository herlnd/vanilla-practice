// elements: contains the three names for the elements of the game. They can be changed for any desired name. E.g. "blade", "paper", "stone".
const elements = ["rock", "paper", "scissors"];

// numberOfRound: Asks for the numbers of rounds to be played in a game.
function getNumberOfRounds() {
  let numberOfRounds = parseInt(prompt("Best of how many rounds?"));

  while (numberOfRounds <= 0 || numberOfRounds % 2 === 0) {
    numberOfRounds = parseInt(prompt("Best of how many rounds?"));
  }

  Math.round(numberOfRounds / 2);

  return numberOfRounds;
}

// cpuPlay: Asks the user to enter an element.
function usrPlay() {
  let usrChoice = prompt("Choose your element!").toLowerCase();
  return usrChoice;
}

// cpuPlay: randomly chooses an element from the 'elements' array.
function cpuPlay(arr) {
  let randomArrNumber = Math.floor(Math.random() * elements.length);
  let cpuChoice = elements[randomArrNumber];
  return cpuChoice;
}

// rpsRound: Plays a round of RPS and returns the winner.
function rpsRound() {
  let usrResult = usrPlay();
  let cpuResult = cpuPlay(elements);
  let roundWinner;

  switch (true) {
    case usrResult === elements[0] && cpuResult === elements[0]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --tie`);
      roundWinner = "none";
      break;
    case usrResult === elements[0] && cpuResult === elements[1]:
      console.log(
        `You chose: ${usrResult}, CPU chose: ${cpuResult} --CPU wins`
      );
      roundWinner = "cpu";
      break;
    case usrResult === elements[0] && cpuResult === elements[2]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --you win`);
      roundWinner = "user";
      break;
    case usrResult === elements[1] && cpuResult === elements[0]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --you win`);
      roundWinner = "user";
      break;
    case usrResult === elements[1] && cpuResult === elements[1]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --tie`);
      roundWinner = "none";
      break;
    case usrResult === elements[1] && cpuResult === elements[2]:
      console.log(
        `You chose: ${usrResult}, CPU chose: ${cpuResult} --CPU wins`
      );
      roundWinner = "cpu";
      break;
    case usrResult === elements[2] && cpuResult === elements[0]:
      console.log(
        `You chose: ${usrResult}, CPU chose: ${cpuResult} --CPU wins`
      );
      roundWinner = "cpu";
      break;
    case usrResult === elements[2] && cpuResult === elements[1]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --you win`);
      roundWinner = "user";
      break;
    case usrResult === elements[2] && cpuResult === elements[2]:
      console.log(`You chose: ${usrResult}, CPU chose: ${cpuResult} --tie`);
      roundWinner = "none";
      break;
  }

  return roundWinner;
}

// rpsGame: executes the whole game, consisting of the number of rounds setted by the user. The best out of five wins.
function rpsGame() {
  let maxRound = getNumberOfRounds();
  let userCounter = 0;
  let cpuCounter = 0;
  let winner;

  while (userCounter + cpuCounter < maxRound) {
    let rpsRoundWinner = rpsRound();
    switch (rpsRoundWinner) {
      case "user":
        userCounter++;
        console.log(`You: ${userCounter}, CPU: ${cpuCounter}`);
        break;
      case "cpu":
        cpuCounter++;
        console.log(`You: ${userCounter}, CPU: ${cpuCounter}`);
        break;
      case "none":
        console.log(`You: ${userCounter}, CPU: ${cpuCounter}`);
        break;
    }
  }

  if (userCounter > cpuCounter) {
    winner = "you won the game";
  } else {
    winner = "the cpu won the game";
  }

  console.log(`usr wins: ${userCounter}, cpu wins: ${cpuCounter}. ${winner}`);
}

console.log(rpsGame());
