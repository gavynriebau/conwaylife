const NUM_INITIAL_CELLS = 100000;
const NUM_INITIAL_CELLS_PERCENT = 5;
const SLEEP_TIME_MS     = 10;

let cells        = {};
let canvasWidth  = 0;
let canvasHeight = 0;

let ctx;

document.addEventListener("DOMContentLoaded", function() {
	const canvas  = document.getElementById("canvas");
	canvas.width  = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvasWidth   = canvas.width;
	canvasHeight  = canvas.height;
	ctx           = canvas.getContext('2d');
	start();
}, false);

const clear = () => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const start = () => {
	cells = createCells();
	populateInitialCells();
	drawCells();
	setInterval(update, SLEEP_TIME_MS);
};

const createCells = () => {
	let cells = {};

	for (let x = 0; x < canvasWidth; x++) {
		cells[x] = {};
		for (let y = 0; y < canvasHeight; y++) {
			cells[x][y] = false;
		}
	}

	return cells;
};

const drawCell = (cell) => {
	ctx.fillRect(cell.x, cell.y, 1, 1);
};

const populateInitialCells = () => {
	const numInitialCells = Math.round(NUM_INITIAL_CELLS_PERCENT * canvasWidth * canvasHeight / 100.0);
	for (let i = 0; i < numInitialCells; i++) {
		const x = getRandomInt(canvasWidth);
		const y = getRandomInt(canvasHeight);
		cells[x][y] = true;
	}
};

const update = () => {
	updateCells();
	drawCells();
};

const updateCells = () => {
	for (let x = 0; x < canvasWidth; x++) {
		for (let y = 0; y < canvasHeight; y++) {
			const cell = { x, y };
			const count = countNeighbours(cell);

			if (count < 2 || count > 3) {
				cells[x][y] = false;
			} else if (count === 3) {
				cells[x][y] = true;
			}
		}
	}
};

const drawCells = () => {
	clear();
	ctx.fillStyle = 'green';
	for (const x in cells) {
		for (const y in cells[x]) {
			if (cells[x][y]) {
				drawCell({x, y});
			}
		}
	}
};

const atCoords = (x, y) => {
	if (x < 0)             return false;
	if (x >= canvasWidth)  return false;
	if (y < 0)             return false;
	if (y >= canvasHeight) return false;

	return cells[x][y];
};

const countNeighbours = (cell) => {
	let count = 0;

	const topLeft      = atCoords(cell.x-1, cell.y-1);
	const topMiddle    = atCoords(cell.x+0, cell.y-1);
	const topRight     = atCoords(cell.x+1, cell.y-1);
	const middleLeft   = atCoords(cell.x-1, cell.y+0);
	const middleRight  = atCoords(cell.x+1, cell.y+0);
	const bottomLeft   = atCoords(cell.x-1, cell.y+1);
	const bottomMiddle = atCoords(cell.x+0, cell.y+1);
	const bottomRight  = atCoords(cell.x+1, cell.y+1);

	if (topLeft)      count += 1;
	if (topMiddle)    count += 1;
	if (topRight)     count += 1;
	if (middleLeft)   count += 1;
	if (middleRight)  count += 1;
	if (bottomLeft)   count += 1;
	if (bottomMiddle) count += 1;
	if (bottomRight)  count += 1;

	return count;
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

