const hangmanImg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessedText = document.querySelector(".guesses-text strong");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, contadorSeleccion;
const maxIntentos = 6;

const resetGame = () => {
    //Reset a todas las variables del juego y elementos (img, etc).
    correctLetters = [];
    contadorSeleccion = 0;
    hangmanImg.src = `images/hangman-${contadorSeleccion}.svg`;
    guessedText.innerHTML = `${contadorSeleccion} / ${maxIntentos}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //Selección de una palabra random y el concepto de la lista de palabras alojadas en el script. 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text strong").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        //Después de 600 ms de juego completado... mostrará modal con detalles relevantes.
        const modalText = isVictory ? `Encontraste la palabra` : `La palabra correcta fue`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.png`;
        gameModal.querySelector("h4").innerText = `${isVictory ? '¡Felicitaciones!' : '¡Vuelve a Intentarlo!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <strong>${currentWord}</strong>` ;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    //Chekear si al seleccionar una letra existe en la palabra.
    if(currentWord.includes(clickedLetter)){
        //Mostrar todas las letras correctas en la visualización de palabras
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        //Si al clickear una letra incorrecta el numero de intentos se reflejara tambien en la imagen.
        contadorSeleccion++;
        hangmanImg.src = `images/hangman-${contadorSeleccion}.svg`;
    }
    button.disabled = true;
    guessedText.innerHTML = `${contadorSeleccion} / ${maxIntentos}`;

    //Llamar a la función gameOver si se cumple alguna de estas condiciones
    if(contadorSeleccion === maxIntentos) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

//Creación de teclado generado dinámicamente agregando  la  ñ, por ende su interactividad como las demás letras :v 
for (let i = 97; i<= 122; i++){
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    
    if (i === 110) {
        const Ñbutton = document.createElement("button");
        Ñbutton.innerHTML = "ñ";
        keyboardDiv.appendChild(Ñbutton);
        Ñbutton.addEventListener("click", e => initGame(e.target, "ñ"));
    }
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);