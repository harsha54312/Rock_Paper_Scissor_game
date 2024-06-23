
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

let isAutoplaying = false;
let intervalId;


document.querySelector('.auto-play-button').addEventListener('click',
    () => {
        autoplay();
    }
)

function autoplay() {
    if (!isAutoplaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoplaying = true;
        document.querySelector('.auto-play-button').innerHTML = 'Stop Auto Play';

    } else {
        clearInterval(intervalId);
        isAutoplaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';

    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});


//event contains key


document.body.addEventListener('keydown', (event) =>{
    console.log(event.key);

    if(event.key == 'r'){
        playGame('Rock');
    } else if(event.key = 'p'){
        playGame('Paper')
    } else if(event.key = 's'){
        playGame('Scissors')
    }
})

function playGame(playerMove) {
    let computerMove = pickComputerMove();
    let result = '';

    console.log(`Computer move: ${computerMove}`);
    console.log(`Player move: ${playerMove}`);

    if (computerMove === 'Rock') {
        if (playerMove === 'Rock') {
            result = 'Tie';
        } else if (playerMove === 'Scissors') {
            result = 'You lose';
        } else if (playerMove === 'Paper') {
            result = 'You won';
        }
    } else if (computerMove === 'Paper') {
        if (playerMove === 'Paper') {
            result = 'Tie';
        } else if (playerMove === 'Rock') {
            result = 'You lose';
        } else if (playerMove === 'Scissors') {
            result = 'You won';
        }
    } else if (computerMove === 'Scissors') {
        if (playerMove === 'Scissors') {
            result = 'Tie';
        } else if (playerMove === 'Paper') {
            result = 'You lose';
        } else if (playerMove === 'Rock') {
            result = 'You won';
        }
    }

    if (result === 'You won') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
        <img class="move-icon" src="Images/${playerMove.toLowerCase()}-emoji.png">
        <img class="move-icon" src="Images/${computerMove.toLowerCase()}-emoji.png">
        Computer`;

    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    let randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        return 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

document.querySelector('.reset-score-button').addEventListener('click',
    ()=> {
        resetScore();
    }
)

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}
