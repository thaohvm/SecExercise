let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1
async function drawCard() {
    let res = await axios.get(`${baseURL}/new/draw`);
    console.log(res.data)
    console.log(res.data.cards[0].code)
    console.log(res.data.cards[0].image)
    // let deckId = res.data.cards[0].deck_id;
    displayCard(res.data.cards[0])
}

async function displayCard(card) {
    const $cardArea = $("#card-area");
    const $cardImg = $('<img></img>');
    $cardImg.attr('src', card.image);
    $cardArea.append($cardImg)
}
// 2
async function drawSameDeckCard() {
    let firstCard = await axios.get(`${baseURL}/new`);
    console.log(firstCard.data.deck_id)
    let deckId = firstCard.data.deck_id;
    let nextCard = await axios.get(`${baseURL}/${deckId}/draw`);
    console.log(nextCard.data.cards[0].image)
    displayCard(nextCard.data.cards[0])
}

// 3

async function start() {
    let deck = await axios.get(`${baseURL}/new/shuffle`);
    $("#btn").on('click', async function() {
        console.log("click")
        let cardData = await axios.get(`${baseURL}/${deck.data.deck_id}/draw/`);
        console.log(cardData)
        displayCard(cardData.data.cards[0])
    })
}

start()
