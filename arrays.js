// Segregate even and odd numbers
//O(n) extra space
function segregate(arr) {
  if (Array.isArray(arr)) {
    const evenArr = arr.filter((element) => {
      return element % 2 === 0;
    });
    const oddArr = arr.filter((element) => {
      return element % 2 !== 0;
    });
    return [...evenArr, ...oddArr];
  }
  return "Given input was not an array";
}

// O(1) extra space

function segregate (arr){
	let start = 0;
  
  for(let i =0; i< arr.length; i++){
  	if(arr[i]%2 !== 0){
    	let temp = arr[start];
      arr[start] = arr[i];
      arr[i] = temp;
      start++;
    }
  }
  return arr;
}

console.log(segregate([2, 5, 3, 4, 6, 7, 8, 9]));
console.log(segregate([]));
console.log(segregate("Ola"));

// Rotate an array by given number of places

function rotate(k, arr) {
  let actualrotate = k;
  if (!Array.isArray(arr)) {
    return "Not an Array";
  } else if (k > arr.length) {
    actualrotate = k % arr.length;
  }
  const substituteArr = [];
  for (let i = 0; i < actualrotate; i++) {
    substituteArr.push(arr.shift());
  }
  return [...arr, ...substituteArr];
}

// left rotate in O(1) space

function rotate(arr, k){
 
  let n = arr.length;
  let mod = k%n;
  
  for(let i = 0; i<n ; i++){
      console.log(arr[(mod + i) %n])
  }
  
 }
 
console.log(rotate(3, [1, 2, 3, 4, 5, 6, 7, 8]));
console.log(rotate(30, [1, 2, 3, 4]));
console.log(rotate(30, "Ola"));

//sort an array in wave form

function swap(arr, leftIndex, rightIndex) {
  let temp = arr[rightIndex];
  arr[rightIndex] = arr[leftIndex];
  arr[leftIndex] = temp;
  return arr;
}
function waveSort(arr) {
  let arrCopy = [];
  if (!Array.isArray(arr)) {
    return "Not an Array";
  }
  arr.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < arr.length - 1; i = i + 2) {
    arrCopy = swap(arr, i, i + 1);
  }
  return arrCopy;
}

console.log(waveSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(waveSort([1, 2, 3, 4]));
console.log(waveSort("Ola"));

//count the number of possible triangels

function countTriangles(arr) {
  // Count of triangles
  let count = 0;
  let n = arr.length;
  // The three loops select three
  // different values from array
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // The innermost loop checks for
      // the triangle property
      for (let k = j + 1; k < n; k++)
        // Sum of two sides is greater
        // than the third
        if (
          arr[i] + arr[j] > arr[k] &&
          arr[i] + arr[k] > arr[j] &&
          arr[k] + arr[j] > arr[i]
        )
          count++;
    }
  }
  return count;
}

console.log(countTriangles([4, 6, 3, 7]));
console.log(countTriangles([10, 21, 22, 100, 101, 200, 300]));

//Find the element that appears once in an array where every other element appears more than once

function findSingle(arr) {
  let numHash = {};
  arr.forEach((num) => {
    if (numHash[num]) {
      numHash[num] = numHash[num] + 1;
    } else {
      numHash[num] = 1;
    }
  });
  for (let index in numHash) {
    if (numHash[index] === 1) {
      return parseInt(index);
    }
  }
}
console.log(findSingle([2, 3, 5, 4, 5, 3, 4]));
//console.log(findSingle([10, 21, 22, 100, 101, 200, 300]));

//Find the element that appears once in an array where every other element appears twice
function findSingle(arr) {
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res = res ^ arr[i];
  }
  return res;
}

console.log(findSingle([2, 3, 5, 4, 5, 3, 4]));

//Print all the leaders in an array
// i.e. print all the elements that are greater than the all other elements to its rhs

function printLeaders(arr) {
  let max_arr = arr[arr.length - 1];
  let leaders = [max_arr];
  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] > max_arr) {
      max_arr = arr[i];
      leaders.push(arr[i]);
    }
  }
  return leaders;
}

console.log(printLeaders([16, 17, 4, 3, 5, 2]));

//Find Subarray with given sum for all positive integers in the array O(n2)

function findSum(arr, sum) {
  if (!Array.isArray(arr)) {
    return "The given input is not a valid array";
  }
  let matchSum;
  let subArray = [];
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    matchSum = arr[i];
    subArray = [arr[i]];
    if (matchSum < sum) {
      for (let j = i + 1; j < n; j++) {
        matchSum = matchSum + arr[j];
        subArray.push(arr[j]);
        if (matchSum === sum) {
          return subArray;
        }
        if (matchSum > sum) {
          break;
        }
      }
    } else if (matchSum > sum) {
      continue;
    } else {
      return subArray;
    }
  }
}

