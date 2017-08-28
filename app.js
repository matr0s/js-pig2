/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winnerScore;
var diceDOM0 = document.querySelector('.dice-0');
var diceDOM1 = document.querySelector('.dice-1');

init();

document.querySelector('.input-new').addEventListener('change', function() {
	// winnerScore update
	winnerScore = document.querySelector('.input-new').value;
});

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random number
		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		// 2. Display result
		diceDOM0.style.display = 'block';
		diceDOM0.src = 'dice-' + dice0 + '.png';

        diceDOM1.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';

	if (dice0 === 6 && dice1 === 6) {
		// Total score to zero
		scores[activePlayer] = document.querySelector('#score-' + activePlayer).textContent = 0;
		// Next player
		nextPlayer();
	} else if(dice0 !== 1 && dice1 !==1) {
		roundScore = document.querySelector('#current-' + activePlayer).textContent = roundScore + dice0 + dice1;
	} else {
		nextPlayer();
	}

}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		scores[activePlayer] = document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] + roundScore;
		if (scores[activePlayer] >= winnerScore) {
		  document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'

            diceDOM0.style.display = 'none';
            diceDOM1.style.display = 'none';

		  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		  gamePlaying = false
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	roundScore = document.querySelector('#current-' + activePlayer).textContent = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');	
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');	
	diceDOM0.style.display = 'none';
	diceDOM1.style.display = 'none';
}

function init() {
	scores = [0,0];
	roundScore = 0;
	prevDice = 0;
	activePlayer = 0;
	diceDOM0.style.display = 'none';
	diceDOM1.style.display = 'none';
	gamePlaying = true;
	winnerScore = document.querySelector('.input-new').value;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1'
	document.getElementById('name-1').textContent = 'Player 2'

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');	
	document.querySelector('.player-0-panel').classList.remove('winner');			
	document.querySelector('.player-1-panel').classList.remove('winner');			
	document.querySelector('.player-0-panel').classList.add('active');	
}

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';	
//var x = document.querySelector('#score-' + activePlayer).textContent;


























