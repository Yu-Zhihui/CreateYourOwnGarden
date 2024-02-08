var p = [];
var mySize, margin;
var seed = Math.random() * 9217;
let colors1 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
let colors2;
let colors_flower1 = "6698D9-71A8D9-ACD1F2-84B9BF-F2F2F2".split("-").map((a) => "#" + a); // blue purple tone
let colors_flower2 = "73022C-A64669-D979B7-D9A3C6-F2DCF1".split("-").map((a) => "#" + a); // pink red tone
let colors_flower3 = "274001-A0A603-BFB850-D9D48F-D9D7BA".split("-").map((a) => "#" + a); // green yellowgreen tone
let colors_flower4 = "0477BF-03658C-0388A6-EBF2F2".split("-").map((a) => "#" + a); // blue tone
let colors_flower5 = "F2CD88-F2DBAE-D99D55-A65526-F2F2F2".split("-").map((a) => "#" + a); // orange tone
let colors_flower6 = "F1F2E9-A3A64B-8A8C46-A5A681-BEBFA3".split("-").map((a) => "#" + a); // white tone
let colors_flower7 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a); // white tone

let colors_root = "362300-805300-402900-734E39".split("-").map((a) => "#" + a);

let colorset = [];
let colorbg = "1C2611-2B4016-261416-031740".split("-").map((a) => "#" + a); // dark
let filter1;
let plusO;
let originalGraphics;

function setup() {
	frameRate(50);
	randomSeed(int(seed));
	mySize = min(windowWidth, windowHeight);
	// mySize = 1080;
	// margin = mySize / 100;
	// createCanvas(1440,mySize);
	createCanvas(windowWidth, windowHeight);
	originalGraphics = createGraphics(width, height);
	for (let i = 0; i < 12; i++) {
		p[i] = createVector(random(width / 4, width / 4 * 3), random(height / 4, height / 4 * 3));
	}
	// pixelDensity(5);
	colors2 = random([colors_flower1, colors_flower2, colors_flower3, colors_flower4, colors_flower5, colors_flower6, colors_flower7]);
	// colors2 = colors_flower7;
	colorset[0] = random(colors2);
	colorset[1] = random(colors2);
	colorset[2] = random(colors1);
	colorset[3] = random(colors2);
	colorset[4] = random(colors2);
	background(random(colorbg));
	filter1 = new makeFilter();
	plusO = 0;
}

function draw() {
	randomSeed(seed);
	noiseSeed(int(seed));
	let ver = random([10, 20]);

	//originalGraphics
	if (frameCount % 8 == 0) {
		originalGraphics.stroke(random(colorset));
		originalGraphics.strokeWeight(random(1));
	} else {
		originalGraphics.noStroke();
	}

	//shape
	randomSeed(seed * random(frameCount / 10));
	for (let newp of p) {
		let version = random(1, 10) * 100000;
		let b1 = noise(newp.x / version, newp.y / version) * TWO_PI * 1;
		let c = random(2000, 5000);

		// *** main point *** //
		b2 = (TWO_PI / c) * int((b1 / TWO_PI) * c);
		newp.add(0.1*sin(b2), 0.1*cos(b2));
		originalGraphics.push();
		originalGraphics.translate(newp.x, newp.y);
		originalGraphics.rotate(random(TAU));
		let gard_w = random(mySize / 2, mySize / 3) / ver;
		let gard_h = random(mySize / 2, mySize / 3) / ver;

		originalGraphics.fill(0);
		let grad = drawingContext.createRadialGradient(0, 0, 0, 0, 0, random(gard_w, gard_h) / random(4, 16));
		grad.addColorStop(0.1, random(colorset));
		grad.addColorStop(random(0.35, 0.55), str(random(colorset)) + "00");
		originalGraphics.drawingContext.fillStyle = grad;

		if (frameCount % 15 == 0) {
			originalGraphics.drawingContext.shadowColor = random(colorset);
			originalGraphics.drawingContext.shadowOffsetX = random(-1, 1);
			originalGraphics.drawingContext.shadowOffsetY = random(-1, 1);
			originalGraphics.drawingContext.shadowBlur = 50;
		}
		originalGraphics.push();
		originalGraphics.translate(random(3, 6) * random(-gard_w, gard_w), random(3, 6) * random(-gard_h, gard_h));
		originalGraphics.blendMode(SCREEN);
		originalGraphics.blendMode(ADD);
		originalGraphics.blendMode(HARD_LIGHT);
		originalGraphics.circle(0, 0, random(gard_w, gard_h) / random(4, 16) + plusO);
		originalGraphics.pop();

		originalGraphics.pop();
		plusO += 1 * random(0.0001, 0.0005);
	}

	blendMode(BLEND);
	image(originalGraphics, 0, 0);

	image(overAllTexture, 0, 0);

	if (frameCount == 500) {
		noLoop();
		blendMode(BLEND);
		image(overAllTexture, 0, 0);
		blendMode(ADD);
		strokeWeight(random(0.10, 0.2));
		stroke(str(random(colors1)) + "1a");
		noFill();
		drawingContext.setLineDash([1, 5, 1, 3]);
		drawOverPattern();
	}
	drawingContext.setLineDash([1, 1, 1, 1]);
	noFill();
	// stroke("#202020");
	// strokeWeight(margin);
	blendMode(BLEND);
	rectMode(CORNER);
	rect(0, 0, width, height);
}

