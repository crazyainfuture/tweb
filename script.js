const questions = [
  {//1easy
    "question": "Twice (韓專、大隊)新歌是哪一首？",
    "options": ["SET ME FREE", "Talk that Talk", "THIS IS FOR", "Strategy (feat. Megan Thee Stallion)"],
    "answer": "THIS IS FOR",
    "correctMsg": ["FANCY!"],
    "wrongMsg": ["You're in trouble trouble~", "TT"],
    "extraNote": ["請重看mv 20151020遍"]
  },
  {//2easy
    "question": "Twice 的吉祥物/娃娃叫什麼名字?",
    "options": ["LOVELY", "CANDYBONG", "CANDYBONG Z", "CANDYBONG ∞"],
    "answer": "LOVELY",
    "correctMsg": ["答對了! 是LOVELY喔~", "正確!"],
    "wrongMsg": ["LOVELY很可愛ㄟ", "CANDYBONG是應援棒啦!"],
    "extraNote": ["BDZ的mv裡有LOVELY 很可愛 快去看看!"]
  },
  {//3easy 1
    "question": "娜璉最新solo舞台的歌名是?",
    "options": ["Meeeeee", "MEEEEEE", "meeeeee", "ABCD"],
    "answer": "MEEEEEE",
    "correctMsg": ["正確!看來你有你的strategy喔!", "答對了! wanna MORE & MORE?"],
    "wrongMsg": ["是不是還沒練應援趕快去!!!","真的alcohol...free?","SOS"],
    "extraNote": [""]
  },
  {//4medium  7 9
    "question": "在TTT YES or NO 其中一集，子瑜對鏡頭撒嬌擄獲姐姐們的心，誰深深忌妒了?",
    "options": ["多賢", "志效", "彩瑛", "Mina"],
    "answer": "多賢",
    "correctMsg": ["跟我一樣是每周五下午5:00都在等TTT的人ㄟ", "有認真看TTT喔!"],
    "wrongMsg": ["這系列都很好笑快去看!"],
    "extraNote": ["出自TIME TO TWICE - YES or NO 系列"]
  },
  {//5medium  
    "question": "在TTT THE GREAT ESCAPE這系列中，Twice 為了避免殭屍靠近所唱的驅魔神曲是?",
    "options": ["What is Love? ", "Heart Shaker", "Dance the Night Away", "YES or YES"],
    "answer": "Dance the Night Away",
    "correctMsg": ["跟我一樣是每周五下午5:00都在等TTT的人ㄟ", "有認真看TTT喔!"],
    "wrongMsg": ["TTT很有趣快去看!"],
    "extraNote": ["出自TIME TO TWICE - THE GREAT ESCAPE 系列"]
  },
  {//6hard 4 5
    "question": "以下哪個不是Sana曾經說過的話/歌詞?",
    "options": ["sha sha sha", "Cheese Kimbap(起司飯捲)", "mina呀~ 我們得獎了!", "當你身處困境時，一定要記住，有九個人希望你幸福"],
    "answer": "當你身處困境時，一定要記住，有九個人希望你幸福",
    "correctMsg": ["好巧 我也是NO SANA NO LIFE的人", "Yeah~ incredible!"],
    "wrongMsg": ["志效這句也讓我心裡暖暖的"],
    "extraNote": [""]
  },
  
  {//7hard 2 3
    "question": "在四巡演唱會中，唱到knock knock時，定延突然忘記站位，是誰的引導而找到正確的站位?",
    "options": ["子瑜", "Momo", "志效", "Mina"],
    "answer": "Momo",
    "correctMsg": ["是的!剛好歌詞是'take my hands'", "正確!最好的室友line!!"],
    "wrongMsg": [""],
    "extraNote": [""]
  },
  {//8hard 6
    "question": "誰在隊內最愛偷看👀?",
    "options": ["定延", "sana", "娜璉", "Mina"],
    "answer": "Mina",
    "correctMsg": ["答對了! 觀察得很仔細喔~👀👀", "Yeah ㅋㅋ"],
    "wrongMsg": ["沒想到吧", "他只是犯了每個南人都會犯的錯而已"],
    "extraNote": ["南擔好友私心出題"]
  },
  {//9medium 但這題要放最後 8
    "question": "9/12彩彩🍓要solo出道!!粗卡!!!!請問主打歌歌名是？",
    "options": ["strawberry🍓", "blueberry🫐", "Shoot(Firecracker)", "AVOCADO🥑","IN MY ROOM"],
    "answer": "Shoot(Firecracker)",
    "correctMsg": ["答對了! 請多多支持彩彩的Shoot!!!", "9/12請支持彩彩的Shoot！"],
    "wrongMsg": ["請多多支持彩彩的Shoot!!!", "9/12請支持彩彩的Shoot！"],
    "extraNote": ["9/12! 9/12! 9/12!"]
  }
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
  }, 5000);
}


/*遊戲結束*/
function endGame() {
  clearInterval(timer); // 停止倒數
  timerDisplay.textContent = "";
  
  currentAnimalIndex = 0; // 重置動物順序

  quizDiv.innerHTML = "";

  resultDiv.innerHTML = `
    遊戲結束🎉！${playerName} 的分數是 ${score} / ${questions.length}
    <p>11/22 11/23 THIS IS FOR 高雄場見!!</p>
    <p>不管是MOONLIGHT SUNRISE都要想著TWICE喔💖!</p>
  `;


  // 重置進度條
  const progressTrack = document.querySelector(".progress-track");
  if (progressTrack) progressTrack.style.display = "none";

  // 回到暱稱輸入區
  setTimeout(() => {
    quizContainer.style.display = "none";
    nameInputContainer.style.display = "flex";
    nameInput.value = "";
    resultDiv.textContent = "";

    // 遊戲重新開始時再顯示
    if (progressTrack) progressTrack.style.display = "block";
  }, 10000);
}

/*彈跳視窗*/
window.onload = function() {
  const modal = document.getElementById("welcomeModal");
  const startBtns = document.querySelectorAll(".startGameBtn");

  startBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "none"; // 關閉彈窗
    });
  });
};

//倒數距離天數
// 存放所有倒數事件
const countdownEvents = [];

// 新增倒數事件
function addCountdownCard(title, targetDate) {
  countdownEvents.push({ title, targetDate });
  renderCountdownCards();
}

// 渲染卡片（會排序）
function renderCountdownCards() {
  const container = document.querySelector(".countdown-cards");
  container.innerHTML = ""; 

  
  countdownEvents.sort((a, b) => a.targetDate - b.targetDate);

  countdownEvents.forEach(event => {
    const card = document.createElement("div");
    card.className = "countdown-card";

    const h4 = document.createElement("h4");
    h4.textContent = event.title;

    const p = document.createElement("p");
    card.appendChild(h4);
    card.appendChild(p);

    container.appendChild(card);

    // 更新倒數天數
    function updateCountdown() {
      const now = new Date();
      const diff = Math.ceil((event.targetDate - now) / (1000 * 60 * 60 * 24));
      if (diff >= 0) {
        p.textContent = `還有 ${diff} 天`;
      } else {
        p.textContent = "已經開始啦 🎉";
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 60 * 60 * 1000); 
  });
}


addCountdownCard("彩彩solo", new Date("2025-09-12"));
addCountdownCard("高雄場", new Date("2025-11-22"));


