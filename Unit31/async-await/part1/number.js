let baseURL = "http://numbersapi.com";

// 1
async function getFavNum(favNum) {
    let res = await axios.get(`${baseURL}/${favNum}?json`)
    console.log("Part1: ", res.data)
}
getFavNum(7)

// 2
async function getFacts(favNums) {
    let res = await axios.get(`${baseURL}/${favNums}?json`)
    console.log("Part2: ",res.data)
    for (let key of Object.keys(res.data)) {
        console.log(res.data[key])
        const facts = document.querySelector("#part2")
        facts.append(res.data[key])
    }
}
getFacts([1,3,5,7,9])

// 3
favNumbersPromise = []
async function get4Facts(num) {
    for (i = 0; i < 4; i++) {
        const res = await axios.get(`${baseURL}/${num}?json`);
        favNumbersPromise.push(res)
    }
    Promise.all(favNumbersPromise).then(facts => {
        facts.forEach(({data}) => $("#part3").append(`<p>${data.text}</p>`));
    }).catch(err => console.log("Invalid data", err))
}

get4Facts(9)
