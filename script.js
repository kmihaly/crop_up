'use strict'

function welcome() {
    let szoveg = document.getElementById('welcomeDivID');
    szoveg.parentNode.removeChild(szoveg);
}

function controlOn() {
    document.getElementById("controlpanel").style.display = "block";
}

// timer code


let rank = 'Nobody';

let min;
let sec = 11;

function countdown() {
    let timeToDisplay = setInterval(cdowncode, 1000);

    function cdowncode() {
        if (min === 0 && sec === 0) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
            clearInterval(timeToDisplay);
            alert("The time is over. Congratulation for finishing the game. In your bank account you've managed to collect " + record + " GKT. Your rank is " + rank + ".");
            location.reload();
        }

        if (min > 9 && sec > 9) {
            document.getElementById("timernumber").innerHTML = min + " : " + sec;
        }
        if (min > 9 && sec < 10) {
            document.getElementById("timernumber").innerHTML = min + " : " + "0" + sec;
        }
        if (min < 10 && sec > 9) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + sec;
        }
        if (min < 10 && sec < 10) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
        }
        if (min < 1 && sec < 10) {
            document.getElementById("timer").classList.add("timerBackgroundAnimation");
            //      document.getElementById("timertext").classList.add("timerTextColorAnimation");
            //    document.getElementById("timernumber").classList.add("timerTextColorAnimation");
        }
        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }
    }
}

function showTime() {
    min = Number(document.getElementById('gametime').value);
}

let bankAccount = 1499;

let previousFieldName = "";
let cellInfo = [];

let fieldNumber = 1;

function createId() {
    let fieldId = "Field_" + fieldNumber;
    ++fieldNumber;
    return fieldId;
}

let cellsNumber = document.getElementById('table25').getElementsByTagName("TD");

function FieldInfo_obj(p_fieldId, p_state) {
    this.marker = p_fieldId;
    this.state = p_state;
}

function createIdAttribute() {
    let i = 0;
    while (i < cellsNumber.length) {
        let addId = document.createAttribute("ID");
        cellsNumber[i].setAttributeNode(addId);
        addId.value = createId();
        let objectField = new FieldInfo_obj(addId.value, "empty");
        cellInfo.push(objectField);
        i++;
    }
}

let record = 100;

function showMoney() {
    if (bankAccount > record) {
        record = bankAccount;
        if (record > 200) {
            rank = "Newbie";
        }
        if (record > 400) {
            rank = "Honourable Peasant";
        }
        if (record > 600) {
            rank = "Mighty Merchant";
        }
        if (record > 1000) {
            rank = "Dainty Dealer";
        }
        if (record > 2500) {
            rank = "Ruler of the Underworld";
        }
        if (record > 10000) {
            rank = "Briliant Borgia";
        }
    }
    document.getElementById("account").innerHTML = bankAccount;
}

function err() {
    // alert("You have run out of money and lost the game. Nice work, moron.");
    alert("I've told you to keep your eye on your money, ehh?");
}

let currentFieldId = "Field_1";

function addingListener() {
    let i;
    for (i = 0; i < cellsNumber.length; i++) {
        cellsNumber[i].addEventListener("click", function () {
            currentFieldId = this.id;
            selectField(currentFieldId);
        }, false);
        cellsNumber[i].classList.add("cursor");
    }
}

function selectField(p_fieldId) {

    if (previousFieldName != "") {
        deSelectField(previousFieldName);
    }
    let selectThisField = document.getElementById(p_fieldId);
    selectThisField.classList.add("fieldBorder");
    selectThisField.style.width = "96px";
    selectThisField.style.height = "96px";
    currentFieldId = p_fieldId;
    previousFieldName = p_fieldId;
}

function deSelectField(p_fieldName) {
    let selectThisField = document.getElementById(p_fieldName);
    selectThisField.style.width = "100px";
    selectThisField.style.height = "100px";
    selectThisField.classList.remove("fieldBorder");
}

function makingIdToMarker(p_currentFieldId) {
    let idToMarker = Number(p_currentFieldId.slice(6, 8));
    idToMarker--;
    return idToMarker;
}

function newField(p_currentFieldId) {
    if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'empty') {
        // pénz ellenőrzése 
        if (bankAccount >= 20) {
            // levonása
            bankAccount = bankAccount - 20;
            //ha megvan, kiiratjuk
            showMoney();
            // állapotot elmentjük a objektumba és a képét kicseréljük
            makeItGrass(p_currentFieldId);
            //megjelenítjük az első növényt
            document.getElementById("pppWheat").style.display = "table-row";
            //megnézzük mit vethetünk
            developField();
        } else {
            err();
        }
    } else {
        alert("You have already bought this field.");
    }
}

function makeItGrass(p_currentFieldId) {
    document.getElementById(p_currentFieldId).style.backgroundImage = "url('Pictures/grass_texture.jpg')";
    cellInfo[makingIdToMarker(p_currentFieldId)].state = "grass";
}

