import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import {v4 as uuid} from 'uuid';
import './Deck.css';

const BASE_URL = "http://deckofcardsapi.com/api/deck/"

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const intervalId = useRef();

    useEffect(() => {
        const fetchDeckId = async () => {
            const deckResult = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck(deckResult.data.deck_id);
        }
        fetchDeckId();
    }, [setDeck]);

    const fetchNewCard = async () => {
        try {
            let drawResult = await axios.get(`${BASE_URL}/${deck}/draw/?count=2`);
            console.log(drawResult)
            if (drawResult.data.remaining === 0) {
                throw new Error("No cards remaining!")
            }
            let cardImg = drawResult.data.cards[0].image;
            console.log(cardImg)
            const newCard =
                <Card key={uuid()} image={cardImg}/>;
            setCards(cards => [...cards, newCard]);
        }
        catch (err) {
            alert(err);
        }
    }

    const handleDraw = () => {
        fetchNewCard();
    }

    const drawInterval = () => {
        intervalId.current = setInterval(fetchNewCard, 1000);
        setAutoDraw(autoDraw => true);
    }

    const stopDrawing = () => {
        clearInterval(intervalId.current);
        intervalId.current = null;
        setAutoDraw(autoDraw => false);
    }
    return (
        <div className='Deck'>
            <h3>DeckID: {deck ? deck : "Loading..."}</h3>
            <button onClick={handleDraw} className='Deck-gimme'>GIMME A CARD!</button>
            {autoDraw ? <button className='Deck-autodraw' onClick={stopDrawing}>Stop Drawing</button> : <button className='Deck-autodraw' onClick={drawInterval}>Auto Draw</button>}
            <div className='Deck-cardarea'>{cards}</div>

        </div>
    )
}
export default Deck;
