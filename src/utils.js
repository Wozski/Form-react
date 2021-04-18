export default function calculateWinner(squares, x, y) {
  if (x === null || y === null) {
    return null;
  }
  // 轉化成二維陣列
  let boardCoordinates = [];
  for (let i = 0; i < 19; i += 1) {
    const start = i * 19;
    const end = start + 19;
    // 檢查每一行的值，從 y 開始，之後 x
    boardCoordinates.push(squares.slice(start, end));
  }
  // 取得當前顏色,並且會檢查上一步的棋顏色
  const currentPieces = boardCoordinates[y][x];
  function checkLine(currentX, currentY, directionX, directionY) {
    let nextX = currentX;
    let nextY = currentY;
    let lineLength = 0;

    do {
      nextX += directionX;
      nextY += directionY;
      // 如果沒有條件 >= 0; < 19 條件，第一行和最後一行皆不可點擊，會出現 error，作用是檢查周圍是否有相同棋子。
      if (
        nextX >= 0 &&
        nextX < 19 &&
        nextY >= 0 &&
        nextY < 19 &&
        boardCoordinates[nextY][nextX] === currentPieces
      ) {
        lineLength += 1;
      } else {
        break;
      }
    } while (lineLength);
    return lineLength;
  }
  // 計算不含自己有沒有超過四個子，自身不算，如果有連線，總數加一，最後到四即是五子連線。
  if (
    // 檢查前後
    checkLine(x, y, 1, 0) + checkLine(x, y, -1, 0) >= 4 ||
    // 檢查上下
    checkLine(x, y, 0, 1) + checkLine(x, y, 0, -1) >= 4 ||
    // 檢查右上左下斜角
    checkLine(x, y, 1, 1) + checkLine(x, y, -1, -1) >= 4 ||
    // 檢查左上右下斜角
    checkLine(x, y, 1, -1) + checkLine(x, y, -1, 1) >= 4
  ) {
    return currentPieces;
  }
  //console.log(checkLine(x, y, 1, 0), checkLine(x, y, -1, 0));
  return null;
}