function developField() {
    document.getElementById("displayButton").style.display = "block";
    document.getElementById("seed").style.display = "block";
    if (bankAccount > 100) {
        document.getElementById("displayOptionPotato").style.display = "block";
        document.getElementById("pppPotato").style.display = "table-row";
    }
    if (bankAccount > 140) {
        document.getElementById("displayOptionCorn").style.display = "block";
        document.getElementById("pppCorn").style.display = "table-row";
    }
    if (bankAccount > 180) {
        document.getElementById("displayOptionTomato").style.display = "block";
        document.getElementById("pppTomato").style.display = "table-row";
    }
    if (bankAccount > 250) {
        document.getElementById("displayOptionMarijuana").style.display = "block";
        document.getElementById("pppMarijuana").style.display = "table-row";
    }
    if (bankAccount > 500) {
        document.getElementById("displayOptionPoppy").style.display = "block";
        document.getElementById("pppPoppy").style.display = "table-row";
    }
    if (bankAccount > 1500) {
        document.getElementById("displayAutomation").style.display = "block";
        document.getElementById("displayStopAutomation").style.display = "block";
    }
}

let subtrahend;
function subtrahendCalculation(p_seedName) {
    if (p_seedName === "wheat") { subtrahend = plantInfo[0].sowingCost };
    if (p_seedName === "potato") { subtrahend = plantInfo[1].sowingCost; };
    if (p_seedName === "corn") { subtrahend = plantInfo[2].sowingCost; };
    if (p_seedName === "tomato") { subtrahend = plantInfo[3].sowingCost; };
    if (p_seedName === "marijuana") { subtrahend = plantInfo[4].sowingCost; };
    if (p_seedName === "poppy") { subtrahend = plantInfo[5].sowingCost; };
}

function makeItPlant(p_seedName, p_fieldId) {
    if (p_seedName === "wheat") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[0].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'wheat';
    };
    if (p_seedName === "potato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[1].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'potato';
    };
    if (p_seedName === "corn") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[2].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'corn';
    };
    if (p_seedName === "tomato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[3].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'tomato';
    };
    if (p_seedName === "marijuana") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[4].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'marijuana';
    };
    if (p_seedName === "poppy") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[5].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'poppy';
    };
}

function makeItGrowingPlant(p_seedName, p_fieldId) {

    document.getElementById("displayHarvest").style.display = "block";
    if (p_seedName === "wheat") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[0].growingPic;
    };
    if (p_seedName === "potato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[1].growingPic;
    };
    if (p_seedName === "corn") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[2].growingPic;
    };
    if (p_seedName === "tomato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[3].growingPic;
    };
    if (p_seedName === "marijuana") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[4].growingPic;
    };
    if (p_seedName === "poppy") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[5].growingPic;
    };
    cellInfo[makingIdToMarker(p_fieldId)].state = 'growing';
    document.getElementById(p_fieldId).style.backgroundImage += ", " + "url('Pictures/grass_texture.jpg')";
    document.getElementById(p_fieldId).classList.add("growingCropAnimation");
}

function sowSomething(p_seedName, p_fieldId) {
    if (cellInfo[makingIdToMarker(p_fieldId)].state === "grass") {
        subtrahendCalculation(p_seedName);
        if (subtrahend <= bankAccount) {
            bankAccount = bankAccount - subtrahend;
            showMoney();
            makeItGrowingPlant(p_seedName, p_fieldId);
            setTimeout(
                function () {
                    document.getElementById(p_fieldId).classList.remove("growingCropAnimation");
                    makeItPlant(p_seedName, p_fieldId);
                },
                waitingTime(p_seedName));
        } else {
            err();
        }
    } else {
        alert("Choose an irrigated field or buy and irrigate a new one.");
    }
}

function waitingTime(p_seedName) {
    let ripeTime;
    if (p_seedName === "wheat") {
        ripeTime = plantInfo[0].ripeningTime;
    }
    if (p_seedName === "potato") {
        ripeTime = plantInfo[1].ripeningTime;
    }
    if (p_seedName === "corn") {
        ripeTime = plantInfo[2].ripeningTime;
    }
    if (p_seedName === "tomato") {
        ripeTime = plantInfo[3].ripeningTime;
    }
    if (p_seedName === "marijuana") {
        ripeTime = plantInfo[4].ripeningTime;
    }
    if (p_seedName === "poppy") {
        ripeTime = plantInfo[5].ripeningTime;
    }
    return (ripeTime);
}

function PlantInfo_obj(p_name, p_growingPic, p_pic, p_animation, p_sowingCost, p_harvestingIncome, p_ripeningTime) {
    this.name = p_name;
    this.growingPic = p_growingPic;
    this.pic = p_pic;
    this.animation = p_animation;
    this.sowingCost = p_sowingCost;
    this.harvestingIncome = p_harvestingIncome;
    this.ripeningTime = p_ripeningTime;
}

