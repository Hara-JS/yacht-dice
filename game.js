// 화면의 html이 loaded가 되었을 때 화면에서 필요한 데이터들을 생성함
window.onload = () => {
    gameJsInit();
};

/**
 * @description 화면이 로드 되었을 때 필요한 처리들
 */
const gameJsInit = () => {
    makeGameJsEvent();
    switchDisableBtn();
};

/**
 * @description 본 화면에서 필요한 전역변수를 담아두는 객체.<br>
 * object(json)에 담아두는 이유는, 한 html/jsp에서 다수의 js 파일을 읽어들일 때<br>
 * 전역변수의 변수명이 겹쳐서 발생하는 오류를 최소화하기 위함
 * @property {number} count 주사위를 굴린 횟수
 * @property {number} player 지금 턴을 진행중인 사용자
 */
const gameJsObj = {
    count: 0,
    player: 1
}

/**
 * @description 버튼 이벤트 생성
 */
const makeGameJsEvent = () => {
    // [주사위 굴림] 버튼의 이벤트
    const diceRollBtn = document.getElementById("diceRoll");
    diceRollBtn.addEventListener("click", () => {
        gameJsObj.count++;
        const diceDiv = document.getElementsByClassName("diceBtn1");

        for (let i = 0; i < diceDiv.length; i++) {
            const targetDiv = diceDiv[i];
            const diceBtn3 = document.getElementsByClassName("diceBtn3")[i.toString()].value;

            if (diceBtn3 !== null && diceBtn3 !== undefined && diceBtn3 === "") {
                targetDiv.value = Math.floor(Math.random() * 6) + 1;
            }
        }
        if(gameJsObj.count > 2) {
            diceRollBtn.disabled = true;
        }
    });
    // [주사위 굴림] 버튼의 이벤트 end
    
    // [keep/recovery] 버튼의 이벤트
    // 각 주사위 영역 밑에 버튼을 동적으로 생성하기 위하여 hmtl의 class 명칭을 부여하고
    // class 명칭을 이용하여 해당 html 요소를 모두 가져오고, 그 요소들에게 EventListener 부여
    const keepBtnList = document.getElementsByClassName("diceBtn2");
    for (let i = 0; i < keepBtnList.length; i++) {
        const keepBtn = keepBtnList[i];
        keepBtn.addEventListener("click", (event) => {
            let moveFrom;
            let moveTo;
            const divIndex = event.target.id;
            
            switch(keepBtnList[divIndex].value) {
                case "keep":
                    moveFrom = document.getElementsByClassName("diceBtn1")[divIndex];
                    moveTo = document.getElementsByClassName("diceBtn3")[divIndex];
                    keepBtnList[divIndex].value = "recovery";
                    break;
                case "recovery":
                    moveFrom = document.getElementsByClassName("diceBtn3")[divIndex];
                    moveTo = document.getElementsByClassName("diceBtn1")[divIndex];
                    keepBtnList[divIndex].value = "keep";
                    break;
            }

            const value = moveFrom.value;
            moveTo.value = value;
            moveFrom.value = "";
        });
    }
    // [keep/recovery] 버튼의 이벤트 end

    // 각 점수 할당 버튼의 이벤트
    // 사용자별 점수 할당 버튼을 동적으로 생성하기 위하여 html의 name을 부여하고
    // name을 이용하여 해당 html 요소를 모두 가져오고, 그 요소들에게 EventListener 부여
    const acesCalc = document.getElementsByName("acesCalc");
    for(let i = 0; i < acesCalc.length; i++) {
        acesCalc[i].addEventListener("click", (event) => {
            calcFn("AcesCalc", event);
        })
    }

    const twosCalc = document.getElementsByName("twosCalc");
    for(let i = 0; i < twosCalc.length; i++) {
        twosCalc[i].addEventListener("click", (event) => {
            calcFn("TwosCalc", event);
        })
    }

    const threesCalc = document.getElementsByName("threesCalc");
    for(let i = 0; i < threesCalc.length; i++) {
        threesCalc[i].addEventListener("click", (event) => {
            calcFn("ThreesCalc", event);
        })
    }

    const foursCalc = document.getElementsByName("foursCalc");
    for(let i = 0; i < foursCalc.length; i++) {
        foursCalc[i].addEventListener("click", (event) => {
            calcFn("FoursCalc", event);
        })
    }

    const fivesCalc = document.getElementsByName("fivesCalc");
    for(let i = 0; i < fivesCalc.length; i++) {
        fivesCalc[i].addEventListener("click", (event) => {
            calcFn("FivesCalc", event);
        })
    }

    const sixesCalc = document.getElementsByName("sixesCalc");
    for(let i = 0; i < sixesCalc.length; i++) {
        sixesCalc[i].addEventListener("click", (event) => {
            calcFn("SixesCalc", event);
        })
    }

    const choiceCalc = document.getElementsByName("choiceCalc");
    for(let i = 0; i < choiceCalc.length; i++) {
        choiceCalc[i].addEventListener("click", (event) => {
            calcFn("Choice", event);
        })
    }

    const fourOfAKindCalc = document.getElementsByName("fourOfAKindCalc");
    for(let i = 0; i < fourOfAKindCalc.length; i++) {
        fourOfAKindCalc[i].addEventListener("click", (event) => {
            calcFn("fourOfAKind", event);
        })
    }

    const fullHouseCalc = document.getElementsByName("fullHouseCalc");
    for(let i = 0; i < fullHouseCalc.length; i++) {
        fullHouseCalc[i].addEventListener("click", (event) => {
            calcFn("fullHouse", event);
        })
    }

    const smallStraightCalc = document.getElementsByName("smallStraightCalc");
    for(let i = 0; i < smallStraightCalc.length; i++) {
        smallStraightCalc[i].addEventListener("click", (event) => {
            calcFn("smallStraight", event);
        })
    }

    const largeStraightCalc = document.getElementsByName("largeStraightCalc");
    for(let i = 0; i < largeStraightCalc.length; i++) {
        largeStraightCalc[i].addEventListener("click", (event) => {
            calcFn("largeStraight", event);
        })
    }

    const yachtCalc = document.getElementsByName("yachtCalc");
    for(let i = 0; i < yachtCalc.length; i++) {
        yachtCalc[i].addEventListener("click", (event) => {
            calcFn("yacht", event);
        })
    }
    };
    // 각 점수 할당 버튼의 이벤트 end

    /**
     * @description 주사위 눈을 표시하는 영역 및 관련 버튼을 초기화<br>
     * (주사위 눈 표시부는 공란. keep/recovery 버튼의 명칭(value)은 keep. [주사위 굴림] 버튼은 활성화)
     */
    const clearDiceDiv = () => {
        // [주사위 굴림] 버튼
        const diceRollBtn = document.getElementById("diceRoll");
        diceRollBtn.disabled = false;

        // keep 한 주사위
        const diceBtn3 = document.getElementsByClassName("diceBtn3");
        for(let i = 0; i < diceBtn3.length; i++) {
            diceBtn3[i].value = "";
        }

        // [keep/recovery] 버튼
        const diceBtn2 = document.getElementsByClassName("diceBtn2");
        for(let i = 0; i < diceBtn2.length; i++) {
            diceBtn2[i].value = "keep";
        }
    }

    /**
     * @description 모든 주사위를 keep 영역으로 이동시킴
     */
    const moveAllDown = () => {
        // 주사위 영역 (주사위 위쪽 줄)
        const diceDiv = document.getElementsByClassName("diceBtn1");
        
        for (let i = 0; i < diceDiv.length; i++) {
            const targetDiv = diceDiv[i];
            const diceBtn3 = document.getElementsByClassName("diceBtn3")[i.toString()];
            
            if (diceBtn3.value !== null && diceBtn3.value !== undefined && diceBtn3.value === "") {
                diceBtn3.value = targetDiv.value;
                targetDiv.value = "";
            }
        }
    }

    /**
     * 
     * @description keep 영역의 공백 유무 확인<br>
     * 빈 칸이 아닌 keep 영역의 주사위 칸 수와 keep 영역의 모든 주사위 칸의 수를 비교
     * @returns {boolean} 빈 칸 유무<br>
     *  - true : 빈 칸 없음
     *  - false : 빈 칸 있음
     */
    const checkEmptySpace = () => {
        const diceBtn3 = document.getElementsByClassName("diceBtn3");
        return [...diceBtn3].filter(x => x.value !== null && x.value !== undefined && x.value !== "").length === diceBtn3.length;
    }

    /**
     * @description 주사위 정보를 토대로 족보에 점수를 부여하는 로직.<br>
     * 족보에 점수를 부여하고 -> 해당 족보에 점수를 부여하는 버튼 비활성 -> 주사위 영역 초기화 -> 사용자 차례 변경 등 로직 수행
     * @param {string} scoreName 해당하는 족보의 html element의 id
     * @param {MouseEvent} event 발생한 클릭 이벤트 객체
     * @returns 
     */
    const calcFn = (scoreName, event) => {
        moveAllDown();
        if(checkEmptySpace() === false) {
            alert("주사위를 반드시 굴려주세요.");
            return;
        }

        switch(scoreName) {            
            case "AcesCalc": calcAcesToSixesFn(1); break;
            case "TwosCalc": calcAcesToSixesFn(2); break;
            case "ThreesCalc": calcAcesToSixesFn(3); break;
            case "FoursCalc": calcAcesToSixesFn(4); break;
            case "FivesCalc": calcAcesToSixesFn(5); break;
            case "SixesCalc": calcAcesToSixesFn(6); break;
            case "Choice": choiceCalcFn(); break;
            case "fourOfAKind": fourOfAKindCalcFn(); break;
            case "fullHouse": fullHouseCalcFn(); break;
            case "smallStraight": straightCalFn(3); break;
            case "largeStraight": straightCalFn(4); break;
            case "yacht": yachtCalcFn(); break;
        }

        event.target.disabled = true;
        calcTotalScore();
        clearDiceDiv();
        switchPlayer();
        switchDisableBtn();
        compareTotalScore();
    }

    /**
     * @description 상단 점수 / 보너스 점수 / 총 점수를 계산하여 화면에 표시
     */
    const calcTotalScore = () => {
        const acesPoint  = document.getElementById("player" + gameJsObj.player + "Aces").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Aces").value);
        const twosPoint  = document.getElementById("player" + gameJsObj.player + "Twos").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Twos").value);
        const threesPoint  = document.getElementById("player" + gameJsObj.player + "Threes").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Threes").value);
        const foursPoint  = document.getElementById("player" + gameJsObj.player + "Fours").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Fours").value);
        const fivesPoint  = document.getElementById("player" + gameJsObj.player + "Fives").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Fives").value);
        const sixesPoint  = document.getElementById("player" + gameJsObj.player + "Sixes").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Sixes").value);
        const choicePoint  = document.getElementById("player" + gameJsObj.player + "Choice").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "Choice").value);
        const fourOfAKindPoint  = document.getElementById("player" + gameJsObj.player + "fourOfAKind").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "fourOfAKind").value);
        const fullHousePoint  = document.getElementById("player" + gameJsObj.player + "fullHouse").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "fullHouse").value);
        const smallStraightPoint  = document.getElementById("player" + gameJsObj.player + "smallStraight").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "smallStraight").value);
        const largeStraightPoint  = document.getElementById("player" + gameJsObj.player + "largeStraight").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "largeStraight").value);
        const yachtPoint  = document.getElementById("player" + gameJsObj.player + "yacht").value === "" ? 0 : Number.parseInt(document.getElementById("player" + gameJsObj.player + "yacht").value);

        const topTotal = acesPoint + twosPoint + threesPoint + foursPoint + fivesPoint + sixesPoint;
        const bonusScore = topTotal >= 63 ? 35 : 0;
        const totalScore = topTotal + bonusScore + choicePoint + fourOfAKindPoint + fullHousePoint + smallStraightPoint + largeStraightPoint + yachtPoint;

        document.getElementById("player" + gameJsObj.player + "TopScore").value = topTotal;
        document.getElementById("player" + gameJsObj.player + "Bonus").value = bonusScore;
        document.getElementById("player" + gameJsObj.player + "TotalScore").value = totalScore;
    }

    /**
     * @description 현재 턴 사용자 변경
     */
    const switchPlayer = () => {
        switch(gameJsObj.player) {
            case 1:
                gameJsObj.player = 2;
                break;
            case 2:
                gameJsObj.player = 1;
                break;
        }
        gameJsObj.count = 0;
    }

    /**
     * @description 족보 점수 할당 버튼 활성/비활성 처리<br>
     * 자신의 턴이 아님 : 모든 버튼 비활성<br>
     * 자신의 턴 : 아직 점수가 부여되지 않은 족보만 활성. 나머지는 비활성
     */
    const switchDisableBtn = () => {
        // 추후 사용자의 수를 동적으로 변동 가능하게 할 예정이기 때문에 반복문을 이용하여 유연하게 제어를 함
        for(let i = 1; i <= 2; i++) {
            const isDisable = i !== gameJsObj.player;
            document.getElementById("player" + i + "AcesBtn").disabled = isDisable || document.getElementById("player" + i + "Aces").value !== "";
            document.getElementById("player" + i + "TwosBtn").disabled = isDisable || document.getElementById("player" + i + "Twos").value !== "";
            document.getElementById("player" + i + "ThreesBtn").disabled = isDisable || document.getElementById("player" + i + "Threes").value !== "";
            document.getElementById("player" + i + "FoursBtn").disabled = isDisable || document.getElementById("player" + i + "Fours").value !== "";
            document.getElementById("player" + i + "FivesBtn").disabled = isDisable || document.getElementById("player" + i + "Fives").value !== "";
            document.getElementById("player" + i + "SixesBtn").disabled = isDisable || document.getElementById("player" + i + "Sixes").value !== "";
            document.getElementById("player" + i + "ChoiceBtn").disabled = isDisable || document.getElementById("player" + i + "Choice").value !== "";
            document.getElementById("player" + i + "fourOfAKindBtn").disabled = isDisable || document.getElementById("player" + i + "fourOfAKind").value !== "";
            document.getElementById("player" + i + "fullHouseBtn").disabled = isDisable || document.getElementById("player" + i + "fullHouse").value !== "";
            document.getElementById("player" + i + "smallStraightBtn").disabled = isDisable || document.getElementById("player" + i + "smallStraight").value !== "";
            document.getElementById("player" + i + "largeStraightBtn").disabled = isDisable || document.getElementById("player" + i + "largeStraight").value !== "";
            document.getElementById("player" + i + "yachtBtn").disabled = isDisable || document.getElementById("player" + i + "yacht").value !== "";
        }
    }

    /**
     * @description 상위 점수표에 족보를 계산하여 화면에 표시
     * @param {number} number 족보에 해당하는 숫자<br>
     *  - 1 : Aces<br>
     *  - 2 : Twos<br>
     *  - 3 : Threes<br>
     *  - 4 : Fours<br>
     *  - 5 : Fives<br>
     *  - 6 : Sixes<br>
     */
    const calcAcesToSixesFn = (number) => {
        let divName = "";
        switch(number) {
            case 1: divName = "Aces"; break;
            case 2: divName = "Twos"; break;
            case 3: divName = "Threes"; break;
            case 4: divName = "Fours"; break;
            case 5: divName = "Fives"; break;
            case 6: divName = "Sixes"; break;
        }

    const targetDiv = document.getElementById("player" + gameJsObj.player + divName);
        const finalDiceDiv = document.getElementsByClassName("diceBtn3");
        let score = 0;
        for(let i = 0; i < finalDiceDiv.length; i++) {
            if(Number.parseInt(finalDiceDiv[i].value) === number) {
                score += number;
            }
        }
        targetDiv.value = score;
    }

    /**
     * @description Choice 족보의 점수를 계산하여 화면에 표시
     */
    const choiceCalcFn = () => {
        const targetDiv = document.getElementById("player" + gameJsObj.player + "Choice");
        const finalDiceDiv = document.getElementsByClassName("diceBtn3");
        let score = 0;
        for(let i = 0; i < finalDiceDiv.length; i++) {
            score += Number.parseInt(finalDiceDiv[i].value);
        }
        targetDiv.value = score;
    }

    /**
     * @description Four Of a kind 족보의 점수를 계산하여 화면에 표시
     */
    const fourOfAKindCalcFn = () => {
        const targetDiv = document.getElementById("player" + gameJsObj.player + "fourOfAKind");
        const finalDiceDiv = document.getElementsByClassName("diceBtn3");
        let score = 0;
        let sameDice = 0;
        let sameDiceCnt = 0;
        for(let i = 1; i <= 6; i++) {
            if([...finalDiceDiv].filter(x => Number.parseInt(x.value) === i).length >= 4) {
                sameDice = i;
                sameDiceCnt = [...finalDiceDiv].filter(x => Number.parseInt(x.value) === i).length;
                break;
            }
        }
        score += sameDiceCnt * sameDice;
        targetDiv.value = score;
    }

    /**
     * @description Full House 족보의 점수를 계산하여 화면에 표시
     */
    const fullHouseCalcFn = () => {
        const targetDiv = document.getElementById("player" + gameJsObj.player + "fullHouse");
        const finalDiceDiv = document.getElementsByClassName("diceBtn3");
        let score = 0;
        let isSameThree = false;
        let isSameTwo = false;
        for(let i = 1; i <= 6; i++) {
            if([...finalDiceDiv].filter(x => Number.parseInt(x.value) === i).length === 3) {
                isSameThree = true;
            }
            if([...finalDiceDiv].filter(x => Number.parseInt(x.value) === i).length === 2) {
                isSameTwo = true;
            }
        }    
        if(isSameThree === true && isSameTwo === true){
            for(let i = 0; i < finalDiceDiv.length; i++) {
                score += Number.parseInt(finalDiceDiv[i].value);
            }
        }
        targetDiv.value = score;
    }

    /**
     * @description Small Straight / Large Straight 족보의 점수를 계산하여 화면에 표시
     * @param {number} number small/large를 판단할 변수<br>
     *  - small : 3<br>
     *  - large : 4
     */
    const straightCalFn = (number) => {
        const divName = number === 3 ? "smallStraight" : "largeStraight";
        const targetDiv = document.getElementById("player" + gameJsObj.player + divName);
        let score = 0;
        let straightCnt = 0;
        const sortedArr = [...document.getElementsByClassName("diceBtn3")].sort((a, b) => a.value - b.value);
        for(let i = 0; i < sortedArr.length - 1; i++) {
            if(Number.parseInt(sortedArr[i].value) + 1 === Number.parseInt(sortedArr[i + 1].value)) {
                straightCnt++;
            }
        }
        if(straightCnt >= number) {
            score = number === 3 ? 15 : 30;
        }
        targetDiv.value = score;
    }

    /**
     * @description Yacht 족보의 점수를 계산하여 화면에 표시
     */
    const yachtCalcFn = () => {
        const targetDiv = document.getElementById("player" + gameJsObj.player + "yacht");
        let score = 0;
        let yachtCnt = 0;
        let isYacht = true ;
        const finalDiceDiv = document.getElementsByClassName("diceBtn3");
        for(let i = 0; i < finalDiceDiv.length - 1 && isYacht === true; i++) {
            isYacht = finalDiceDiv[i].value !== "" && isYacht && (finalDiceDiv[i].value === finalDiceDiv[i + 1].value)
            if(finalDiceDiv[i].value === finalDiceDiv[i + 1].value) {
                yachtCnt++;
            }
        }
        if(yachtCnt === 4) {
            score = 50;
        }
        targetDiv.value = score;
    }

    const compareTotalScore = () => {
        const scoreDiv = document.getElementsByClassName("totalScore");
        let isNotFulled = false;
        for(let i = 0; i < scoreDiv.length; i++) {
            if(scoreDiv[i].value === "") {
                isNotFulled = true;
            }
        }
        if(!isNotFulled) {
            if(Number.parseInt(document.getElementById("player1TotalScore").value) > Number.parseInt(document.getElementById("player2TotalScore").value)) {
                alert("Player 1 우승");
            } else if (Number.parseInt(document.getElementById("player1TotalScore").value) < Number.parseInt(document.getElementById("player2TotalScore").value)) {
                alert("Player 2 우승");
            } else {
                alert("무승부");
            }
        }
    }