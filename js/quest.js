const imageLocation = document.getElementById('imageLocation');
const myInput = document.getElementById('myInput');
const myOptions = document.getElementById('possibilities');
const inv = document.getElementById('inv');
const enemies = document.getElementById('enemies');
const ErrorMSG = document.getElementById("error");
const DescMSG = document.getElementById("beschrijving");


let inventory = [];

setInterval(update, 1)

class room {
    constructor(options, imagePath, items, requiredItem, description = "") {
        this.options = options;
        this.image = imagePath;
        this.items = items;
        this.requiredItem = requiredItem;
        this.beschrijving = description;
        this.enemies = [];
    }
}

class tegenstander {
    constructor(naam, health) {
        this.name = naam;
        this.health = health;
    }

}


// 3d array
let grid = [
    [
        ["1", "2", "3"],
        ["4", "5", "6", "19", "20"], // Floor 0
        ["7", "8", "9"]
    ],
    [
        ["10", "11", "12"],
        ["13", "14", "15"],  // FLoor 1
        ["16", "17", "18"]
    ],
];

let rooms = [];

rooms[1] = new room(["down", "right"], "media/room1.png", [], "", "een mooie kamer");
rooms[2] = new room(["left", "right", "down"], "media/room2.png", [], "", "er is / was hier een sleutel!");
rooms[3] = new room(["left", "down"], "media/room3.png", [], "", "");
rooms[4] = new room(["up", "down", "right"], "media/room4.png", [], "", "kamer 4 here we are!");
rooms[5] = new room(["left", "down", "right", "up"], "media/room5.png", [], "", "");
rooms[6] = new room(["left", "down", "up", "right"], "media/room5.png", [], "", "");
rooms[7] = new room(["up", "right"], "media/room7.png", [], "", "OMG een BOEMBOEM MAN, RUN!!! OF ATTACK!!!");
rooms[7].enemies.push(new tegenstander("BOEMBOEM", 100));

rooms[8] = new room(["left", "right", "up"], "media/room8.png", [], "", "");
rooms[9] = new room(["left", "up", "floorup"], "media/room9.png", [], "", "");
rooms[10] = new room(["down", "right"], "media/room10.png", ["MASTER_KEY"], "", "woww een master key, die moet wel bijzonder zijn!");
rooms[11] = new room(["left", "right", "down"], "media/room11.png", [], "", "");
rooms[12] = new room(["left", "down"], "media/room12.png", [], "", "");
rooms[13] = new room(["up", "down", "right"], "media/room13.png", [], "", "");
rooms[14] = new room(["left", "down", "right", "up"], "media/room14.png", [], "", "");
rooms[15] = new room(["left", "down", "up"], "media/room15.png", [], "", "");
rooms[16] = new room(["right", "up"], "media/room16.png", [], "", "");
rooms[17] = new room(["left", "right", "up"], "media/room17.png", [], "", "");
rooms[18] = new room(["left", "up", "floordown"], "media/room18.png", [], "", "");
rooms[19] = new room(["left", "right"], "media/room19.png", [], "", "Woww een trap, er moet wel iets belangerijks zijn hier!");
rooms[20] = new room(["left"], "media/room20.png", ["GOLD", "GOLD", "DIAMOND", "DIAMOND", "EMERALD", "EMERALD"], "MASTER_KEY", "Yess ik heb het gevonden de TRESURE ROOM!");

let currentX = 0;
let currentY = 0;
let currentZ = 0;

function getPlayerRoom() {
    return grid[currentX][currentY][currentZ];
}

