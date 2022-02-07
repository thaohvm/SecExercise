function calculateMean(nums) {
    const total = nums.reduce((acc, num) => {
        return acc + parseInt(num);
    }, 0);
    return total/nums.length;
}

function calculateMedian(nums) {
    let midIdx = Math.floor(nums.length/2);
    let median;
    if (nums.length % 2 != 0) {
        median = nums[midIdx];
    } else {
        median = (nums[midIdx] + nums[midIdx - 1]) / 2
    };
    return median;
}

function elementCounter(arr) {
    let counter = {};
    for (i = 0; i < arr.length; i++) {
      let key = arr[i];
      if (counter[key] === undefined) {
        counter[key] = 1;
      } else {
        counter[key]++;
      }
    }
    return counter;
  }

  function calculateMode(arr) {
    let freqCounter = elementCounter(arr)
    let count = 0;
    let mostFrequent;
    for (let key in freqCounter) {
      if (freqCounter[key] > count) {
        mostFrequent = key;
        count = freqCounter[key];
      }
    }
    return mostFrequent;
  }

module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode
}
