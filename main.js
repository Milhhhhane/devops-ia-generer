import "./style.css";

const API_URL = "/api";
const TIMEOUT = 4000;

const app = document.querySelector("#app");

let currentUser = null;
let Questions = [];

// Précharger tous les modules de questions avec Vite
const questionModules = import.meta.glob("./questions_*.js");

// Sujets disponibles (nom affiché -> chemin du module)
const AVAILABLE_SUBJECTS = {
  docker: "./questions_docker.js",
  ansible: "./questions_ansible.js",
  devops: "./questions_devops.js",
  cicd: "./questions_cicd.js",
  scm: "./questions_scm.js",
  "usine-logicielle": "./questions_usine-logicielle.js",
};

// Mélange aléatoire d'un tableau (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Show registration form on load
displayRegistrationForm();

function displayRegistrationForm() {
  app.innerHTML = `
    <h1>Quiz App</h1>
    <p>Testez vos connaissances !</p>
    <form id="registration-form" class="registration-form">
      <div class="form-group">
        <label for="firstname">Prénom</label>
        <input type="text" id="firstname" name="firstname" required placeholder="Votre prénom">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="votre@email.com">
        <small class="form-hint">Vos résultats vous seront envoyés par email</small>
      </div>
      <div class="form-group">
        <label for="subject">Sujet du quiz</label>
        <input type="text" id="subject" name="subject" required placeholder="Ex: docker">
      </div>
      <!-- Honeypot field - hidden from real users -->
      <div class="form-group hp-field" aria-hidden="true">
        <label for="website">Website</label>
        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
      </div>
      <button type="submit">Commencer le quiz</button>
    </form>
  `;

  const form = document.querySelector("#registration-form");
  form.addEventListener("submit", handleRegistration);
}

async function handleRegistration(event) {
  event.preventDefault();

  const firstname = document.querySelector("#firstname").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const website = document.querySelector("#website").value; // Honeypot

  const submitButton = document.querySelector("#registration-form button");
  submitButton.disabled = true;
  submitButton.textContent = "Chargement...";

  // Vérifier que le sujet est valide
  if (!AVAILABLE_SUBJECTS[subject]) {
    alert("Veuillez choisir un sujet valide.");
    submitButton.disabled = false;
    submitButton.textContent = "Commencer le quiz";
    return;
  }

  try {
    // Charger dynamiquement les questions du sujet choisi
    const modulePath = AVAILABLE_SUBJECTS[subject];
    const questionsModule = await questionModules[modulePath]();
    Questions = shuffleArray([...questionsModule.Questions]);

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, email, website }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription");
    }

    currentUser = await response.json();
    startQuiz();
  } catch (error) {
    console.error("Registration error:", error);
    submitButton.disabled = false;
    submitButton.textContent = "Commencer le quiz";
    alert("Erreur lors de l'inscription. Veuillez réessayer.");
  }
}

function startQuiz() {
  let currentQuestion = 0;
  let score = 0;
  let questionStartTime = null;
  const answersData = [];

  displayQuestion(currentQuestion);

  function clean() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
    const progress = getProgressBar(Questions.length, currentQuestion);
    app.appendChild(progress);
  }

  function displayQuestion(index) {
    clean();
    const question = Questions[index];

    if (!question) {
      displayFinishMessage();
      return;
    }

    questionStartTime = Date.now();

    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton = getSubmitButton();
    submitButton.addEventListener("click", submit);
    app.appendChild(submitButton);
  }

  async function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo ! Tu as terminé le quiz.";
    const p = document.createElement("p");
    p.innerText = `Tu as eu un score de ${score} sur ${Questions.length} !`;

    app.appendChild(h1);
    app.appendChild(p);

    const savingP = document.createElement("p");
    savingP.innerText = "Envoi des résultats en cours...";
    savingP.className = "saving-message";
    app.appendChild(savingP);

    try {
      await fetch(`${API_URL}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          score,
          totalQuestions: Questions.length,
          answers: answersData,
        }),
      });

      savingP.innerText = `Résultats envoyés par email à ${currentUser.email} !`;
      savingP.className = "saving-message success";
    } catch (error) {
      console.error("Error saving results:", error);
      savingP.innerText = "Erreur lors de l'envoi des résultats.";
      savingP.className = "saving-message error";
    }
  }

  function submit() {
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
      return;
    }

    disableAllAnswers();

    const timeSpentMs = Date.now() - questionStartTime;
    const value = selectedAnswer.value;
    const question = Questions[currentQuestion];
    const isCorrect = question.correct === value;

    if (isCorrect) {
      score++;
    }

    answersData.push({
      questionIndex: currentQuestion,
      questionText: question.question,
      userAnswer: value,
      correctAnswer: question.correct,
      isCorrect,
      timeSpentMs,
    });

    showFeedback(isCorrect, question.correct, value);
    displayNextQuestionButton(() => {
      currentQuestion++;
      displayQuestion(currentQuestion);
    });

    const feedback = getFeedbackMessage(isCorrect, question.correct);
    app.appendChild(feedback);
  }

  function createAnswers(answers) {
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answersDiv.appendChild(label);
    }

    return answersDiv;
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text) {
  return text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);
  return label;
}

function getSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.innerText = "Valider";
  return submitButton;
}

function showFeedback(isCorrect, correct, answer) {
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`,
  );

  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`,
  );

  correctElement.classList.add("correct");
  selectedElement.classList.add(isCorrect ? "correct" : "incorrect");
}

function getFeedbackMessage(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
    ? "Bravo ! C'est la bonne réponse"
    : `Mauvaise réponse...la bonne réponse était ${correct}`;

  return paragraph;
}

function getProgressBar(max, value) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}

function displayNextQuestionButton(callback) {
  let remainingTimeout = TIMEOUT;

  app.querySelector("button").remove();

  const getButtonText = () => `Suivant (${remainingTimeout / 1000}s)`;

  const nextButton = document.createElement("button");
  nextButton.innerText = getButtonText();
  app.appendChild(nextButton);

  const interval = setInterval(() => {
    remainingTimeout -= 1000;
    nextButton.innerText = getButtonText();
  }, 1000);

  const timeout = setTimeout(() => {
    handleNextQuestion();
  }, TIMEOUT);

  const handleNextQuestion = () => {
    clearInterval(interval);
    clearTimeout(timeout);
    callback();
  };

  nextButton.addEventListener("click", () => {
    handleNextQuestion();
  });
}

function disableAllAnswers() {
  const radioInputs = document.querySelectorAll('input[type="radio"]');

  for (const radio of radioInputs) {
    radio.disabled = true;
  }
}
