class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y

    }

    pluse = (other) => new Vector(this.x + other.x, this.y + other.y)

}

class Grid {
    constructor(width, height) {
        this.space = new Array(width * height)
        this.width = width;
        this.height = height;
    }

    isInside = (vector) => {
        return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
    }
    get = (vector) => this.space[vector.x + this.width * vector.y];
    set = (vector, value) => {
        this.space[vector.x + this.width * vector.y] = value;
    }
}

class BouncingCritter {
    constructor() {
        this.direction = randomElement(Object.keys(directions))
    }
    act = (view) => {
        if (view.look(this.direction) !== " ") {
            this.direction = view.find(" ") || "s";
        }
        return {type: "move", direction: this.direction};
    }
}


class World {

    constructor(map, legend) {
        this.legend = legend;
        this.map = map;
        this.gridWorld = new Grid(this.map[0].length, this.map.length);
        this.toAll(this.map);
    }


    toAll = (map)=>{
        map.forEach((line, y) =>{
            for (let x = 0; x < line.length; x++){
             //   console.log(this.gridWorld);
                this.gridWorld.set(new Vector(x, y),elementFromChar(this.legend, line[x]));
            }


        })
    }

    toString = () => {
        let output = "";
        for (let y = 0; y < this.gridWorld.height; y++) {
            for (let x = 0; x < this.gridWorld.width; x++) {
                let element = this.gridWorld.get(new Vector(x, y));
                output += charFromElement(element);
            }
            output += "\n";
        }
        return output;
    };
}
class Wall {

}

const elementFromChar = (legend, ch) => {
    if (ch === " ") {
        return null;
    }

    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}
const charFromElement = (element) => {
    if (element == null)
        return " ";
    else
        return element.originChar;
}
const directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};

const grid = ["top left", "top middle", "top right",
    "bottom left", "bottom middle", "bottom right"];

const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

const app = document.querySelector('#app');
const plan = [
    "############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];
window.onload = function () {
    let world = new World(plan, {"#": Wall, "o": BouncingCritter});
    console.log(world.toString());


}
