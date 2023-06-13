const right_answer = "DREAM";

let index = 0;
let attempts = 0;
let timer;
let animatedBlocks = [];

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      " display:flex; justify-contents:center; align-items:center; position:absolute; top:40vh; left:38%; background-color: white; width: 200px; height: 100px";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let right_counts = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const input_letter = block.innerText;
      const rightAnswer_letter = right_answer[i];
      if (input_letter === rightAnswer_letter) {
        right_counts += 1;
        block.style.background = "#6AAA64";
        animatedBlocks.push(block); // 위치와 해당 알파벳 정답인것만 애니매이션 효과 주기...
      } else if (right_answer.includes(input_letter)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (right_counts === 5) {
      gameover();
    } else {
      nextLine();
      animateBlocks(animatedBlocks);
    }
  };

  const animateBlocks = () => {
    animatedBlocks.forEach((block) => {
      block.classList.add("animated"); // 애니메이션 클래스 추가
      block.addEventListener("animationend", removeAnimationClass);
    });
  };

  const removeAnimationClass = (event) => {
    event.target.classList.remove("animated"); // 애니메이션 클래스 제거
    event.target.removeEventListener("animationend", removeAnimationClass);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
        animateBlocks(); // 입력 완료 후 애니메이션 효과 적용
        animatedBlocks = []; // 애니메이션 효과 대상 초기화
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const time = document.querySelector(".timer");
      time.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
