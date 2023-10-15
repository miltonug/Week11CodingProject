window.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const playerDisplay = document.querySelector('.display-player');
  const clearButton = document.querySelector('#clear');
  const reloadButton = document.querySelector('#reload');
  const winner = document.querySelector('.winner');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  // Select player to start the game
  const players = ['Player 1', 'Player 2'];
  const randomNumber = Math.random();
  const randomPlayerIndex = Math.floor(randomNumber * players.length);
  const first = players[randomPlayerIndex];
  players.splice(randomPlayerIndex, 1);
  const second = players;
           
  // Display the player that is starting the game
  document.getElementById('who-starts').textContent = `"${first}" is randomly selected to make the first move with an "X".`;
  const firstPlayer = 'X';

  // Check for winner
  const playing_X = 'playing_X';
  const playing_O = 'playing_O';
  const Tie = 'Tie';

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  function check4Winner() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }
          if (a === b && b === c) {
              roundWon = true;
              break;
          }
      }


  if (roundWon) {
    declareWinner(currentPlayer === 'X' ? playing_X : playing_O);
    isGameActive = false;
    if (currentPlayer === firstPlayer){
      return;
    } else 
      return;
  }

  if (!board.includes(''))
      declareWinner(Tie);
  }

  const declareWinner = (type) => {
      switch(type){
        case playing_X:
              winner.innerHTML = `"${first}" wins.`;
              break;
          case playing_O:
              winner.innerHTML = `"${second}" wins.`;
              break;
          case Tie:
              winner.innerText = "It's a tie";
      }
      winner.classList.remove('hide');
  };

  const isValidAction = (cell) => {
      if (cell.innerText === 'X' || cell.innerText === 'O'){
          return false;
      }

      return true;
  };

  const updateBoard =  (index) => {
      board[index] = currentPlayer;
  }

  const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
  }

  const userAction = (cell, index) => {
      if(isValidAction(cell) && isGameActive) {
          cell.innerText = currentPlayer;
          cell.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          check4Winner();
          changePlayer();
      }
  }
  
  const clearBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      winner.classList.add('hide');

      if (currentPlayer === 'O') {
          changePlayer();
      }

      cells.forEach(cell => {
          cell.innerText = '';
          cell.classList.remove('playerX');
          cell.classList.remove('playerO');
      });
  }

  cells.forEach( (cell, index) => {
      cell.addEventListener('click', () => userAction(cell, index));
  });

  const refreshPage = () => {
    location.reload();
  }

  clearButton.addEventListener('click', clearBoard);
  reloadButton.addEventListener('click', refreshPage);
});
