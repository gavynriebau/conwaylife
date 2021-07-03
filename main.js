console.log("starting");

const CANVAS_DIMENS_PX  = 1339;
const NUM_INITIAL_CELLS = 200000;
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
	populateInitialCells();
	drawCells();
	setInterval(update, SLEEP_TIME_MS);
};

const drawCell = (cell) => {
	ctx.fillRect(cell.x, cell.y, 1, 1);
};

const populateInitialCells = () => {
	for (let i = 0; i < NUM_INITIAL_CELLS; i++) {
		const x = getRandomInt(canvasWidth);
		const y = getRandomInt(canvasHeight);
		addCell({x, y});
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
			const cell = { x, y };
			const count = countNeighbours(cell);

			if (count < 2 || count > 3) {
				removeCell(cell);
			} else if (count === 3) {
				addCell(cell);
			}
		}
	}
};

const removeCell = (cell) => {
	cells[cell.x] = cells[cell.x] || {};
	delete cells[cell.x][cell.y];
};

const addCell = (cell) => {
	cells[cell.x]         = cells[cell.x] || {};
	cells[cell.x][cell.y] = cells[cell.x][cell.y] || true;
};

const drawCells = () => {
	clear();
	ctx.fillStyle = 'green';
	for (const x in cells) {
		for (const y in cells[x]) {
			drawCell({x, y});
		}
	}
};

const atCoords = (x, y) => {
	return (cells[Math.min(Math.max(0, x), canvasWidth-1)] || {})[Math.min(Math.max(y, 0), canvasHeight)];
};

const countNeighbours = (cell) => {
	let count = 0;

	const topLeft      = atCoords(cell.x-1, cell.y-1);
	const topMiddle    = atCoords(cell.x+0, cell.y-1);
	const topRight     = atCoords(cell.x+1, cell.y-0);
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

