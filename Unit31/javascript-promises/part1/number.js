let myNumber = 9;
let baseURL = "http://numbersapi.com";

// // 1
// $.get(`${baseURL}/${myNumber}?json`).then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })

// // 2

// let multiNumbers = [1, 3, 4, 6];
// $.get(`${baseURL}/${multiNumbers}?json`).then(data => {
//   console.log(data);
// });

// 3

let favNumbersPromise = [];
let numberOfFact = 1000;

for (i = 0; i < numberOfFact; i++) {
    const num = Math.floor(Math.random() * 999);
    const newRequest = axios.get(`${baseURL}/${num}?json`);
    favNumbersPromise.push(newRequest)
}

Promise.all(favNumbersPromise).then(facts => {
    facts.forEach(({data}) => $("body").append(`<p>${data.text}</p>`));
}).catch(err => console.log("Invalid data", err))
