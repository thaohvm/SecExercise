function sortedFrequency(arr, val) {
    let first = findFirst(arr, val)
    console.log(first)
    let last = findLast(arr, val)
    console.log(last)
    if (first === -1 || last === -1) {
        return -1
    }
    return last - first + 1
}

function findFirst(arr, val, left = 0, right = arr.length - 1) {
    if (right >= left) {
        let mid = Math.floor((right + left) / 2)
        if ((mid === 0 || arr[mid - 1] < val) && (arr[mid] === val)) {
            return mid
        } else if (arr[mid] < val) {
            return findFirst(arr, val, mid + 1, right)
        } else {
            return findFirst(arr, val, left, mid - 1)
        }
    }
    return -1
}

function findLast(arr, val, left = 0, right = arr.length - 1) {
    if (right >= left) {
        let mid = Math.floor((right + left) / 2)
        if ((mid === arr.length - 1 || arr[mid + 1] > val) && (arr[mid] === val)) {
            return mid
        } else if (arr[mid] > val) {
            return findLast(arr, val, left, mid - 1)
        } else {
            return findLast(arr, val, mid + 1, right)
        }
    }
    return -1
}

module.exports = sortedFrequency
