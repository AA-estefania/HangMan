let chosenWordObj = wordList[Math.floor(Math.random() * wordList.length)];
let chosenWord = chosenWordObj.word;
let guessedWord = Array(chosenWord.length).fill('_');
let maxWrong = 6;
let mistakes = 0;
let guessedLetters = [];

// Modal elements
const modal = document.getElementById("result-modal");
const closeModal = document.getElementById("close-modal");
const resultMessage = document.getElementById("result-message");
const playAgainButton = document.getElementById("play-again");

// Function to update the displayed word
function updateWordDisplay() {
    document.getElementById('word-display').innerText = guessedWord.join(' ');
}

// Function to generate alphabet buttons
function generateAlphabetButtons() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetButtonsDiv = document.getElementById('alphabet-buttons');
    
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        alphabetButtonsDiv.appendChild(button);
    });
}

// Function to handle letter guess
function handleGuess(letter, button) {
    // Disable the button after it has been clicked
    button.disabled = true;
    button.classList.add('disabled');
    guessedLetters.push(letter);

    if (chosenWord.includes(letter)) {
        // Reveal the correct letter in the word
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        updateWordDisplay();
        checkWin();
    } else {
        // Increment mistakes for wrong guesses
        mistakes++;
        document.getElementById('incorrect-guesses').innerText = mistakes;
        console.log("Mistakes count: ", mistakes); // Debugging log
        updateHangmanImage();
        checkLoss();
    }
}


// Function to update the hangman image based on mistakes
function updateHangmanImage() {
    document.getElementById('hangman-image').src = `assets/images/hangman${mistakes}.png`;
}

// Check if the player has won
function checkWin() {
    if (!guessedWord.includes('_')) {
        showModal("Congratulations! You won!", 'win');
    }
}

// Check if the player has lost
function checkLoss() {
    if (mistakes === maxWrong) {
        showModal(`Game over! The word was: ${chosenWord}`, 'loss');
    }
}

// Show the modal with the result message
function showModal(message, resultType) {
    resultMessage.innerText = message;

    const gifElement = document.getElementById('modal-gif');
    
    // Show the appropriate GIF based on the result type
    if (resultType === 'win') {
        gifElement.src = 'assets/images/happy.gif';
        gifElement.style.display = 'block'; // Show the GIF
    } else if (resultType === 'loss') {
        gifElement.src = 'assets/images/sad.gif';
        gifElement.style.display = 'block'; // Show the GIF
    } else {
        gifElement.style.display = 'none'; // Hide GIF for other cases
    }
    
    modal.style.display = "flex";
}

// Close modal and reset game
closeModal.onclick = function() {
    modal.style.display = "none";
};

playAgainButton.onclick = function() {
    modal.style.display = "none";
    resetGame();
};

// Function to reset the game (add this line to reset the incorrect guesses)
function resetGame() {
    chosenWordObj = wordList[Math.floor(Math.random() * wordList.length)];
    chosenWord = chosenWordObj.word;
    guessedWord = Array(chosenWord.length).fill('_');
    mistakes = 0;
    guessedLetters = [];
    document.getElementById('hangman-image').src = 'assets/images/hangman0.png';
    document.getElementById('alphabet-buttons').innerHTML = '';
    document.getElementById('hint-display').innerText = '';
    document.getElementById('incorrect-guesses').innerText = 0; // Reset incorrect guesses
    updateWordDisplay();
    generateAlphabetButtons();
}
// Display hint when the hint button is clicked
function showHint() {
    document.getElementById('hint-display').innerText = chosenWordObj.hint;
}

// Initialize the game
function init() {
    document.getElementById('hint-button').addEventListener('click', showHint);
    updateWordDisplay();
    generateAlphabetButtons();
}

init();

