var img = null;
var c;
var actions = [];
var queue = [];
var idx = 0;
var ready = false;

var sizeSelector;
var alphaSlider;
var brushShape;
var brushStyle;
var button, button2;

function setup() { 
  c = createCanvas(600, 600);
  c.parent('sketch-holder');
  //c.drop(gotFile);
  c.background(255);

  brushShape = createRadio();
  brushShape.option('Circle', 'CIRCLE');
  brushShape.option('Square', 'SQUARE');
  brushShape.option('Triangle', 'TRIANGLE');
  brushShape.option('Line', 'LINE');
  brushShape.class('control-choice');
  brushShape.value('CIRCLE');
  brushShape.parent('brush-shape');

  brushStyle = createRadio();
  brushStyle.option('Filled', 'FILLED');
  brushStyle.option('Outline', 'OUTLINE');
  brushStyle.class('control-choice');
  brushStyle.value('FILLED');
  brushStyle.parent('brush-style');

  alphaSlider = createSlider(1, 255, 128);
  alphaSlider.parent('alpha-slider');

  sizeSelector = createSelect();
  sizeSelector.option('250px', 250);
  sizeSelector.option('200px', 200);
  sizeSelector.option('100px', 100);
  sizeSelector.option('50px', 50);
  sizeSelector.option('25px', 25);
  sizeSelector.option('20px', 20);
  sizeSelector.option('15px', 15);
  sizeSelector.option('10px', 10);
  sizeSelector.option('8px', 8);
  sizeSelector.option('5px', 5);
  sizeSelector.option('2px', 2);
  sizeSelector.option('1px', 1);
  sizeSelector.value(100);
  sizeSelector.changed(brushSizeChanged);
  sizeSelector.parent('size-selector');

  button = createButton('Random Scatter');
  button.mousePressed(do_random);
  button.parent('random-button');

  button2 = createButton('Pixelate');
  button2.mousePressed(do_tile);
  button2.parent('tile-button');

  reset();
} 

function brushSizeChanged() {
  console.log(sizeSelector.value());
}

function draw() { 
}

function reset() {
  actions = [];
  queue = [];
  if (img) {
    img.resize(width, height);
    ready = true;
    image(img, 0, 0);
    background(255, 200);
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(150);
    background(255);
    text('Waiting for image...', width/2, height/2);
  }
}

//function gotFile(file) {
//  console.log(file);
//  if (file.type === 'image') {
//    ready = false;
//    img = loadImage(file.data, function(data) {
//      console.log('done!');
//      reset();
//    });
//  } else {
//    console.log('Not an image file!');
//  }
//}

function painterLoadImage(url) {
  ready = false;
  img = loadImage(url, function(data) {
    console.log('done!');
    reset();
  });
}

function do_circle_filled(x, y, d, c) {
  let r = d/2.0;
  noStroke();
  fill(c);
  ellipse(x, y, 2*r, 2*r);
  actions.push({
    id: idx,
    t: 'c:f', // circle:filled
    x: x,
    y: y,
    r: r,
    c: c,
  });
}

function do_circle_outline(x, y, d, c) {
  let r = d/2.0;
  let sw = r/5.0
  stroke(c);
  noFill();
  strokeWeight(sw);
  ellipse(x, y, 2*r, 2*r);
  actions.push({
    id: idx,
    t: 'c:o', // circle:outline
    x: x,
    y: y,
    r: r,
    s: sw,
    c: c,
  });
}

function do_square_filled(x, y, size, c) {
  let w = size;
  noStroke();
  fill(c);
  square(x - w/2.0, y - w/2.0, w);
  actions.push({
    id: idx,
    t: 's:f', // square:filled
    x: x,
    y: y,
    w: w,
    c: c,
  });
}

function do_square_outline(x, y, size, c) {
  let w = size;
  let h = size;
  let sw = size/5.0
  noFill();
  stroke(c);
  strokeWeight(sw);
  square(x - w/2.0, y - w/2.0, w);
  actions.push({
    id: idx,
    t: 's:o', // square:outline
    x: x,
    y: y,
    w: w,
    s: sw,
    c: c,
  });
}

