// Hangman Game in JavaScript

const words = ["javascript", "hangman", "programming", "developer", "function"];
let word, guessedLetters, remainingAttempts, displayWord;

// Function to initialize the game state with a new word
function initializeGame() {
    word = words[Math.floor(Math.random() * words.length)].toLowerCase(); // Choose a new word
    guessedLetters = [];
    remainingAttempts = 6;
    displayWord = "_".repeat(word.length).split("");
    document.getElementById("letterInput").disabled = false;
    document.getElementById("message").textContent = "Start guessing by typing a letter!";
    updateDisplay();
}

// Update the displayed word and attempts
function updateDisplay() {
    document.getElementById("wordDisplay").textContent = displayWord.join(" ");
    document.getElementById("attempts").textContent = `Attempts left: ${remainingAttempts}`;
    document.getElementById("guessedLetters").textContent = `Guessed letters: ${guessedLetters.join(", ")}`;
}

// Check if the game is won
function isGameWon() {
    return displayWord.join("") === word;
}

// Function to handle letter guessing
function guessLetter() {
    const input = document.getElementById("letterInput");
    const letter = input.value.toLowerCase();

    // Validate input
    if (!letter || letter.length !== 1 || guessedLetters.includes(letter)) {
        document.getElementById("message").textContent = "Please enter a new letter.";
        input.value = "";
        return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                displayWord[i] = letter;
            }
        }
        document.getElementById("message").textContent = `Good job! The letter "${letter}" is in the word.`;
    } else {
        remainingAttempts--;
        document.getElementById("message").textContent = `Oops! The letter "${letter}" is not in the word.`;
    }

    updateDisplay();

    if (isGameWon()) {
        document.getElementById("message").textContent = `Congratulations! You've won! The word was "${word}".`;
        document.getElementById("letterInput").disabled = true;
    } else if (remainingAttempts <= 0) {
        document.getElementById("message").textContent = `Game over! The word was "${word}".`;
        document.getElementById("letterInput").disabled = true;
    }

    input.value = "";
}

// Function to restart the game with a new word
function restartGame() {
    initializeGame();
}

// Initialize the game for the first time
initializeGame();
