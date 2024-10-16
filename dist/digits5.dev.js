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
  var output2 = document.getElementById("output2"); // const winScreen = document.getElementById('winScreen');
  // const homeButton = document.getElementById('homeButton');
  // Generate random numbers when the page loads

  var randomNumbers = generateUniqueRandomNumbers(5);
  console.log("Generated numbers:", randomNumbers.join('')); //об'єднує елементи масиву в один рядок без розділювачів між ними.

  btns.forEach(function (item) {
    //Використовується метод forEach для проходження по кожному елементу в колекції btns. btns - це, імовірно, колекція кнопок.
    item.addEventListener('click', function (e) {
      //Додається обробник подій, який виконується при натисканні на кнопку.
      handleButtonClick(e.target.textContent);
    });
  });
  clueBtn.addEventListener('click', function () {
    showClue();
  }); // let itemText = e.target.textContent;//itemText містить текстове значення кнопки, яка була натиснута.
  // let currentValue = display.value;//currentValue містить поточне значення поля display, яке, імовірно, є текстовим полем або іншим елементом введення.

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
      // output.textContent = display.value; //Значення поля display копіюється в output (ймовірно, елемент для виведення результату).
      // compareNumbersBull(display.value, randomNumbers);//Викликається функція compareNumbers, яка порівнює значення display з randomNumbers
      // compareNumbersCow(display.value, randomNumbers);
      // display.value = "";
      if (!isValidInput(display.value)) {
        // Перевірка на правильність введених даних
        return;
      }

      var userGuess = document.createElement('div'); //Цей рядок створює новий HTML елемент <div>, який буде використаний для відображення введеного числа користувачем.

      userGuess.textContent = display.value; //Встановлює текстовий вміст новоствореного елемента userGuess на поточне значення поля вводу display. Це означає, що в цьому елементі буде відображено те число, яке користувач ввів.
      // userGuess.classList.add('scroll-item');

      output.appendChild(userGuess); //Додає новостворений елемент userGuess до контейнера output. Таким чином, введене число користувача буде відображене на сторінці в контейнері output.

      var bulls = compareNumbersBull(display.value, randomNumbers); //Викликає функцію compareNumbersBull, яка порівнює введене користувачем число (display.value) з випадково згенерованими числами (randomNumbers). Ця функція повертає кількість Bulls, тобто кількість чисел, які правильно вгадані і знаходяться на правильних позиціях.

      var bullsDiv = document.createElement('div');
      bullsDiv.textContent = bulls; //Встановлює текстовий вміст новоствореного елемента bullsDiv на кількість Bulls, яку повернула функція compareNumbersBull.
      // bullsDiv.classList.add('scroll-item');

      output1.appendChild(bullsDiv); //Додає новостворений елемент bullsDiv до контейнера output1. Таким чином, кількість Bulls буде відображена на сторінці в контейнері output1.

      var cows = compareNumbersCow(display.value, randomNumbers);
      var cowsDiv = document.createElement('div');
      cowsDiv.textContent = cows; // cowsDiv.classList.add('scroll-item');

      output2.appendChild(cowsDiv);
      display.value = "";
      animateScroll();

      if (bulls === 5) {
        showWinScreen();
      }
    } else {
      if (currentValue.length < 5 && !currentValue.includes(itemText)) {
        //Перевіряється, що довжина значення display менша за 4 та це значення не містить текст кнопки.
        display.value += itemText; //Якщо обидві умови виконуються, текст кнопки додається до display.
      }
    }
  }

  function generateUniqueRandomNumbers(count) {
    var numbers = []; //Цей масив буде містити згенеровані унікальні випадкові числа.

    while (numbers.length < count) {
      var randomNum = Math.floor(Math.random() * 10).toString();
      /*Math.random() * 10 генерує випадкове число від 0 до 9 (не включно 10).
        Math.floor() округлює це число до найближчого меншого цілого, перетворюючи його на ціле число від 0 до 9.
        .toString() перетворює це число на рядок. */

      if (!numbers.includes(randomNum)) {
        // перевіряє, чи вже існує це число в масиві.
        numbers.push(randomNum); //Якщо його немає в масиві, воно додається до масиву numbers.
      }
    }

    return numbers;
  }

  function compareNumbersBull(userInput, randomNumbers) {
    //Функція приймає два параметри: userInput і randomNumbers, які є масивами чисел
    var matchingNumbers = []; //Масив nonMatchingNumbers буде зберігати числа з userInput, які не співпадають з відповідними числами в randomNumbers.

    for (var i = 0; i < userInput.length; i++) {
      if (userInput[i] == randomNumbers[i]) {
        //перевіряє, чи елемент userInput[i] не співпадає з відповідним елементом randomNumbers[i]
        matchingNumbers.push(userInput[i]); //Якщо вони не співпадають, userInput[i] додається до масиву nonMatchingNumbers
      }
    }

    return matchingNumbers.length; //Цей рядок повертає кількість елементів у масиві matchingNumbers. Тобто, повертається кількість чисел, які співпали і за значенням, і за позицією.
  }

  function compareNumbersCow(userInput, randomNumbers) {
    //Функція приймає два параметри: userInput і randomNumbers, які є масивами чисел
    var nonMatchingNumbers = []; //Масив nonMatchingNumbers буде зберігати числа з userInput, які не співпадають з відповідними числами в randomNumbers.

    for (var i = 0; i < userInput.length; i++) {
      if (randomNumbers.includes(userInput[i]) && userInput[i] != randomNumbers[i]) {
        nonMatchingNumbers.push(userInput[i]);
      }
    }

    return nonMatchingNumbers.length;
  }

  function animateScroll() {
    var outputs = [output, output1, output2];
    outputs.forEach(function (element) {
      var content = element.querySelector('.output-content');

      if (content) {
        // Перевірка наявності елемента
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
    // Створюємо елемент для вікна з повідомленням про виграш
    var winScreen = document.createElement('div');
    winScreen.textContent = "You Win!"; // Стилі для вікна повідомлення про виграш

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
    winScreen.style.zIndex = '1000'; // Додаємо вікно до тіла документа

    document.body.appendChild(winScreen); // Повернення на головну сторінку через 3 секунди

    setTimeout(function () {
      window.location.href = 'index.html';
    }, 3000);
  }

  function isValidInput(input) {
    return /^\d{5}$/.test(input);
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
//# sourceMappingURL=digits5.dev.js.map
