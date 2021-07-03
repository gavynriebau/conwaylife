console.log("starting");

const CANVAS_DIMENS_PX = 1339;
const NUM_INITIAL_CELLS = 200000;
const SLEEP_TIME_MS = 10;

let cells = {};
let canvasWidth = 0;
let canvasHeight = 0;

let ctx;

document.addEventListener("DOMContentLoaded", function() {
	const canvas = document.getElementById("canvas");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	ctx = canvas.getContext('2d');
	start();
}, false);

const clear = () => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const start = () => {
	populateInitialCells();
	drawCells();
	setInterval(update, SLEEP_TIME_MS);
};

const drawCell = (x, y) => {
	ctx.fillStyle = 'green';
	ctx.fillRect(x, y, 1, 1);
};

const populateInitialCells = () => {
	for (let i = 0; i < NUM_INITIAL_CELLS; i++) {
		const x = getRandomInt(canvasWidth);
		const y = getRandomInt(canvasHeight);
		addCell(x, y);
	}
};

const update = () => {
	console.log("Updating");
	updateCells();
	drawCells();
};

const updateCells = () => {
	for (let x = 0; x < canvasWidth; x++) {
		for (let y = 0; y < canvasHeight; y++) {
			const cell = {
				x,
				y
			};
			const count = countNeighbours(cell);
			if (count < 2 || count > 3) {
				removeCell(cell.x, cell.y);
			} else if (count === 3) {
				addCell(cell.x, cell.y);
			}
		}
	}
};

const removeCell = (x, y) => {
	cells[x] = cells[x] || {};
	delete cells[x][y];
};

const addCell = (x, y) => {
	cells[x]    = cells[x] || {};
	cells[x][y] = cells[x][y] || true;
};

const drawCells = () => {
	clear();
	for (const x in cells) {
		for (const y in cells[x]) {
			drawCell(x, y);
		}
	}
};

const countNeighbours = (cell) => {
	let count = 0;

	const topLeft      = (cells[Math.min(Math.max(0, cell.x-1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y-1, 0), canvasHeight)];
	const topMiddle    = (cells[Math.min(Math.max(0, cell.x+0), canvasWidth-1)] || {})[Math.min(Math.max(cell.y-1, 0), canvasHeight)];
	const topRight     = (cells[Math.min(Math.max(0, cell.x+1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y-0, 0), canvasHeight)];
	const middleLeft   = (cells[Math.min(Math.max(0, cell.x-1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y+0, 0), canvasHeight)];
	const middleRight  = (cells[Math.min(Math.max(0, cell.x+1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y+0, 0), canvasHeight)];
	const bottomLeft   = (cells[Math.min(Math.max(0, cell.x-1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y+1, 0), canvasHeight)];
	const bottomMiddle = (cells[Math.min(Math.max(0, cell.x+0), canvasWidth-1)] || {})[Math.min(Math.max(cell.y+1, 0), canvasHeight)];
	const bottomRight  = (cells[Math.min(Math.max(0, cell.x+1), canvasWidth-1)] || {})[Math.min(Math.max(cell.y+1, 0), canvasHeight)];

	if (topLeft) count += 1;
	if (topMiddle) count += 1;
	if (topRight) count += 1;
	if (middleLeft) count += 1;
	if (middleRight) count += 1;
	if (bottomLeft) count += 1;
	if (bottomMiddle) count += 1;
	if (bottomRight) count += 1;

	return count;
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

