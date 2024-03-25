//Print all subsequences of a string
//Input : abc
//Output : a, b, c, ab, bc, ac, abc, ""
// total outcomes = 2^n. Time complexity = 2^(n)

function printSubSequence(input, output){
    	
    if(input.length === 0){
        console.log(output);
        //console.log('\n');
      return;
    }
    
    printSubSequence(input.substring(1), output + input[0]);
    printSubSequence(input.substring(1), output);
  }
  
  printSubSequence("abcd", "");

//Print all valid spaces in a string
//Input : abc
//Output : a bc, ab c, a b c, abc
// total spaces = (n-1). time complexity = 2^(n-1)

  function printSpace( input, output){
    	
    if(input.length === 0){
        console.log(output.trim());
      return;
    }
  printSpace(input.substring(1), output + " " + input[0])
  printSpace(input.substring(1), output + input[0])
}
let str = "abcd";
printSpace( str.substring(1), str[0]);

// K’th Non-repeating Character

function kthNonRepeating(str, k){
	const strHash = {};
  for(let i=0; i<str.length; i++){
  	if(!strHash[str[i]]){
    	strHash[str[i]] =1;
    }else{
    	strHash[str[i]] += 1;
    }
  }
  let count =0;
  let kNonRepeatingChar = '';
  for(let i=0; i<str.length; i++){
  	if(strHash[str[i]] === 1){
    	count++;
      if(count === k){
      	kNonRepeatingChar = str[i];
        break;
      }
    }
  }
  if(kNonRepeatingChar === '')
  	return "Less than k non-repeating characters in input";
  return kNonRepeatingChar;
}

console.log(kthNonRepeating("geeksforgeeks", 3));

// Count number of binary strings without consecutive 1’s
//Input:  N = 2
//Output: 3
// The 3 strings are 00, 01, 10

function bninaryNonRepeating(num) {
  const bianryCount = Math.pow(2, num);
  let nonRepeatingBinary = 0;
  for (let i = 0; i < bianryCount; i++) {
    let str = i.toString(2);
    let strArr = str.split('');
    let count = 0
    for (let j = 0; j < (strArr.length - 1); j++) {
      if (strArr[j] === strArr[j + 1] && strArr[j] === '1') {
        count = 1;
        break;
      }
    }
    if(count === 0){
    	nonRepeatingBinary++;
    }
  }
  return nonRepeatingBinary;
}

console.log(bninaryNonRepeating(4));


// Count of total anagram substrings
//Input  : str = “xyyx”
//Output : 4
//Total substrings of this string which
//are anagram to each other are 4 which 
//can be enumerated as,
//{“x”, “x”}, {"y", "y"}, {“xy”, “yx”}, 
//{xyy”, “yyx”}

function countAnagrams(str) {
  let anagaramCount =0;
  let strHash = {};
  	for(let i=0 ; i<str.length; i++){
    	let subStr = "";
    	for(let j=i; j<str.length; j++){
      	subStr = (subStr + str[j]).split('').sort().join('');
        if(strHash[subStr])
        	anagaramCount++;
        else
        	strHash[subStr] = 1;
      }
    }
    return anagaramCount;
}

console.log(countAnagrams("xyyx"));

// check Pallindrome

function checkPallindrome(str){
	
  let strCopy = str.split('').reverse().join('');
  if(strCopy === str)
  	return true;
  return false;
}
console.log(checkPallindrome("xyyx"));

// Check if characters of a given string can be rearranged to form a palindrome

//A set of characters can form a palindrome if at most one character occurs an odd number of times and all other characters occur an even number of times.

function checkPallindrome(str){
	
  let strHash = {};
  let oddCount = 0;
  str.split('').forEach((char) => {
  	if(strHash[char]){
    	strHash[char] = strHash[char] + 1;
    }else{
   	 strHash[char] =1;
    }
  });
  
  for(let property in strHash){
  	if(strHash[property] % 2 !== 0){
    	oddCount++;
    }
  }
  if(oddCount <= 1)
  	return true;
  return false; 
}
console.log(checkPallindrome("abcac"));

//Lexicographically next string

/* Input : geeks
Output : geekt
The last character 's' is changed to 't'.

Input : raavz
Output : raawz
Since we can't increase last character, 
we increment previous character.

Input :  zzz
Output : zzza

Input :  ""
Output : a
*/