let plantInfo = [];

function createPlants() {
    let objectPlant;
    objectPlant = new PlantInfo_obj("wheat", "url('\Pictures/growing_wheat.png')", "url('\Pictures/wheat.jpg')", "notyet", 5, 10, 10000, );
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("potato", "url('\Pictures/growing_potato.png')", "url('\Pictures/potato.jpg')", "notyet", 8, 16, 13000, );
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("corn", "url('\Pictures/growing_corn.gif')", "url('\Pictures/corn.jpg')", "notyet", 15, 30, 18000, );
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("tomato", "url('\Pictures/growing_tomato.gif')", "url('\Pictures/tomato.jpg')", "notyet", 30, 50, 20000, );
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("marijuana", "url('\Pictures/growing_marijuana.gif')", "url('\Pictures/marijuana.jpg')", "notyet", 50, 70, 25000, );
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj('poppy', "url('\Pictures/growing_poppy.gif')", "url('\Pictures/poppy.jpg')", "notyet", 100, 200, 30000, );
    plantInfo.push(objectPlant);
}

function priceAndProfit() {
    createPlants();
    document.getElementById('plWhe').innerHTML = plantInfo[0].name;
    document.getElementById('plPot').innerHTML = plantInfo[1].name;
    document.getElementById('plCor').innerHTML = plantInfo[2].name;
    document.getElementById('plTom').innerHTML = plantInfo[3].name;
    document.getElementById('plMar').innerHTML = plantInfo[4].name;
    document.getElementById('plPop').innerHTML = plantInfo[5].name;

    document.getElementById('priWhe').innerHTML = plantInfo[0].sowingCost;
    document.getElementById('priPot').innerHTML = plantInfo[1].sowingCost;
    document.getElementById('priCor').innerHTML = plantInfo[2].sowingCost;
    document.getElementById('priTom').innerHTML = plantInfo[3].sowingCost;
    document.getElementById('priMar').innerHTML = plantInfo[4].sowingCost;
    document.getElementById('priPop').innerHTML = plantInfo[5].sowingCost;

    document.getElementById('proWhe').innerHTML = plantInfo[0].harvestingIncome;
    document.getElementById('proPot').innerHTML = plantInfo[1].harvestingIncome;
    document.getElementById('proCor').innerHTML = plantInfo[2].harvestingIncome;
    document.getElementById('proTom').innerHTML = plantInfo[3].harvestingIncome;
    document.getElementById('proMar').innerHTML = plantInfo[4].harvestingIncome;
    document.getElementById('proPop').innerHTML = plantInfo[5].harvestingIncome;
}

function harvest(p_currentFieldId) {

    if (cellInfo[makingIdToMarker(p_currentFieldId)].state != 'grass' &&
        cellInfo[makingIdToMarker(p_currentFieldId)].state != 'empty' &&
        cellInfo[makingIdToMarker(p_currentFieldId)].state != 'growing') {

        let addend;
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'wheat') {
            addend = plantInfo[0].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'potato') {
            addend = plantInfo[1].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'corn') {
            addend = plantInfo[2].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'tomato') {
            addend = plantInfo[3].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'marijuana') {
            addend = plantInfo[4].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'poppy') {
            addend = plantInfo[5].harvestingIncome;
        }
        console.log("aratás folyamatban");
        makeItGrass(p_currentFieldId);
        console.log(cellInfo[makingIdToMarker(p_currentFieldId)].state);
        bankAccount = bankAccount + addend;
        showMoney();
        developField();
    } else {
        alert("Only ripe crop can be harvested.");
    }
}

let stopper;
let stopper_2 = true;

function automation(p_seedName, p_fieldId) {
    stopper_2 = true;
    bankAccount = bankAccount - 200;
    showMoney();
    console.log("automation OK");
    automationStart(p_seedName, p_fieldId);
}

function automationStart(p_seedName, p_fieldId) {
    sowSomething(p_seedName, p_fieldId);
    console.log(cellInfo[makingIdToMarker(p_fieldId)].state);
    stopper = setTimeout(function () {
        if (stopper_2 === true) {
            harvest(p_fieldId);
            showMoney();
            console.log("setTimeout megy még");
            automationRestart(p_seedName, p_fieldId);
        }
    },
        waitingTime(p_seedName));
}

function automationRestart(p_seedName, p_fieldId) {
    if (stopper_2 === true) {
        console.log("automation restarted");
        automationStart(p_seedName, p_fieldId);
    }
}


function stopAutomation(p_fieldId) {
    if (stopper_2 === true) {
    bankAccount = bankAccount - 50;
    showMoney();
    clearTimeout(stopper);
    stopper_2 = false;
    document.getElementById(p_fieldId).classList.remove("growingCropAnimation");
    makeItGrass(p_fieldId);
    console.log(stopper_2);
    console.log(cellInfo[makingIdToMarker(p_fieldId)].state);
    }
}