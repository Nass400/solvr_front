var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}


class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }
    
  getColoredMap() {
    let rawMap = this.getRawMap();
    let usedColors = {};
  
    for (let i = 0; i < rawMap.length; i++) {
      for (let j = 0; j < rawMap[i].length; j++) {
        if (rawMap[i][j]=== DEFAULT_EARTH_COLOR) {
          let color;
          let island = [];
          let queue = [[i, j]];
  
          while (queue.length > 0) {
            let [x, y] = queue.shift();
            if (rawMap[x][y] === DEFAULT_EARTH_COLOR) {
              rawMap[x][y] = null;
              island.push([x, y]);
  
              if (x > 0) queue.push([x - 1, y]);
              if (y > 0) queue.push([x, y - 1]);
              if (x < rawMap.length - 1) queue.push([x + 1, y]);
              if (y < rawMap[x].length - 1) queue.push([x, y + 1]);
            }
          }
  
          while (!color || usedColors[color]) {
            color = this.generateRandomColor();
          }

          usedColors[color] = true;
  
          for (let k = 0; k < island.length; k++) {
            let [x, y] = island[k];
            rawMap[x][y] = color;
          }
        }
      }
    }
  
    return rawMap;
  }



}