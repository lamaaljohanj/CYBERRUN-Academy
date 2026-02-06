const totalQuestions = 5;
  let currentQuestion = 0;
  let score = 0;
  let answered = 0;

  const progressBar= document.getElementById("progress-bar");
  const progressText= document.getElementById("progress-text");
  const startBtn= document.getElementById("start-btn");
  const resultsCard= document.getElementById("results-card");
  const scoreText= document.getElementById("score-text");
  const scoreDetail= document.getElementById("score-detail");
  const restartBtn= document.getElementById("restart-btn");

  function updateProgress() {
    const percentage = (answered / totalQuestions) * 100;
    progressBar.style.width = percentage + "%";
    progressText.textContent =
      "Question " + Math.min(answered + 1, totalQuestions) +
      " of " + totalQuestions;
  }

  function showQuestion(num) {
  document.querySelectorAll(".question-card").forEach(card => {
      card.classList.remove("active");
    });
    const card = document.getElementById(`question-${num}`);
    if (card) {
      card.classList.add("active");
    } }

  function showResults() {
    document.querySelectorAll(".question-card").forEach(card => {
      card.classList.remove("active"); });
    resultsCard.style.display = "block";
    scoreText.textContent = `You scored ${score} / ${totalQuestions}`;
    scoreDetail.textContent = "Hope you had fun!";}

  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    currentQuestion = 1;
    answered = 0;
    score = 0;
    resultsCard.style.display = "none";
    updateProgress();
    showQuestion(currentQuestion);
  });

  function resetQuiz() {
    score = 0;
    answered = 0;
    currentQuestion =1;

    resultsCard.style.display = "none";

    document.querySelectorAll('input[type="text"]').forEach(input => { input.value = "";});
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {cb.checked = false;});

 
    document.querySelectorAll(".feedback").forEach(fb => {fb.style.display = "none";
     fb.classList.remove("correct", "incorrect"); });
    document.querySelectorAll(".hint-message").forEach(h => { h.style.display = "none"; });

    updateProgress();
    showQuestion(currentQuestion);
    startBtn.style.display = "none"; }



  restartBtn.addEventListener("click", resetQuiz);

  document.querySelectorAll(".hint-btn").forEach(btn => {btn.addEventListener("click", () => {const q = btn.getAttribute("data-q");
  const hint = document.getElementById(`q${q}-hint`);
      if (hint) hint.style.display = "block";
     });
  });

  
  document.querySelectorAll(".skip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = parseInt(btn.getAttribute("data-q"), 10);
      const feedback = document.getElementById(`q${q}-feedback`);
      if (feedback) {
        feedback.textContent = "Skipped.";
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        feedback.style.display = "block";
      }
      nextQuestion();
    });
  });

  
  document.querySelectorAll(".submit-btn").forEach(btn => {btn.addEventListener("click", () => {
  const q = parseInt(btn.getAttribute("data-q"), 10);
      handleSubmit(q);});
  });









  function handleSubmit(q) {
    let correct = false;

    if (q === 1) {
      const ans = (document.getElementById("q1-answer").value || "")
        .trim()
        .toLowerCase();
      const expected = "cyberrun is the best";
      correct = ans === expected.toLowerCase();}

    if (q === 2) {
      const selected = Array.from(
        document.querySelectorAll('input[name="q2-sign"]:checked')).map(c => c.value);

 const expected = ["domain", "link"];
      selected.sort();
      expected.sort();
      correct =
        selected.length === expected.length &&
        selected.every((v, i) => v === expected[i]); }

  
    if (q === 3) {
      const ans = (document.getElementById("q3-answer").value || "") .trim()
       .toLowerCase();
      const expected = "cyber123";
      correct = ans === expected;
    }

   
    if (q === 4) {
      const ans = (document.getElementById("q4-answer").value || "")
        .trim()
        .toLowerCase();
      const expected = "escape";
      correct = ans === expected;
    }

    if (q === 5) {
      const ans = (document.getElementById("q5-answer").value || "")
        .trim()
        .toLowerCase();
      const expected = "hackingisfun";
      correct = ans === expected;
    }

    const feedback = document.getElementById(`q${q}-feedback`);
    if (feedback) {
      feedback.style.display = "block";
      if (correct) {
        feedback.textContent = "Correct!";
        feedback.classList.remove("incorrect");
        feedback.classList.add("correct");
        score++;
      } else {
        feedback.textContent = "Not quite, but you can skip or try again.";
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        // ما ننتقل للسؤال اللي بعده إلا إذا صح أو Skip
        return;
      }
    }
nextQuestion(); }

  function nextQuestion() {
    answered++;
    updateProgress();
    if (answered >= totalQuestions) {
      showResults();
    } else {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  }


  const escapeBtn = document.getElementById("escape-btn");

  if (escapeBtn) {
    function escape() {
      const box = escapeBtn.parentElement;
      const maxX = box.clientWidth - escapeBtn.clientWidth;
      const maxY = box.clientHeight - escapeBtn.clientHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      escapeBtn.style.left = x + "px";
      escapeBtn.style.top  = y + "px";
    }
 escapeBtn.addEventListener("mousemove", escape);
    escapeBtn.addEventListener("click", () => { alert("🎉 You caught the button! The secret word is: escape");
    }); 
     };