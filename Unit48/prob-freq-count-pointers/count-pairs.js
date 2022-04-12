// add whatever parameters you deem necessary
function countPairs(arr, num) {
    let counter = 0;
    let left = 0;
    let right = arr.length - 1
    arr.sort((a, b) => a - b);
    while (left < right) {
        if (arr[left] + arr[right] < num) {
            left++;
        } else if (arr[left] + arr[right] > num) {
            right--;
        } else {
            counter++;
            left++;
            right--;
        }
    }
    return counter;
}
