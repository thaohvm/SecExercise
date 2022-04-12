// add whatever parameters you deem necessary
function freqCounter(word) {
    let counter = new Map();
    for (let i = 0; i < word.length; i++) {
        let char = word[i];
        if (counter[char] !== undefined) {
            counter[char]++;
        } else {
            counter[char] = 1;
        }
    }
    return counter;
}
function constructNote(message, letters) {
    if (message.length > letters.length) return false;
    let lettersCounter = freqCounter(letters);
    let messageCounter = freqCounter(message);
    for (let key in messageCounter) {
        if (!lettersCounter[key]) {
            return false
        }
        if (messageCounter[key] > lettersCounter[key]) {
            return false;
        }
    }
    return true;
}
