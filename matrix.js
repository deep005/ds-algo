// print matrix in spiral form

function printSpiral(arr) {

    let startRowIndex = 0,
      startColumnIndex = 0,
      endRowIndex = arr.length - 1,
      endColumnIndex = arr[0].length - 1;
  
    while (startColumnIndex <= endColumnIndex && startRowIndex <= endRowIndex) {
      for (let i = startColumnIndex; i <= endColumnIndex; i++) {
        console.log(arr[startRowIndex][i]);
      }
      startRowIndex++;
      for (let i = startRowIndex; i <= endRowIndex; i++) {
        console.log(arr[i][endColumnIndex]);
      }
      endColumnIndex--;
      if (startRowIndex <= endRowIndex) {
        for (let i = endColumnIndex; i >= startColumnIndex; i--) {
          console.log(arr[endRowIndex][i]);
        }
        endRowIndex--;
      }
      if (startColumnIndex <= endColumnIndex) {
        for (let i = endRowIndex; i >= startRowIndex; i--) {
          console.log(arr[i][startColumnIndex]);
        }
        startColumnIndex++;
      }
    }
  }
  
  printSpiral([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ]);