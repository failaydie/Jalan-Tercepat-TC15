function jalanTercepat(maps) {
  const directions = [
    [-1, 0, "ke atas"],
    [1, 0, "ke bawah"],
    [0, -1, "ke kiri"],
    [0, 1, "ke kanan"],
  ];

  const numRows = maps.length;
  const numCols = maps[0].length;

  let start = null;
  let end = null;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (maps[i][j] === "^") start = [i, j];
      if (maps[i][j] === "*") end = [i, j];
    }
  }

  if (!start || !end) return "tidak ada langkah";

  const queue = [[...start, 0, []]];
  const visited = new Set();
  visited.add(`${start[0]}-${start[1]}`);

  while (queue.length > 0) {
    const [currentRow, currentCol, distance, path] = queue.shift();

    if (currentRow === end[0] && currentCol === end[1]) {
      const steps = path.map((p) => `${p.steps} ${p.direction}`).join("\n");
      return `${steps}\ntotal: ${distance} Langkah`;
    }

    for (const [dx, dy, dir] of directions) {
      const newRow = currentRow + dx;
      const newCol = currentCol + dy;

      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        maps[newRow][newCol] !== "#" &&
        !visited.has(`${newRow}-${newCol}`)
      ) {
        visited.add(`${newRow}-${newCol}`);
        queue.push([
          newRow,
          newCol,
          distance + 1,
          [...path, { direction: dir, steps: 1 }],
        ]);
      }
    }
  }

  return "tidak ada langkah"; 
}

const maps1 = [
  "##########".split(""),
  "#        *#".split(""),
  "#  ###### #".split(""),
  "#         #".split(""),
  "#  ########".split(""),
  "#     ^   #".split(""),
  "########  #".split(""),
];

const maps2 = ["# * # ^ #".split("")];

console.log(jalanTercepat(maps1)); 
console.log(jalanTercepat(maps2)); 
