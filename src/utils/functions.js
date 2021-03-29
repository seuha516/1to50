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
