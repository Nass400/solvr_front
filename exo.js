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
    let coloredmap = this.getRawMap();
    let usedColors = {};
  
    const colorate = (i, j, color) => {
      if (i >= 0 && j >= 0 && i < coloredmap.length && j < coloredmap[i].length && coloredmap[i][j] === DEFAULT_EARTH_COLOR) {
        coloredmap[i][j] = color;
        colorate(i + 1, j, color); 
        colorate(i, j + 1, color); 
        colorate(i - 1, j, color); 
        colorate(i, j - 1, color); 
      }
    };
  
    for (let i = 0; i < coloredmap.length; i++) {
      for (let j = 0; j < coloredmap[i].length; j++) {
        if (coloredmap[i][j] === DEFAULT_EARTH_COLOR) {
          let color;
          while (!color || usedColors[color]) {
            color = this.generateRandomColor();
          }
          usedColors[color] = true;
          colorate(i, j, color);
        }
      }
    }
  
    return coloredmap;
  }
}