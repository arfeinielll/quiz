const questions = [
   {
      question: 'Когда тебя ебали, что на жопе написали?',
      answers: ['Нурсултан', 'Петух', 'Выдра', 'Ольга'],
      correct: 4,
   },
   {
      question: 'Сколько миллиграм спермы в твоих яйцах?',
      answers: ['50', '70', 'Телевизор', '8'],
      correct: 2,
   },
   {
      question: 'Столица Мексики?',
      answers: ['Мехико', 'Пираллахи', 'Тихуана', 'Гвадалахара'],
      correct: 1,
   },
   {
      question: 'Настоящая фамилия Рауля?',
      answers: ['Гоздах', 'Пусан', 'Пездон', 'Алик'],
      correct: 1,
   },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBnt = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBnt.onclick = checkAnswer;

function clearPage() {
   headerContainer.innerHTML = '';
   listContainer.innerHTML = '';
}

function showQuestion() {
   const headerTemplate = `<h2 class="title">${questions[questionIndex]['question']}</h2>`;

   headerContainer.innerHTML = headerTemplate;

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
   const checkedRadio = listContainer.querySelector(
      'input[type="radio"]:checked'
   );

   if (!checkedRadio) {
      submitBnt.blur();
      return;
   }

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
      title = 'Поздравляю юхуу!';
      message = 'Ты очень умный, все ответы верны';
   } else if ((score * 100) / questions.length >= 50) {
      title = 'Ты немного туповат';
      message = 'Ты дал более половины правильных ответов';
   } else {
      title = 'Ты тупой хуесос!';
      message = 'Давай по новой Миша, всё хуйня';
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
