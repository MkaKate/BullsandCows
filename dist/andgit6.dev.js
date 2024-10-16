"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById("game1");
  var ctx = canvas.getContext("2d");
  var ground = new Image();
  ground.src = "img/fon2.jpg";

  function drawGame() {
    ctx.drawImage(ground, 0, 0);
  }

  var game = setInterval(drawGame, 100);
  var display = document.querySelector(".display");
  var btns = document.querySelectorAll('.js-btn');
  var clueBtn = document.querySelector('.js-clue');
  var output = document.getElementById("output");
  var output1 = document.getElementById("output1");
  var output2 = document.getElementById("output2");
  var output3 = document.getElementById("output3");
  var output4 = document.getElementById("output4");
  var output5 = document.getElementById("output5");
  var randomNumbers = generateUniqueRandomNumbers(6);
  console.log("Generated numbers:", randomNumbers.join(''));
  var possibleCombinations = generateAllPossibleCombinations();
  btns.forEach(function (item) {
    item.addEventListener('click', function (e) {
      handleButtonClick(e.target.textContent);
    });
  });
  clueBtn.addEventListener('click', function () {
    showClue();
  });
  display.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleButtonClick('OK');
    }
  });

  function handleButtonClick(itemText) {
    var currentValue = display.value;

    if (itemText === "DEL") {
      display.value = "";
    } else if (itemText === "OK") {
      if (!isValidInput(display.value)) {
        return;
      }

      var userGuess = document.createElement('div');
      userGuess.textContent = display.value;
      output.appendChild(userGuess);
      var bulls = compareNumbersBull(display.value, randomNumbers);
      var bullsDiv = document.createElement('div');
      bullsDiv.textContent = bulls;
      output1.appendChild(bullsDiv);
      var cows = compareNumbersCow(display.value, randomNumbers);
      var cowsDiv = document.createElement('div');
      cowsDiv.textContent = cows;
      output2.appendChild(cowsDiv);
      display.value = "";
      animateScroll();

      if (bulls === 6) {
        showWinScreen();
      } else {
        // Додаємо затримку перед ходом робота
        setTimeout(handleRobotTurn, 2000); // 2000 мс = 2 секунди
      }
    } else {
      if (currentValue.length < 6 && !currentValue.includes(itemText)) {
        display.value += itemText;
      }
    }
  }

  function handleRobotTurn() {
    if (possibleCombinations.length === 0) {
      showLoseScreen();
      return;
    } // Робимо хід робота менш ефективним шляхом випадкового вибору ходу з можливих комбінацій


    var randomIndex = Math.floor(Math.random() * possibleCombinations.length);
    var robotGuess = possibleCombinations.splice(randomIndex, 1)[0].join('');
    var robotGuessDiv = document.createElement('div');
    robotGuessDiv.textContent = robotGuess;
    output3.appendChild(robotGuessDiv);
    var bulls = compareNumbersBull(robotGuess, randomNumbers);
    var bullsDiv = document.createElement('div');
    bullsDiv.textContent = bulls;
    output4.appendChild(bullsDiv);
    var cows = compareNumbersCow(robotGuess, randomNumbers);
    var cowsDiv = document.createElement('div');
    cowsDiv.textContent = cows;
    output5.appendChild(cowsDiv);
    possibleCombinations = possibleCombinations.filter(function (combination) {
      var combStr = combination.join('');
      return compareNumbersBull(robotGuess, combStr) === bulls && compareNumbersCow(robotGuess, combStr) === cows;
    });

    if (bulls === 6) {
      showLoseScreen();
    }

    animateScroll();
  }

  function generateUniqueRandomNumbers(count) {
    var numbers = [];

    while (numbers.length < count) {
      var randomNum = Math.floor(Math.random() * 10).toString();

      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }

    return numbers;
  }

  function generateAllPossibleCombinations() {
    var combinations = [];

    for (var i = 0; i < 1000000; i++) {
      var combination = i.toString().padStart(6, '0').split('');

      if (new Set(combination).size === 6) {
        combinations.push(combination);
      }
    }

    return combinations;
  }

  function compareNumbersBull(userInput, randomNumbers) {
    var matchingNumbers = [];

    for (var i = 0; i < userInput.length; i++) {
      if (userInput[i] == randomNumbers[i]) {
        matchingNumbers.push(userInput[i]);
      }
    }

    return matchingNumbers.length;
  }

  function compareNumbersCow(userInput, randomNumbers) {
    var nonMatchingNumbers = [];

    for (var i = 0; i < userInput.length; i++) {
      if (randomNumbers.includes(userInput[i]) && userInput[i] != randomNumbers[i]) {
        nonMatchingNumbers.push(userInput[i]);
      }
    }

    return nonMatchingNumbers.length;
  }

  function animateScroll() {
    var outputs = [output, output1, output2, output3, output4, output5];
    outputs.forEach(function (element) {
      var content = element.querySelector('.output-content');

      if (content) {
        var containerHeight = element.clientHeight;
        var contentHeight = content.scrollHeight;

        if (contentHeight > containerHeight) {
          var translateY = containerHeight - contentHeight;
          content.style.transform = "translateY(".concat(translateY, "px)");
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
    var winScreen = document.createElement('div');
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
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 3000);
  }

  function showLoseScreen() {
    var loseScreen = document.createElement('div');
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
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 3000);
  }

  function isValidInput(input) {
    return /^\d{6}$/.test(input);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var digits = document.querySelectorAll('.digit');
  digits.forEach(function (digit) {
    digit.addEventListener('click', function () {
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
//# sourceMappingURL=andgit6.dev.js.map
