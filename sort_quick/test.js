function quickSort(arr, i, j) {
  if (i >= j) return;

  let basic = arr[i];
  let index = i;
  let left = i;
  let right = j;
  while(right > left) {
    for(; right > left; right--) {
      if (arr[right] < basic) {
        let temp = arr[right];
        arr[right] = arr[left];
        arr[left] = temp;
        index = right;
        break;
      }
    }
    left++;
    while(right > left) {
      if (arr[left] > basic) {
        let temp = arr[right];
        arr[right] = arr[left];
        arr[left] = temp;
        index = left;
        break;
      }
      left++;
    }
    if (right > left) {
      right -= 1;
    }
  }
  quickSort(arr, i, index - 1);
  quickSort(arr, index + 1, j)
}

const arr = [12, 23, 0, 323, 56, 2];
// const arr = [2, 23, 0, 323, 56, 12];
// const arr = [2, 12, 0, 323, 56, 23];


/**
 * basic = 12 ,right = 5 left = 0;
 * right = 5; arr[right] = 12; [2, 23, 0, 323, 56, 12]
 * left = 1 arr[left] = 23 > 12; right = 5 ; [2, 12, 0, 323, 56, 23] 
 * left = 1; right = 2 arr[right] = 0 < 12; [2, 0, 12, 323, 56, 23] 

 */
quickSort(arr, 0, arr.length - 1);
console.log('result: ', arr);


// function() {

//   while(left < right) {
    
//   }
// }