const imageLocation = document.getElementById('imageLocation');
const myInput = document.getElementById('myInput');
const myOptions = document.getElementById('possibilities');
const inv = document.getElementById('inv');
const ErrorMSG = document.getElementById("error");

let inventory = [];


class room {
    constructor(options, imagePath, items, requiredItem) {
        this.options = options;
        this.image = imagePath;
        this.items = items;
        this.requiredItem = requiredItem;
    }
}


// 3d array
let grid = [
    [
        ["1", "2", "3"],
        ["4", "5", "6"], // Floor 0
        ["7", "8", "9"]
    ],
    [
        ["10", "11", "12"],
        ["13", "14", "15"],  // FLoor 1
        ["16", "17", "18"]
    ],
];

let rooms = [];

rooms[1] = new room(["down", "right"], "media/room1.png", [], "");
rooms[2] = new room(["left", "right", "down"], "media/room2.png", ["key"], "");
rooms[3] = new room(["left", "down"], "media/room3.png", [], "key");
rooms[4] = new room(["up", "down", "right"], "media/room4.png", [], "");
rooms[5] = new room(["left", "down", "right", "up"], "media/room5.png", [], "");
rooms[6] = new room(["left", "down", "up"], "media/room6.png", [], "");
rooms[7] = new room(["up", "right"], "media/room7.png", [], "");
rooms[8] = new room(["left", "right", "up"], "media/room8.png", [], "");
rooms[9] = new room(["left", "up", "floorup"], "media/room9.png", [], "");
rooms[10] = new room(["down", "right"], "media/room10.png", [], "");
rooms[11] = new room(["left", "right", "down"], "media/room11.png", [], "");
rooms[12] = new room(["left", "down"], "media/room12.png", [], "");
rooms[13] = new room(["up", "down", "right"], "media/room13.png", [], "");
rooms[14] = new room(["left", "down", "right", "up"], "media/room14.png", [], "");
rooms[15] = new room(["left", "down", "up"], "media/room15.png", [], "");
rooms[16] = new room(["right", "up"], "media/room16.png", [], "");
rooms[17] = new room(["left", "right", "up"], "media/room17.png", [], "");
rooms[18] = new room(["left", "up", "floordown"], "media/room18.png", [], "");

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
        optionsMSG += "pickup ";
    }
    myOptions.innerHTML = optionsMSG;

    // update inventory
    let items = "";
    for (let i = 0; i < inventory.length; i++) {
        items += "<li>" + inventory[i] + "</li>";
        if (i + 1 < inventory.length) {
           items += " - "
        }
    }

    inv.innerHTML = items;
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

        if (isOption) {
            console.log("true")
            switch (inputArray[0]) {
                case "down":
                    currentY += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "right":
                    currentZ += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            console.log("je hebt niet de juiste items")
                            currentZ -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "left":
                    currentZ -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentZ += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "up":
                    currentY -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "floordown":
                    currentX -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentX += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "floorup":
                    currentX += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentX -= 1;
                            invalidItems();
                            
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "pickup":
                    let item = Math.floor(Math.random() * rooms[getPlayerRoom()].items.length);
                    console.log(rooms[getPlayerRoom()].items[item]);
                    console.log(item);

                    // doe het item van de room in jou inventory.
                    inventory.push(rooms[getPlayerRoom()].items[item]);

                    // idk waarom maar zo remove je iets uit de items array van een room... "splice werkte niet"
                    rooms[getPlayerRoom()].items = rooms[getPlayerRoom()].items.filter(el => el !== rooms[getPlayerRoom()].items[item]);
                    break;
            }
        } else {
            ErrorMSG.innerHTML = "Invalid movement";

            setTimeout(function () {
                ErrorMSG.innerHTML = "";
            }, 1000);
        }

        update();
        myInput.value = "";
    }
}

update();

function invalidItems() {
    ErrorMSG.innerHTML = "U heeft niet de juiste items om deze kamer in te gaan";

    setTimeout(function () {
        ErrorMSG.innerHTML = "";
    }, 1000);
}