function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("1016_Faint Lights_2022", "png");
	}
}

//filter
function makeFilter() {
	// noiseのフィルターをつくる
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(0, 0, 5, 5);
	overAllTexture = createGraphics(width, height);
	overAllTexture.loadPixels();
	for (var i = 0; i < width; i++) { // noprotect
		for (var j = 0; j < height; j++) {
			overAllTexture.set(
				i,
				j,
				color(
					0,
					0,
					5,
					noise(i / 3, j / 3, (i * j) / 50) * random(5, 15) / 1
				)
			);
		}
	}
	overAllTexture.updatePixels();
}

function drawOverPattern() {
	push();
	translate(width / 2, height / 2);
	rotate(-PI / 2);

	let s = mySize / 2 * sqrt(3) - 2;
	let n = 4;

	for (let theta = 0; theta < TWO_PI; theta += TWO_PI / 6) { // noprotect
		divideOP(0, 0, s * cos(theta), s * sin(theta), s * cos(theta + TWO_PI / 6), s * sin(theta + TWO_PI / 6), n);
	}
	pop();
}

function prop(x1, y1, x2, y2, k) {
	let x3 = (1 - k) * x1 + k * x2;
	let y3 = (1 - k) * y1 + k * y2;
	return [x3, y3];
}

function divideOP(x1, y1, x2, y2, x3, y3, n) {
	if (n > 1) {
		let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
		let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
		let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
		let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
		let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
		let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
		let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
		divideOP(x1, y1, xA, yA, xF, yF, n - 1);
		divideOP(xA, yA, xB, yB, xG, yG, n - 1);
		divideOP(xB, yB, x2, y2, xC, yC, n - 1);
		divideOP(xG, yG, xF, yF, xA, yA, n - 1);
		divideOP(xC, yC, xG, yG, xB, yB, n - 1);
		divideOP(xF, yF, xG, yG, xE, yE, n - 1);
		divideOP(xG, yG, xC, yC, xD, yD, n - 1);
		divideOP(xD, yD, xE, yE, xG, yG, n - 1);
		divideOP(xE, yE, xD, yD, x3, y3, n - 1);
	} else {
		makeTriangle([x1, y1], [x2, y2], [x3, y3]);
	}
}

function makeTriangle(v1, v2, v3) {
	let points = shuffle([v1, v2, v3]);
	let [x1, y1] = points[0];
	let [x2, y2] = points[1];
	let [x3, y3] = points[2];
	let iStep = 1 / (pow(2, floor(random(4, 2))));
	for (let i = 0; i < 1; i += iStep) { // noprotect
		let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
		let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
		triangle(x1, y1, x4, y4, x5, y5);
	}
}