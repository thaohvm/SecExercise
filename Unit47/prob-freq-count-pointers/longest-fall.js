// add whatever parameters you deem necessary
function longestFall(arr) {
    let longest = 0;
    let current = 1;
    if (arr.length === 0) return 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            current++;
            if (current > longest) {
                longest = current;
            }
        } else {
          current = 1;
        }
    }
    return longest || 1;
}
