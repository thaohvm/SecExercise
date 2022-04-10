// add whatever parameters you deem necessary
function averagePair(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        if ((arr[left] + arr[right]) > target * 2) {
            right--;
        } else if ((arr[left] + arr[right]) < target * 2) {
            left++;
        } else if ((arr[left] + arr[right]) == target * 2) {
            return true;
        }
    }
    return false
}
