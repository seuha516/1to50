// ""로 가득찬 5*5 배열 반환
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
// 1~25의 숫자를 섞어 만든 5*5 배열 반환
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
// 26~50의 1차원 배열 반환
export const setList = () => {
  let list = [];
  for (let i = 26; i <= 50; i++) {
    list.push(i);
  }
  return list;
};
// 버튼을 클릭했을 때 그 칸에 다음으로 들어갈 수를 반환
export const findnextnum = (leftnums) => {
  if (leftnums.length === 0) {
    return ["", []];
  }
  let index = Math.floor(Math.random() * leftnums.length);
  let nextnum = leftnums[index];
  leftnums.splice(index, 1);
  return [nextnum, leftnums];
};
// time를 분, 초로 반환
export const makeTimer = (time) => {
  const min =
    Math.floor(time / 100) < 10
      ? "0" + String(Math.floor(time / 100))
      : String(Math.floor(time / 100));
  const sec = time % 100 < 10 ? "0" + String(time % 100) : String(time % 100);
  return [min, sec];
};
// 1초 후에 fn(x)를 실행하는 promise
export const delaySetWait = (fn, x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      fn(x);
      resolve();
    }, 1000);
  });
