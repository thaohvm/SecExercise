// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    let counter1 = new Map();
    let counter2 = new Map();
    let str1 = num1.toString();
    let str2 = num2.toString();

    for (let i = 0; i < str1.length; i++) {
        counter1[str1[i]] = (counter1[str1[i]] || 0) + 1;
    }
    for (let i = 0; i < str2.length; i++) {
        counter2[str2[i]] = (counter2[str2[i]] || 0) + 1;
    }
    for (let key in counter1) {
        if (counter1[key] !== counter2[key]) return false;
    }
    return true;
}