console.log(findSum([1, 4, 20, 3, 10, 5], 33));
console.log(findSum([1, 4, 20, 3, 10, 5], 5));
console.log(findSum([1, 4, 20, 3, 10, 5], 3));

 //Find Subarray with given sum | Set 1 (Non-negative Numbers) O(N)


function subArraySum(arr, sum) {
    let n = arr.length;
    let checkSum = arr[0];
    let start = 0;
    for (let i = 1; i < n; i++) {
      checkSum = checkSum + arr[i];

      while (checkSum > sum && start < i) {
        checkSum = checkSum - arr[start];
        start++;
      }
      if (checkSum === sum) {
        return arr.slice(start, i + 1);
      }

    }
  }

  console.log(subArraySum([15, 2, 4, 8, 9, 5, 10, 23], 8));

//Rearrange positive and negative numbers in O(n) time and O(1) extra space

function rearrange(arr) {
  let n = arr.length;
  let j = -1;
  let temp = 0;
  let i;
  for (i = 0; i < n; i++) {
    if (arr[i] < 0) {
      j++;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let pos = j + 1;
  let neg = 0;
  while (pos < n && neg < pos && arr[neg] < 0) {
    temp = arr[neg];
    arr[neg] = arr[pos];
    arr[pos] = temp;
    neg = neg + 2;
    pos++;
  }
  return arr;
}

console.log(rearrange([-1, -7, -3, 4, 5, 6, 7, 8, 9]));

//find an element in sorted rotated array in O(logn) time.

function binarySearch(arr, l, r, key) {
  if (l > r) {
    return -1;
  }
  const mid = Math.floor((l + r) / 2);
  if (arr[mid] === key) {
    return mid;
  }
  if (arr[mid] > key) {
    return binarySearch(arr, l, mid - 1, key);
  }
  return binarySearch(arr, mid + 1, r, key);
}

function findPivot(arr, l, r) {
  if (l > r) {
    return -1;
  }
  const mid = Math.floor((l + r) / 2);
  
  if (arr[l] > arr[mid]) {
    return findPivot(arr, l, mid - 1);
  }
  if (arr[mid] > arr[r]) {
    return findPivot(arr, mid + 1, r);
  }
  if (arr[mid] > arr[mid + 1]) {
    return mid;
  }
  if (arr[mid] < arr[mid - 1]) {
    return mid - 1;
  }
  return -1; 
}

function findSortedRotated(arr, key) {
  const pivot = findPivot(arr, 0, arr.length - 1);

  let firstBinarySearchIndex = -1,
    secondBinarySearchIndex = -1;
console.log("pivot", pivot+1);
  if (pivot === -1) {
    firstBinarySearchIndex = binarySearch(arr, 0, arr.length - 1, key);
    if (firstBinarySearchIndex === -1) {
      return 'Element not found';
    }
    return firstBinarySearchIndex + 1;
  } else {
    firstBinarySearchIndex = binarySearch(arr, 0, pivot, key);
    secondBinarySearchIndex = binarySearch(arr, pivot + 1, arr.length - 1, key);
    if (firstBinarySearchIndex !== -1) {
      return firstBinarySearchIndex + 1;
    }
    return secondBinarySearchIndex + 1;
  }
}

console.log(findSortedRotated([5, 6, 7, 8, 9, 10,1,2,3,4], 2));


//find largest sum in a k subarray O(n*k).

function kWindow(arr, window) {
  if (window > arr.length) {
    return "Invalid";
  } else if (window === arr.length) {
    return arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  } else {
    let maxSum = 0;
    for (let i = 0; i < arr.length - window; i++) {
      let subArrSum = arr.slice(i, i + window).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      if (subArrSum > maxSum) {
        maxSum = subArrSum;
      }
    }
    return maxSum;
  }
}

console.log(kWindow([5, 6, 7, 8, 9, 10, 1, 2, 3], 3));

// Javascript code for
    // O(n) solution for finding
    // maximum sum of a subarray
    // of size k
    function maxSum(arr, n, k) {
        let max = 0;
        let sum = 0;
        // find initial sum of first k elements
        for (let i = 0; i < k; i++) {
            sum += arr[i];
            max = sum;
        }
        // iterate the array once
        // and increment the right edge
        for (let i = k; i < n; i++) {
            sum += arr[i] - arr[i - k];
             
            // compare if sum is more than max,
            // if yes then replace
            // max with new sum value
            if (sum > max) {
                max = sum;
            }
        }
        return max;
    }
 
// Driver code
document.write(maxSum([1, 4, 2, 10, 2, 3, 1, 0, 20], 9, 4));



// Function to calculate Kth largest sum of contagious subarray sums 0(N^2log(N^2))
function kthLargestSum(arr, N, K) {
  let result = [];

  // Generate all subarrays
  for (let i = 0; i < N; i++) {
    let sum = 0;
    for (let j = i; j < N; j++) {
      sum += arr[j];
      result.push(sum);
    }
  }

  // Sort in decreasing order
  result.sort();
  result.reverse();

  // return the Kth largest sum
  return result[K - 1];
}

// Driver's code
let a = [20, -5, -1];
let N = a.length;
let K = 3;

// Function call
document.write(kthLargestSum(a, N, K));


//Given an array arr[] of integers and a number x, 
//the task is to find the smallest subarray with a sum greater than the given value. 

function smallestSubArraySum(arr,val){
  let start =0;
  let sum =0;
  let size = 0;
  let minSize = 0;
  let startIndex = -1, endIndex=-1;
  let resArr = [];
  for(let i=0;i<arr.length;i++){
    sum = sum + arr[i];
    
    while(sum>val && start<i){
      sum = sum -arr[start];
      size = i-start;
      start++;
      if((size<minSize || minSize === 0) && sum >val){
        minSize = size;
        startIndex = start;
        endIndex= i;
        resArr = arr.slice(startIndex, endIndex+1);
      }
      else if(size===minSize){
        const currMaxSum = resArr.reduce((acc, curr)=> acc + curr,0);
        if(sum<currMaxSum && sum >val){
          resArr = arr.slice(start, i+1);
          startIndex = start;
        	endIndex= i;
        }
        
      }
    }
    
  }
  return resArr;
}

console.log(smallestSubArraySum([1, 4, 45, 6, 0, 19], 3));


//Given a sorted array of n distinct integers where each integer is in the range 
//from 0 to m-1 and m > n. Find the smallest number that is missing from the array.
//O(log N)


function findFirstMissing(array, start, end)
    {
        if (start > end)
            return end + 1;
   
        if (start != array[start])
            return start;
   
        let mid = parseInt((start + end) / 2, 10);
   
        // Left half has all elements from 0 to mid
        if (array[mid] == mid)
            return findFirstMissing(array, mid+1, end);
   
        return findFirstMissing(array, start, mid);
    }
 
    document.write("smallest Missing element is " +
    findFirstMissing([0, 1, 2, 3, 4, 5, 6, 7, 10], 0, 8));


 //Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements (A[i], A[j]) such that their sum is equal to X.


function twoPointers(arr, sum) {
    	
            let n = arr.length;
            let i =0;
            let j = n-1;
            let indexArr = []
            while( i != j){
                if(arr[i] + arr[j] > sum)
                  j--;
              else if(arr[i] + arr[j] < sum)
                  i++;
              else{
                  indexArr.push(i);
                indexArr.push(j);
                return (indexArr);
              }
            }
            return "Not found"
          }
      
          console.log(twoPointers([10, 20, 75, 35, 50, 80], 115));

// seletion sort

for(let i= 0; i<n-1; i++)
{
  for(let j= i+1; j<n; j++)
  {
    if(arr[i] > arr[j])
    {
      let temp = arr[i];
      arr[i]= arr[j];
      arr[j] = temp;
    }
  }
}

// bubble sort

for(let i=0; i<n; i++)
{
  for(let j=0; j<(n-i-1); j++)
  {
    if(arr[j] > arr[j+1])
    {
      let temp = arr[j];
      arr[j]= arr[j+1];
      arr[j+1] = temp;
    }
  }
}

// sort an array containing 0,1 and 2 in O(n) DutchNational Flag Problem

function sortInN(arr){
	let low =0, mid =0, hi = arr.length-1;
  let temp = 0;
  
  while(mid<hi){
    if(arr[mid] === 0){
    	temp = arr[mid];
      arr[mid] = arr[low];
      arr[low] = temp;
      low++;
      mid++;
    }
    else if(arr[mid] === 1){
    	mid++;
    }
    else{
    	temp = arr[mid];
      arr[mid] = arr[hi];
      arr[hi] = temp;
      hi--;
    }
  }
  return arr;
   
}

console.log(sortInN([2,2,2,2,1,1,0,1,1,1,0,0]))

      