/** product: calculate the product of an array of numbers. */
// product([2, 3, 4])   // 24

function product(nums, idx = 0) {
  if (idx === nums.length) return 1;
  return nums[idx] * product(nums, idx + 1);
}

/** longest: return the length of the longest word in an array of words. */
// longest(["hello", "hi", "hola"])  // 5

function longest(words, idx = 0, longestCount = 0) {
  if (idx == words.length) return longestCount;
  longestCount = Math.max(words[idx].length, longestCount);
  return longest(words, idx + 1, longestCount);
}

/** everyOther: return a string with every other letter. */
// everyOther("hello")  // "hlo"

function everyOther(str, idx = 0, newStr = "") {
  if (idx >= str.length) return newStr;
  newStr += str[idx];
  return everyOther(str, idx + 2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */
// isPalindrome("tacocat")  // true
// isPalindrome("tacodog")  // false

function isPalindrome(str, idx = 0) {
  let left = idx;
  let right = str.length - idx - 1;
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;
  return isPalindrome(str, idx + 1)
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
// let animals = ["duck", "cat", "pony"];

// findIndex(animals, "cat");  // 1
// findIndex(animals, "porcupine");   // -1

function findIndex(arr, val, idx = 0) {
  if (idx === arr.length) return -1;
  if (arr[idx] === val) return idx;
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */
// revString("porcupine") // 'enipucrop'

function revString(str, idx = 0, newStr = "") {
  if (newStr.length === str.length) return newStr;
  newStr += str[str.length - 1 - idx];
  return revString(str, idx + 1, newStr)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key]);
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]))
  }
  return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

// binarySearch([1,2,3,4],1) // 0
// binarySearch([1,2,3,4],3) // 2
// binarySearch([1,2,3,4],5) // -1

function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  let mid = Math.floor((right + left) / 2);
  if (arr[mid] < val) {
    return binarySearch(arr, val, mid + 1, right);
  } else if (arr[mid] > val) {
    return binarySearch(arr, val, left, mid - 1);
  } else {
    return mid
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
