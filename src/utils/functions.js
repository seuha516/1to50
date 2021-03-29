export const createArray = (rows, columns) => {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      arr[i][j] = {
        id: i * columns + j,
        value: "",
      };
    }
  }
  return arr;
};
export const setArray = (rows, columns) => {
  let arr = new Array(rows);
  let list = [];
  for (let i = 1; i <= 25; i++) {
    list.push(i);
  }
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      let target = Math.floor(Math.random() * list.length);
      arr[i][j] = {
        id: list[target],
        value: list[target],
      };
      list.splice(target, 1);
    }
  }
  return arr;
};
export const delaySetWait = (fn, x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      fn(x);
      resolve();
    }, 1000);
  });
export const findnextnum = (boardstate, target) => {
  let list = [];
  for (let n = target + 1; n <= 50; n++) {
    let can = true;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (boardstate[i][j].value === n) {
          can = false;
          break;
        }
      }
      if (!can) break;
    }
    if (can) list.push(n);
  }
  return list[Math.floor(Math.random() * list.length)];
};
