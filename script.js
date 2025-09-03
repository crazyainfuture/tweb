const questions = [
    {
        "question": "Twice (韓專、大隊)新歌是哪一首？",
        "options": ["SET ME FREE", "Talk that Talk", "THIS IS FOR", "Strategy (feat. Megan Thee Stallion)"],
        "answer": "THIS IS FOR",
        "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
        "wrongMsg": ["真糟糕7月就出了!", "這麼簡單也可以答錯:("]
    },
    {
        "question": "哪一位是Twice的隊長？",
        "options": ["Nayeon", "Jihyo", "Sana", "Dahyun"],
        "answer": "Jihyo",
        "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
        "wrongMsg": ["真的是once??", "對你的粉籍提出嚴重質疑"]
    },
    
    {
        "question": "娜璉最新solo的歌名?",
        "options": ["Meeeeee", "MEEEEEE", "meeeeee", "ABCD"],
        "answer": "MEEEEEE",
        "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
        "wrongMsg": ["歌單是不是需要更新了?", "是不是還沒練應援趕快去!!!"]
    },
    
    {
        "question": "9/12彩彩🍓要solo出道!!粗卡!!!!請問主打歌歌名是？",
        "options": ["strawberry🍓", "blueberry🫐", "avocado🥑", "AVOCADO🥑","IN MY RooM"],
        "answer": "AVOCADO🥑",
        "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
        "wrongMsg": ["請多多支持彩彩的AVOCADO!!!", "9/12請支持彩彩的AVOCADO！"]
    },
]


let currentQuestion = 0;
let score = 0;
let playerName = "";
const scoreboard = [];

// Sidebar
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");


toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  mainContent.style.marginLeft = sidebar.classList.contains("show") ? "270px" : "20px";
});

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const scoreList = document.getElementById("scoreList");
const quizContainer = document.getElementById("quizContainer");
const nameInputContainer = document.getElementById("nameInputContainer");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("playerName");

startBtn.addEventListener("click", () => {
  playerName = nameInput.value.trim();
  if (playerName === "") {
    alert("請輸入暱稱！");
    return;
  }
  currentQuestion = 0;
  score = 0;
  nameInputContainer.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  resultDiv.textContent = "";

  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    quizDiv.innerHTML = `<div class="question">${q.question}</div>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;

      btn.addEventListener("click", () => {
        checkAnswer(option, btn, optionsDiv);
      });

      optionsDiv.appendChild(btn);
    });

    quizDiv.appendChild(optionsDiv);

    // 額外提示區塊
    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "feedback";
    quizDiv.appendChild(feedbackDiv);
  } else {
    endGame();
  }
}

function checkAnswer(selected, clickedBtn, optionsDiv) {
  const q = questions[currentQuestion];
  const feedbackDiv = document.getElementById("feedback");

  // 禁用所有按鈕
  const allButtons = optionsDiv.querySelectorAll("button");
  allButtons.forEach(b => b.disabled = true);

  if (selected === q.answer) {
    clickedBtn.style.backgroundColor = "green";
    score++;

    // 正確訊息隨機選一個
    let msg = "";
    if (Array.isArray(q.correctMsg)) {
      const idx = Math.floor(Math.random() * q.correctMsg.length);
      msg = q.correctMsg[idx];
    } else {
      msg = q.correctMsg;
    }

    feedbackDiv.textContent = `✅ ${msg}`;
    feedbackDiv.style.color = "green";

  } else {
    clickedBtn.style.backgroundColor = "red";

    // 錯誤訊息隨機或單一
    let msg = "";
    if (Array.isArray(q.wrongMsg)) {
      const idx = Math.floor(Math.random() * q.wrongMsg.length);
      msg = q.wrongMsg[idx];
    } else {
      msg = q.wrongMsg;
    }

    feedbackDiv.textContent = `❌ ${msg} 正確答案是：${q.answer}`;
    feedbackDiv.style.color = "red";

    // 標示正確答案按鈕
    allButtons.forEach(b => {
      if (b.textContent === q.answer) {
        b.style.backgroundColor = "green";
      }
    });
  }

  // 延遲 1.5 秒進入下一題
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1500);
}


function endGame() {
  quizDiv.innerHTML = "";
  resultDiv.textContent = `遊戲結束！${playerName} 的分數是 ${score} / ${questions.length}`;

  scoreboard.push({ name: playerName, score: score });
  scoreboard.sort((a, b) => b.score - a.score);
  updateScoreboard();

  setTimeout(() => {
    quizContainer.style.display = "none";
    nameInputContainer.style.display = "block";
    nameInput.value = "";
  }, 2000);
}

function updateScoreboard() {
  scoreList.innerHTML = scoreboard
    .map((s, i) => `<li>第 ${i + 1} 名 - ${s.name}：${s.score} 分</li>`)
    .join("");
}