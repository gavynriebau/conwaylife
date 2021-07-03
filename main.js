console.log("starting");

const CANVAS_DIMENS_PX = 1339;
const NUM_INITIAL_CELLS = 20000;
const SLEEP_TIME_MS = 1000;

let cells = [];
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

const drawCell = (cell) => {
	ctx.fillStyle = 'green';
	ctx.fillRect(cell.x, cell.y, 1, 1);
};

const populateInitialCells = () => {
	for (let i = 0; i < NUM_INITIAL_CELLS; i++) {
		const x = getRandomInt(canvasWidth);
		const y = getRandomInt(canvasHeight);

		const alreadyHasItem = cells.includes(cell => cell.x == x && cell.y == y);
		if (!alreadyHasItem) {
			cells.push({
				x,
				y
			});
		}
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
				removeCell(cell);
			} else if (count === 3) {
				addCell(cell);
			}
		}
	}
};

const removeCell = (cell) => {
	cells = cells.filter(c => !areEqual(c, cell));
};

const addCell = (cell) => {
	const match = cells.includes(c => areEqual(c, cell));
	if (!match) {
		cells.push(cell);
	}
};

const drawCells = () => {
	clear();
	for (const cell of cells) {
		drawCell(cell);
	}
};

const countNeighbours = (cell) => {
	let count = 0;

	for (const c of cells) {
		if (areEqual(cell, c)) {
			continue;
		}

		if (areNeighbours(cell, c)) {
			count += 1;
		}
	}

	return count;
};

const areEqual = (cellOne, cellTwo) => {
	return cellOne.x === cellTwo.x && cellOne.y === cellTwo.y;
};

const areNeighbours = (cellOne, cellTwo) => {
	// Top-left
	if (cellOne.x + 1 === cellTwo.x && cellOne.y + 1 === cellTwo.y) {
		return true;
	}

	// Top-middle
	if (cellOne.x === cellTwo.x && cellOne.y + 1 === cellTwo.y) {
		return true;
	}

	// Top-right
	if (cellOne.x - 1 === cellTwo.x && cellOne.y + 1 === cellTwo.y) {
		return true;
	}

	// Middle-left
	if (cellOne.x + 1 === cellTwo.x && cellOne.y === cellTwo.y) {
		return true;
	}

	// Middle-right
	if (cellOne.x - 1 === cellTwo.x && cellOne.y === cellTwo.y) {
		return true;
	}

	// Bottom-left
	if (cellOne.x + 1 === cellTwo.x && cellOne.y - 1 === cellTwo.y) {
		return true;
	}

	// Bottom-middle
	if (cellOne.x === cellTwo.x && cellOne.y - 1 === cellTwo.y) {
		return true;
	}

	// Bottom-right
	if (cellOne.x - 1 === cellTwo.x && cellOne.y - 1 === cellTwo.y) {
		return true;
	}

	return false;
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

