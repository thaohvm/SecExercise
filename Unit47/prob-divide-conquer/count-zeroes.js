function countZeroes(arr) {
    let firstZero = findFirstZero(arr)
    if (firstZero === -1) return 0;
    return arr.length - firstZero
}

function findFirstZero(arr, left = 0, right = arr.length - 1) {
    if (right >= left) {
        let mid = left + Math.floor((right - left) / 2)
        if ((mid === 0 || arr[mid - 1] === 1) && (arr[mid] === 0)) {
            return mid;
        } else if (arr[mid - 1] === 0) {
            return findFirstZero(arr, left, mid - 1)
        } else {
            return findFirstZero(arr, mid + 1, right)
        }
    }
    return -1
}

module.exports = countZeroes