function lexicoNext(str) {
  let strCopyArr = str.split('');
  let changeFlag = 0;
  for (let i = strCopyArr.length - 1; i > 0; i--) {
    if (strCopyArr[i] !== 'z') {
      strCopyArr[i] = String.fromCharCode(str.charCodeAt(i) + 1);
      changeFlag = 1;
      return strCopyArr.join('');
    }
  }
  if (changeFlag === 0) {
    strCopyArr.push('a');
    return strCopyArr.join('');
  }
}

console.log(lexicoNext(""));


function findLongestNonRepeatingSubstring(str){

  let startIndex = 0;
  let endIndex = 0;
  let strHash = {};
  let largestSubstring = "";
  let finalStartIndex = 0;
  let finalEndIndex = 0;
    for(endIndex; endIndex < str.length; endIndex++){
      if(strHash[str[endIndex]] === undefined){
        strHash[str[endIndex]] =1;
      }else{
        if(endIndex-startIndex > largestSubstring.length){
          largestSubstring = str.substring(startIndex, endIndex);
          finalStartIndex = startIndex;
          finalEndIndex = endIndex-1;
        }
        while(startIndex < endIndex){
          if(str[startIndex] !== str[endIndex]){
            strHash[str[startIndex]] = undefined;
            startIndex ++;
          }else{
            startIndex ++;
            break;
          }
        }
      }
    }
    if(endIndex-startIndex > largestSubstring.length){
        largestSubstring = str.substring(startIndex, endIndex);
        finalStartIndex = startIndex;
          finalEndIndex = endIndex-1;
     }
     return {
         value: largestSubstring,
        start: finalStartIndex,
        end: finalEndIndex
     }
} 

// Given a string s, return the longest 
// palindromic
 
// substring
//  in s.

 

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"


var longestPalindrome = function(s) {
  let leftPtr = 0;
   let rightPtr = 0;
   let palSubstring = "";
   let isSEven = (s.length%2 === 0);
   let flag = false;
   let longsetPalSubstring = s[0]
  for(let i = 0; i< s.length; i++){
       leftPtr =i;
       rightPtr = i;
       palSubstring = "";
       flag = false;
       while(leftPtr>-1 && rightPtr<s.length){
           if(s[leftPtr] === s[rightPtr]){
               palSubstring = s.substring(leftPtr, (rightPtr +1));
               if(palSubstring.length > longsetPalSubstring.length){
                   longsetPalSubstring = palSubstring;
               }
           }
           if(isSEven && !flag){
               rightPtr++;
               flag = true;
           }else{
               rightPtr++;
               leftPtr--;
           }
       }
  }
  return longsetPalSubstring;
};




/* function printSpiralMatrix(arr){
  
  let startRowIndex = 0;
  let startColumnIndex = 0;
  let endRowIndex = arr.length-1;
  let endColumnIndex = arr[0].length-1;
  
  while(startRowIndex <= endRowIndex && startColumnIndex <= endColumnIndex){
    for(let i=startColumnIndex; i<=endColumnIndex; i++){
      console.log(arr[startRowIndex][i]);
    }
    startRowIndex++;
    for(let i=startRowIndex; i<=endRowIndex; i++){
      console.log(arr[i][endColumnIndex]);
    }
    endColumnIndex--;
    
    if(startRowIndex<=endRowIndex){
      for(let i=endColumnIndex; i>=startColumnIndex; i--){
      console.log(arr[endRowIndex][i]);
    }
      endRowIndex--;
    }
    
    if(startColumnIndex<=endColumnIndex){
      for(let i=endRowIndex; i>=startRowIndex; i--){
      console.log(arr[i][startColumnIndex]);
    }
      startColumnIndex++;
    }
    
  }
}

console.log(printSpiralMatrix([
    [1, 2, 3, 4,12],
    [5, 6, 7, 8, 13],
    [9, 10, 11, 12,14],
    [13, 14, 15, 16,17]
  ])); */
  
  function printDFS(node){
  	if(node === null){
    	   return;
    }
    printDFS(node.lchild);
    console.log(node.data)
    printDFS(node.rchild);
  }
  
  function printBFS(node){
  	if(node === null){
    	   return;
    }
    printBFS(node.lchild);
    printBFS(node.rchild);
    console.log(node.data)
  }