const questions = [
    {
        question: "世界上最高的山是哪一座？",
        options: ["富士山", "聖母峰", "阿爾卑斯山"],
        answer: "聖母峰"
    },
    {
        question: "太陽系裡最大的行星是？",
        options: ["地球", "木星", "土星"],
        answer: "木星"
    },
    {
        question: "光速大約是多少 km/s？",
        options: ["300,000", "150,000", "30,000"],
        answer: "300,000"
    }
];

let currentQuestion = 0;
let score = 0;

    function loadQuestion() {
      if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const quizDiv = document.getElementById("quiz");
        quizDiv.innerHTML = `
          <div class="question">${q.question}</div>
          <div class="options">
            ${q.options.map(option => 
              `<button onclick="checkAnswer('${option}')">${option}</button>`
            ).join("")}
          </div>
        `;
      } else {
        document.getElementById("quiz").innerHTML = "";
        document.getElementById("result").textContent = 
          `遊戲結束！你的分數是 ${score} / ${questions.length}`;
      }
    }

    function checkAnswer(selected) {
      const q = questions[currentQuestion];
      if (selected === q.answer) {
        score++;
      }
      currentQuestion++;
      loadQuestion();
    }

    loadQuestion();