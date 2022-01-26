// Times Tables Cardioid Visualization
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/133-times-tables-cardioid.html
// https://youtu.be/bl3nc_a1nvs
// https://editor.p5js.org/codingtrain/sketches/gwcGb_NPm


let r;
let factor = 0;
let checkbox;
let button;
let slider;
let mode_auto = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height / 2 - 16;
  
  slider = createSlider(0, 400, 0, 1);
  slider.position(40, height - 50);
  slider.style('width', '1000px');
  // checkbox = createCheckbox('Manual', false);
  // checkbox.position(700, height - 50);
  // checkbox.changed(myCheckedEvent);
  button = createButton('SW Auto/Man');
  button.position(40, height - 100);
  button.mousePressed(changeMode);
}

function changeMode() {
  let val = random(255);
  if (mode_auto) {
    mode_auto = false;
  } else {
      mode_auto = true;
  }
}
// function myCheckedEvent() {
//   if (mode_auto) {
//     mode_auto = false;
//   } else {
//       mode_auto = true;
//   }
// }

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  const total = 200; //int(map(mouseX, 0, width, 0, 200));
  if (mode_auto) {
    factor += 0.015;
  } else {
    factor = slider.value();
  }
  
  background(0);
  fill(0, 255, 255);
  textSize(24);
  text("Emergent patterns", 20, 30);
  text("with multiplication", 20, 60);
  //text("Level: " + level + "   Score: " + score + "   Lives: " + lives + "   n_Particles: " + particles.length, 10, 25);
  text(" N: " + nf(factor, 0, 3), 35, height - 120);

  translate(width / 2, height / 2);
  stroke(255, 255, 0, 150);
  strokeWeight(1);
  fill(100, 200, (factor * 60) % 255, 100);
  ellipse(0, 0, r * 2);

  strokeWeight(2);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
}

