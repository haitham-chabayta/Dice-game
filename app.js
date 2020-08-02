/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDOM;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
diceDOM = document.querySelector('.dice')
rollbtnDOM = document.querySelector('.btn-roll')
holdbtnDOM = document.querySelector('.btn-hold')

diceDOM.style.display = 'none';

document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;

function resetGame(){
    activePlayer = 0;
    scores = [0,0];
    roundScore = 0;
    diceDOM.style.display = 'block';
    rollbtnDOM.disabled = false;
    holdbtnDOM.disabled = false;
    resetPanels();
    resetAllScores();
}

function resetPanels(){
    document.getElementById('name-0').textContent = 'Player 1!'
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.getElementById('name-1').textContent = 'Player 2!'
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

function resetCurrentScores() {
    document.querySelector('#current-0').textContent = 0
    document.querySelector('#current-1').textContent = 0
    roundScore = 0
}

function resetAllScores(){
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
}

function toggleActiveClass() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function switchActivePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

function isWinner(activePlayer) {
    if (scores[activePlayer] >= 20){
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!'
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        rollbtnDOM.disabled = true;
        holdbtnDOM.disabled = true;
        diceDOM.style.display = 'none';
    }
    else {
        switchActivePlayer();
        resetCurrentScores();
        toggleActiveClass();
    }
}
+

document.querySelector('.btn-roll').addEventListener('click' , function() {
    var dice = Math.floor(Math.random() * 6) + 1
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'

    if (dice !== 1) {
        roundScore += dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore
    }
    else {
        switchActivePlayer()
        resetCurrentScores()
        toggleActiveClass()
        diceDOM.style.display = 'none'
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    isWinner(activePlayer);

});

document.querySelector('.btn-new').addEventListener('click', function(){
    resetGame();
    resetAllScores();
})