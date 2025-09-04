const questions = [
  {
    "question": "Twice (韓專、大隊)新歌是哪一首？",
    "options": ["SET ME FREE", "Talk that Talk", "THIS IS FOR", "Strategy (feat. Megan Thee Stallion)"],
    "answer": "THIS IS FOR",
    "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
    "wrongMsg": ["真糟糕7月就出了!", "這麼簡單也可以答錯:("],
    "extraNote": ["請重看mv 20151020遍"]
  },
  {
    "question": "哪一位是Twice的隊長？",
    "options": ["Nayeon", "Jihyo", "Sana", "Dahyun"],
    "answer": "Jihyo",
    "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
    "wrongMsg": ["真的是once??", "對你的粉籍提出嚴重質疑"],
    "extraNote": [""]
  },
  {
    "question": "娜璉最新solo的歌名?",
    "options": ["Meeeeee", "MEEEEEE", "meeeeee", "ABCD"],
    "answer": "MEEEEEE",
    "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
    "wrongMsg": ["歌單是不是需要更新了?", "是不是還沒練應援趕快去!!!"],
    "extraNote": [""]
  },
  {
    "question": "9/12彩彩🍓要solo出道!!粗卡!!!!請問主打歌歌名是？",
    "options": ["strawberry🍓", "blueberry🫐", "avocado🥑", "AVOCADO🥑","IN MY RooM"],
    "answer": "AVOCADO🥑",
    "correctMsg": ["答對了！真棒 👍", "太棒了！你答對了！"],
    "wrongMsg": ["請多多支持彩彩的AVOCADO!!!", "9/12請支持彩彩的AVOCADO！"],
    "extraNote": ["9/12! 9/12! 9/12!"]
  },
];

let currentQuestion = 0;
let score = 0;
let playerName = "";
let timer;
let questionTime = 10; 

// Sidebar
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const listItems = document.querySelectorAll("#songList li");

listItems.forEach(item => {
  item.addEventListener("click", () => {
    listItems.forEach(li => {
      const sub = li.querySelector(".subContent");
      if (sub && sub !== item.querySelector(".subContent")) {
        sub.style.display = "none";
      }
    });
    const sub = item.querySelector(".subContent");
    if (sub) {
      sub.style.display = sub.style.display === "block" ? "none" : "block";
    }
  });
});

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  mainContent.style.marginLeft = sidebar.classList.contains("show") ? "270px" : "20px";
});

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const quizContainer = document.getElementById("quizContainer");
const nameInputContainer = document.getElementById("nameInputContainer");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("playerName");

// 顯示倒數
const timerDisplay = document.createElement("div");
timerDisplay.id = "timerDisplay";
quizContainer.prepend(timerDisplay);

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

function startTimer(optionsDiv, q) {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = `剩餘時間：${timeLeft} 秒`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `剩餘時間：${timeLeft} 秒`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "時間到！";

      // 禁用按鈕
      const allButtons = optionsDiv.querySelectorAll("button");
      allButtons.forEach(b => b.disabled = true);

      // 顯示正確答案
      const feedbackDiv = document.getElementById("feedback");
      feedbackDiv.textContent = `⏰ 時間到！正確答案是：${q.answer}`;
      feedbackDiv.style.color = "orange";

      allButtons.forEach(b => {
        if (b.textContent === q.answer) {
          b.style.backgroundColor = "green";
        }
      });

      setTimeout(() => {
        currentQuestion++;
        loadQuestion();
      }, 3000);
    }
  }, 1000);
}

//進度條動物
const animals = ["🐰","🐶","🦝","🐹","🦄","🐧","🦅","🐯","🦌"];
let currentAnimalIndex = 0;


//載入問題與進度條更新
function loadQuestion() {
  clearInterval(timer);

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
        clearInterval(timer);
        checkAnswer(option, btn, optionsDiv);
      });
      optionsDiv.appendChild(btn);
    });

    quizDiv.appendChild(optionsDiv);

    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "feedback";
    quizDiv.appendChild(feedbackDiv);

    // 依照順序顯示小動物
    const progressAnimal = document.getElementById("progressAnimal");
    progressAnimal.textContent = animals[currentAnimalIndex % animals.length]; 
    currentAnimalIndex++; 

    // 進度條移動
    const progress = (currentQuestion / questions.length) * 100;
    progressAnimal.style.left = progress + "%";

    // 倒數條
    const timeBar = document.getElementById("timeBar");
    timeBar.style.transition = "none";
    timeBar.style.transform = "scaleX(0)";
    setTimeout(() => {
      timeBar.style.transition = `transform ${questionTime}s linear`;
      timeBar.style.transform = "scaleX(1)";
    }, 50);

    // ⏲️ 數字倒數
    let timeLeft = questionTime;
    const timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        autoFail(optionsDiv, q);
      }
    }, 1000);

  } else {
    endGame();
  }
}


// ⏰ 時間到，判定失敗
function autoFail(optionsDiv, q) {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.textContent = `⌛ 時間到！正確答案是：${q.answer}`;
  feedbackDiv.style.color = "red";

  const allButtons = optionsDiv.querySelectorAll("button");
  allButtons.forEach(b => {
    b.disabled = true;
    if (b.textContent === q.answer) {
      b.style.backgroundColor = "green";
    }
  });

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 3000);
}


//檢查答案
function checkAnswer(selected, clickedBtn, optionsDiv) {
  clearInterval(timer); // 停止倒數
  const q = questions[currentQuestion];
  const feedbackDiv = document.getElementById("feedback");

  const allButtons = optionsDiv.querySelectorAll("button");
  allButtons.forEach(b => b.disabled = true);

  if (selected === q.answer) {
    clickedBtn.style.backgroundColor = "green";
    score++;
    let msg = Array.isArray(q.correctMsg) ?
      q.correctMsg[Math.floor(Math.random() * q.correctMsg.length)] :
      q.correctMsg;
    feedbackDiv.textContent = `✅ ${msg}`;
    feedbackDiv.style.color = "green";
  } else {
    clickedBtn.style.backgroundColor = "red";
    let msg = Array.isArray(q.wrongMsg) ?
      q.wrongMsg[Math.floor(Math.random() * q.wrongMsg.length)] :
      q.wrongMsg;
    feedbackDiv.textContent = `❌ ${msg}   正確答案是：${q.answer}`;
    feedbackDiv.style.color = "red";

    const extraNote = document.createElement("div");
    extraNote.classList.add("extra-note");
    extraNote.textContent = q.extraNote;
    feedbackDiv.appendChild(extraNote);

    allButtons.forEach(b => {
      if (b.textContent === q.answer) {
        b.style.backgroundColor = "green";
      }
    });
  }

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 3000);
}


/*遊戲結束*/
function endGame() {
  clearInterval(timer); // 停止倒數
  currentAnimalIndex = 0; // 重置動物順序

  quizDiv.innerHTML = "";
  resultDiv.textContent = `遊戲結束！${playerName} 的分數是 ${score} / ${questions.length}`;

  // 重置進度條
  const progressAnimal = document.getElementById("progressAnimal");
  const timeBar = document.getElementById("timeBar");
  progressAnimal.style.left = "0%";
  progressAnimal.textContent = "";
  timeBar.style.transform = "scaleX(0)";

  // 3秒後回到暱稱輸入區
  setTimeout(() => {
    quizContainer.style.display = "none";
    nameInputContainer.style.display = "flex";
    nameInput.value = "";
    resultDiv.textContent = "";
    timerDisplay.textContent = "";
  }, 3000);
}

