document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("game1");
    const ctx = canvas.getContext("2d");

    const ground = new Image();
    ground.src = "img/fon2.jpg";

    function drawGame() {
        ctx.drawImage(ground, 0, 0);
    }
    let game = setInterval(drawGame, 100);

    const display = document.querySelector(".display");
    const btns = document.querySelectorAll('.js-btn');
    const clueBtn = document.querySelector('.js-clue');
    const output = document.getElementById("output");
    const output1 = document.getElementById("output1");
    const output2 = document.getElementById("output2");
    const output3 = document.getElementById("output3");
    const output4 = document.getElementById("output4");
    const output5 = document.getElementById("output5");

    let randomNumbers = generateUniqueRandomNumbers(4);
    console.log("Generated numbers:", randomNumbers.join(''));

    let possibleCombinations = generateAllPossibleCombinations();

    btns.forEach((item) => {
        item.addEventListener('click', (e) => {
            handleButtonClick(e.target.textContent);
        });
    });

    clueBtn.addEventListener('click', () => {
        showClue();
    });

    display.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleButtonClick('OK');
        }
    });

    function handleButtonClick(itemText) {
        let currentValue = display.value;
        if (itemText === "DEL") {
            display.value = "";
        } else if (itemText === "OK") {
            if (!isValidInput(display.value)) {
                return;
            }

            let userGuess = document.createElement('div');
            userGuess.textContent = display.value;
            output.appendChild(userGuess);

            let bulls = compareNumbersBull(display.value, randomNumbers);
            let bullsDiv = document.createElement('div');
            bullsDiv.textContent = bulls;
            output1.appendChild(bullsDiv);

            let cows = compareNumbersCow(display.value, randomNumbers);
            let cowsDiv = document.createElement('div');
            cowsDiv.textContent = cows;
            output2.appendChild(cowsDiv);

            display.value = "";
            animateScroll();

            if (bulls === 4) {
                showWinScreen();
            } else {
                handleRobotTurn();
            }
        } else {
            if (currentValue.length < 4 && !currentValue.includes(itemText)) {
                display.value += itemText;
            }
        }
    }

    function handleRobotTurn() {
        if (possibleCombinations.length === 0) {
            showLoseScreen();
            return;
        }

        let robotGuess = possibleCombinations.shift().join('');
        let robotGuessDiv = document.createElement('div');
        robotGuessDiv.textContent = robotGuess;
        output3.appendChild(robotGuessDiv);

        let bulls = compareNumbersBull(robotGuess, randomNumbers);
        let bullsDiv = document.createElement('div');
        bullsDiv.textContent = bulls;
        output4.appendChild(bullsDiv);

        let cows = compareNumbersCow(robotGuess, randomNumbers);
        let cowsDiv = document.createElement('div');
        cowsDiv.textContent = cows;
        output5.appendChild(cowsDiv);

        possibleCombinations = possibleCombinations.filter(combination => {
            let combStr = combination.join('');
            return compareNumbersBull(robotGuess, combStr) === bulls && compareNumbersCow(robotGuess, combStr) === cows;
        });

        if (bulls === 4) {
            showLoseScreen();
        }

        animateScroll();
    }

    function generateUniqueRandomNumbers(count) {
        const numbers = [];
        while (numbers.length < count) {
            const randomNum = Math.floor(Math.random() * 10).toString();
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    }

    function generateAllPossibleCombinations() {
        let combinations = [];
        for (let i = 0; i < 10000; i++) {
            let combination = i.toString().padStart(4, '0').split('');
            if (new Set(combination).size === 4) {
                combinations.push(combination);
            }
        }
        return combinations;
    }

    function compareNumbersBull(userInput, randomNumbers) {
        let matchingNumbers = [];
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] == randomNumbers[i]) {
                matchingNumbers.push(userInput[i]);
            }
        }
        return matchingNumbers.length;
    }

    function compareNumbersCow(userInput, randomNumbers) {
        let nonMatchingNumbers = [];
        for (let i = 0; i < userInput.length; i++) {
            if (randomNumbers.includes(userInput[i]) && userInput[i] != randomNumbers[i]) {
                nonMatchingNumbers.push(userInput[i]);
            }
        }
        return nonMatchingNumbers.length;
    }

    function animateScroll() {
        const outputs = [output, output1, output2, output3, output4, output5];
        outputs.forEach(element => {
            const content = element.querySelector('.output-content');
            if (content) {
                const containerHeight = element.clientHeight;
                const contentHeight = content.scrollHeight;

                if (contentHeight > containerHeight) {
                    const translateY = containerHeight - contentHeight;
                    content.style.transform = `translateY(${translateY}px)`;
                }
            }
        });
    }

    function showClue() {
        if (!display.value.includes(randomNumbers[0])) {
            display.value = randomNumbers[0];
        }
    }

    function showWinScreen() {
        const winScreen = document.createElement('div');
        winScreen.textContent = "You Win!";
        winScreen.style.position = 'fixed';
        winScreen.style.top = '50%';
        winScreen.style.left = '50%';
        winScreen.style.transform = 'translate(-50%, -50%)';
        winScreen.style.padding = '20px';
        winScreen.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
        winScreen.style.color = 'white';
        winScreen.style.fontSize = '24px';
        winScreen.style.borderRadius = '10px';
        winScreen.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        winScreen.style.zIndex = '1000';
        document.body.appendChild(winScreen);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    function showLoseScreen() {
        const loseScreen = document.createElement('div');
        loseScreen.textContent = "You Lose!";
        loseScreen.style.position = 'fixed';
        loseScreen.style.top = '50%';
        loseScreen.style.left = '50%';
        loseScreen.style.transform = 'translate(-50%, -50%)';
        loseScreen.style.padding = '20px';
        loseScreen.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        loseScreen.style.color = 'white';
        loseScreen.style.fontSize = '24px';
        loseScreen.style.borderRadius = '10px';
        loseScreen.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        loseScreen.style.zIndex = '1000';
        document.body.appendChild(loseScreen);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

    function isValidInput(input) {
        return /^\d{4}$/.test(input);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const digits = document.querySelectorAll('.digit');

    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            if (digit.classList.contains('excluded')) {
                digit.classList.remove('excluded');
                digit.classList.add('included');
            } else if (digit.classList.contains('included')) {
                digit.classList.remove('included');
            } else {
                digit.classList.add('excluded');
            }
        });
    });
});