function do_triangle_filled(x, y, size, c) {
  let w = size;
  noStroke();
  fill(c);
  triangle(x - w/2.0, y + w/2.0, x + w/2.0, y + w/2.0, x, y - (w*sqrt(2.0))/4);
  actions.push({
    id: idx,
    t: 't:f', // triangle:filled
    x1: x - w/2.0,
    y1: y + w/2.0,
    x2: x + w/2.0,
    y2: y + w/2.0,
    x3: x,
    y3: y - (w*sqrt(2.0))/4,
    c: c,
  });
}

function do_triangle_outline(x, y, size, c) {
  let w = size;
  let sw = size/5.0
  noFill();
  stroke(c);
  strokeWeight(sw);
  triangle(x - w/2.0, y + w/2.0, x + w/2.0, y + w/2.0, x, y - (w*sqrt(2.0))/4);
  actions.push({
    id: idx,
    t: 't:o', // triangle:outline
    x1: x - w/2.0,
    y1: y + w/2.0,
    x2: x + w/2.0,
    y2: y + w/2.0,
    x3: x,
    y3: y - (w*sqrt(2.0))/4,
    c: c,
  });
}

function do_line(x, y, size, c) {
  let w = size;
  let sw = size/5.0
  noFill();
  stroke(c);
  strokeWeight(sw);
  let a = random(TWO_PI);
  const x1 = x + w * cos(a);
  const y1 = y + w * sin(a);
  const x2 = x + w * cos(a + PI);
  const y2 = y + w * sin(a + PI);
  line(x1, y1, x2, y2);
  actions.push({
    id: idx,
    t: 'l', // line
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    c: c,
  });
}

function create_seed(n) {
  return Math.random().toString(36).substr(2, n);
}

function do_random() {
  if (!img) return;
  var n = 1000;
  var s = create_seed(10);
  var rng = new Math.seedrandom(s);
  for (var i = 0; i < n; i++) {
    const x = rng() * width;
    const y = rng() * height;
    drawShape(x, y);
  }
}

function do_tile() {
  if (!img) return;
  const size = parseInt(sizeSelector.value());
  var n = parseInt(ceil(width / size));
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const x = i * size;
      const y = j * size;
      const color = img.get(x, y); color[3] = alphaSlider.value();
      do_square_filled(x + size/2.0, y + size/2.0, size, color);
    }
  }
}

function drawShape(x, y) {
  const size = parseInt(sizeSelector.value());
  const color = img.get(x, y); color[3] = alphaSlider.value();
  const style = brushStyle.value();
  const shape = brushShape.value();

  switch (shape) {
    case 'CIRCLE':
      if (style == 'FILLED') {
        do_circle_filled(x, y, size, color);
      } else if (style == 'OUTLINE') {
        do_circle_outline(x, y, size, color);
      }
      break;
    case 'SQUARE':
      if (style == 'FILLED') {
        do_square_filled(x, y, size, color);
      } else if (style == 'OUTLINE') {
        do_square_outline(x, y, size, color);
      }
      break;
    case 'TRIANGLE':
      if (style == 'FILLED') {
        do_triangle_filled(x, y, size, color);
      } else if (style == 'OUTLINE') {
        do_triangle_outline(x, y, size, color);
      }
      break;
    case 'LINE':
      do_line(x, y, size, color);
      break;
    default:
      break;
  }
}

function mousePressed() {
  if (mouseX >= width || mouseX < 0 || mouseY >= height || mouseY < 0)
    return;
  console.log(actions.length);
  if (img != null) { drawShape(mouseX, mouseY); }
}

function mouseDragged() {
  if (mouseX >= width || mouseX < 0 || mouseY >= height || mouseY < 0)
    return;
  if (img != null) { drawShape(mouseX, mouseY); }
}