function update() {
    //update the image
    imageLocation.src = rooms[getPlayerRoom()].image;

    // update options text
    let optionsMSG = "";
    for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
        optionsMSG += "<li>" + rooms[getPlayerRoom()].options[i] + "</li>"
    }

    if (rooms[getPlayerRoom()].items.length != 0) {
        optionsMSG += "<li>" + "pickup" + "</li>"
    }

    if (rooms[getPlayerRoom()].enemies.length != 0) {
        optionsMSG += "<li>" + "attack" + "</li>"
    }


    DescMSG.innerHTML = rooms[getPlayerRoom()].beschrijving;

    myOptions.innerHTML = optionsMSG;

    // update inventory
    {
        let items = "";
        for (let i = 0; i < inventory.length; i++) {
            items += "<li>" + inventory[i] + "</li>";
            if (i + 1 < inventory.length) {
                items += " - "
            }
        }

        inv.innerHTML = items;
    }

    {
        let tegenStandersMSG = "";
        for (let i = 0; i < rooms[getPlayerRoom()].enemies.length; i++) {
            tegenStandersMSG += "<li>" + rooms[getPlayerRoom()].enemies[i].name + " - " + rooms[getPlayerRoom()].enemies[i].health + "</li>"
        }
        enemies.innerHTML = tegenStandersMSG;
    }
}

myInput.addEventListener('keydown', getInput, false);

function getInput(e) {
    if (e.key == "Enter") {
        let inputArray = myInput.value.split(" ");

        let isOption = false;
        for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
            if (rooms[getPlayerRoom()].options[i] == inputArray[0]) {
                isOption = true;
            }
        }

        if (rooms[getPlayerRoom()].items.length != 0) {
            if (inputArray[0] === "pickup") {
                isOption = true;
            }
        }

        if (rooms[getPlayerRoom()].enemies.length != 0) {
            if (inputArray[0] === "attack") {
                isOption = true;
            }
        }


        let newY = currentY;
        let newX = currentX;
        let newZ = currentZ;

        if (isOption) {
            console.log("true")
            switch (inputArray[0]) {
                case "down":
                    newY += 1;
                    break;
                case "right":
                    newZ += 1;
                    break;
                case "left":
                    newZ -= 1;
                    break;
                case "up":
                    newY -= 1;
                    break;
                case "floordown":
                    newX -= 1;
                    break;
                case "floorup":
                    newX += 1;
                    break;
                case "pickup":
                    let item = Math.floor(Math.random() * rooms[getPlayerRoom()].items.length);
                    inventory.push(rooms[getPlayerRoom()].items[item]);
                    rooms[getPlayerRoom()].items = rooms[getPlayerRoom()].items.filter(el => el !== rooms[getPlayerRoom()].items[item]);
                    break;
                case "attack":
                    let tegenstander = Math.floor(Math.random() * rooms[getPlayerRoom()].enemies.length);
                    rooms[getPlayerRoom()].enemies[tegenstander].health -= Math.floor(Math.random() * 20 + 5);

                    if (rooms[getPlayerRoom()].enemies[tegenstander].health <= 0) {
                        rooms[getPlayerRoom()].enemies = rooms[getPlayerRoom()].enemies.filter(el => el !== rooms[getPlayerRoom()].enemies[tegenstander]);
                    }
                    break;
            }
        } else {
            errorMSG("is dit wel een movement optie?");
        }

        if (rooms[grid[newX][newY][newZ]].requiredItem != "") {
            if (!(inventory.includes(rooms[grid[newX][newY][newZ]].requiredItem))) {
                errorMSG("u heeft niet de juiste items om deze kamer in te gaan.\nNodig: " + rooms[grid[newX][newY][newZ]].requiredItem);
                update();
                myInput.value = "";
                return;
            } else {
                inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                rooms[getPlayerRoom()].requiredItem = "";
            }
        }
        currentX = newX;
        currentY = newY;
        currentZ = newZ;

        update();
        myInput.value = "";
    }
}


let errorMSG = function (msg) {
    ErrorMSG.innerHTML = msg;

    setTimeout(function () {
        if (ErrorMSG.innerHTML == msg) {
            ErrorMSG.innerHTML = "";
        }
    }, 3000);
}
