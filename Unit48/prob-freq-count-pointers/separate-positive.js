function separatePositive(arr) {
    const swap = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }
    let i = 0;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] >= 0) {
            swap(arr, i, j);
            i++;
        }
    }
    return arr;
}
