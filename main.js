const questions = [
   {
      question: 'Столица Германии?',
      answers: ['Нурсултан', 'Гамбург', 'Мюнхен', 'Берлин'],
      correct: 4,
   },
   {
      question: 'Столица Венгрии?',
      answers: [
         'Сегед',
         'Будапешт',
         'Баку',
         'Мишкольц',
      ],
      correct: 2,
   },
   {
      question: 'Столица Мексики?',
      answers: [
         'Мехико',
         'Москва',
         'Тихуана',
         'Гвадалахара',
      ],
      correct: 1,
   },
   {
      question: 'Столица Кореи?',
      answers: ['Сеул', 'Пусан', 'Инчхон', 'Минск'],
      correct: 1,
   },
];

// Находим элементы

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBnt = document.querySelector('#submit');

// Переменные игры

let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBnt.onclick = checkAnswer;

function clearPage() {
   headerContainer.innerHTML = '';
   listContainer.innerHTML = '';
}

function showQuestion() {
   // Вопрос

   const headerTemplate = `<h2 class="title">${questions[questionIndex]['question']}</h2>`;

   headerContainer.innerHTML = headerTemplate;

   // Варианты ответа

   questions[questionIndex]['answers'].forEach((answerText, index) => {
      const questionTemplate = `<li>
            <label>
               <input value="${
                  index + 1
               }" type="radio" class="answer" name="answer" />
               <span>${answerText}</span>
            </label>
         </li>`;

      console.log(answerText);

      listContainer.innerHTML += questionTemplate;
   });
}

function checkAnswer() {
   // Находим выбранную радио кнопку

   const checkedRadio = listContainer.querySelector(
      'input[type="radio"]:checked'
   );

   // Если ответ не выбран - ничего не делаем, выходим из функции

   if (!checkedRadio) {
      submitBnt.blur();
      return;
   }

   // Узнаем номер ответа пользователя

   const userAnswer = parseInt(checkedRadio.value);

   if (userAnswer === questions[questionIndex]['correct']) score++;

   if (questionIndex !== questions.length - 1) {
      questionIndex++;
      clearPage();
      showQuestion();
      return;
   } else {
      clearPage();
      showResults();
   }
}

function showResults() {
   let title, message;

   // Варианты заголовков и теста
   if (score === questions.length) {
      title = 'Поздравляю!';
      message = 'Вы ответили верно на все вопросы';
   } else if ((score * 100) / questions.length >= 50) {
      title = 'Неплохой результат!';
      message = 'Вы дали более половины правильных ответов';
   } else {
      title = 'Тупой хуесос!';
      message = 'Вы дали менее половины правильных ответов';
   }

   let result = `${score} из ${questions.length}`;

   const resultTemplate = `            
      <h2 class="title">${title}</h2>
      <h3 class="summary">${message}</h3>
      <p class="result">${result}</p>
   `;

   headerContainer.innerHTML = resultTemplate;

   submitBnt.blur();
   submitBnt.innerHTML = 'Начать заново';
   submitBnt.onclick = () => history.go();
}
