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
  var output = document.getElementById("output");
  var output1 = document.getElementById("output1");
  var output2 = document.getElementById("output2"); // const winScreen = document.getElementById('winScreen');
  // const homeButton = document.getElementById('homeButton');
  // Generate random numbers when the page loads

  var randomNumbers = generateUniqueRandomNumbers(4);
  console.log("Generated numbers:", randomNumbers.join('')); //об'єднує елементи масиву в один рядок без розділювачів між ними.

  btns.forEach(function (item) {
    //Використовується метод forEach для проходження по кожному елементу в колекції btns. btns - це, імовірно, колекція кнопок.
    item.addEventListener('click', function (e) {
      //Додається обробник подій, який виконується при натисканні на кнопку.
      handleButtonClick(e.target.textContent);
    });
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

      output.appendChild(userGuess); //Додає новостворений елемент userGuess до контейнера output. Таким чином, введене число користувача буде відображене на сторінці в контейнері output.

      var bulls = compareNumbersBull(display.value, randomNumbers); //Викликає функцію compareNumbersBull, яка порівнює введене користувачем число (display.value) з випадково згенерованими числами (randomNumbers). Ця функція повертає кількість Bulls, тобто кількість чисел, які правильно вгадані і знаходяться на правильних позиціях.

      var bullsDiv = document.createElement('div');
      bullsDiv.textContent = bulls; //Встановлює текстовий вміст новоствореного елемента bullsDiv на кількість Bulls, яку повернула функція compareNumbersBull.

      output1.appendChild(bullsDiv); //Додає новостворений елемент bullsDiv до контейнера output1. Таким чином, кількість Bulls буде відображена на сторінці в контейнері output1.

      var cows = compareNumbersCow(display.value, randomNumbers);
      var cowsDiv = document.createElement('div');
      cowsDiv.textContent = cows;
      output2.appendChild(cowsDiv);
      display.value = "";

      if (bulls === 4) {
        showWinScreen();
      }
    } else {
      if (currentValue.length < 4 && !currentValue.includes(itemText)) {
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
    } // if(matchingNumbers.length === 4){
    //     showWinScreen(); // Викликаємо функцію для відображення екрану перемоги
    // }


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

  function showWinScreen() {
    var winScreen = document.createElement('div'); //Створює новий div елемент.

    winScreen.style.position = 'fixed';
    winScreen.style.top = '0';
    winScreen.style.left = '0';
    winScreen.style.width = '100%';
    winScreen.style.height = '100%';
    winScreen.style.backgroundColor = 'white';
    winScreen.style.display = 'flex';
    winScreen.style.flexDirection = 'column';
    winScreen.style.justifyContent = 'center';
    winScreen.style.alignItems = 'center';
    var winMessage = document.createElement('h1'); //Створює новий h1 елемент.

    winMessage.textContent = 'WIN'; //Встановлює текст для цього елементу.

    winScreen.appendChild(winMessage); //Додає цей елемент як дочірній до winScreen.

    var homeButton = document.createElement('button'); //Створює новий button елемент.

    homeButton.textContent = 'Go to Home'; //Встановлює текст для цієї кнопки.

    homeButton.style.marginTop = '20px'; //Додає верхній відступ до кнопки.

    homeButton.addEventListener('click', function () {
      //Додає обробник подій для кліку на кнопку, який перезавантажує сторінку.
      window.location.reload(); //Додає цю кнопку як дочірній елемент до winScreen.
    });
    winScreen.appendChild(homeButton); // Додає цю кнопку як дочірній елемент до winScreen.//Додає winScreen до body документа, тим самим роблячи його видимим на сторінці.

    document.body.appendChild(winScreen); //Додає winScreen до body документа, тим самим роблячи його видимим на сторінці.
  }

  function isValidInput(input) {
    var pattern = /^[0-9]{4}$/;

    if (!pattern.test(input)) {
      return false;
    }

    var uniqueDigits = new Set(input);
    return uniqueDigits.size === 4;
  }
}); // document.addEventListener('DOMContentLoaded', () => {
//     const displays = document.querySelectorAll('.display');
//     const btns = document.querySelectorAll('.js-btn');
//     let currentDisplayIndex = 0;
//     btns.forEach((btn) => {
//         btn.addEventListener('click', (e) => {
//             let btnText = e.target.textContent;
//             if (btnText === 'OK') {
//                 alert('OK button clicked');
//             } else if (btnText === 'DEL') {
//                 if (currentDisplayIndex > 0) {
//                     currentDisplayIndex--;
//                     displays[currentDisplayIndex].value = '';
//                 }
//             } else if (/^[0-9]$/.test(btnText)) {
//                 if (currentDisplayIndex < displays.length) {
//                     displays[currentDisplayIndex].value = btnText;
//                     currentDisplayIndex++;
//                 }
//             }
//         });
//     });
//     displays.forEach((display, index) => {
//         display.addEventListener('focus', () => {
//             currentDisplayIndex = index;
//         });
//     });
// });
//  document.getElementById('singleNumber').addEventListener('input', function (e) {
//     let value = e.target.value;
//     if (value.length > 1) {
//         e.target.value = value.slice(0, 1);
//     }
//     if (!/^\d$/.test(value) && value !== "") {
//         e.target.value = '';
//     }
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const buttons = document.querySelectorAll('.btn');
//     const displays = document.querySelectorAll('.display');
//     let currentDisplayIndex = 0;
//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             const value = button.textContent;
//             if (value === 'OK') {
//                 alert('OK button clicked');
//             } else if (value === 'DEL') {
//                 if (currentDisplayIndex > 0) {
//                     currentDisplayIndex--;
//                     displays[currentDisplayIndex].value = '';
//                 }
//             } else {
//                 if (currentDisplayIndex < displays.length && /^[0-9]$/.test(value)) {
//                     displays[currentDisplayIndex].value = value;
//                     currentDisplayIndex++;
//                 }
//             }
//         });
//     });
//     displays.forEach((display, index) => {
//         display.addEventListener('focus', () => {
//             currentDisplayIndex = index;
//         });
//     });
// });
//# sourceMappingURL=play.dev.js.map
