import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import vendingMachineImg from "./VendingMachine.png";

function VendingMachine() {
    return (
        <div class="VendingMachine" style={{backgroundImage: `url(${vendingMachineImg})`}}>
            <div class="greeting">
                <p>Hello I am a vending Machine.</p>
                <p>What would you like to eat?</p>
            </div>
            <nav className="snacks">
                <h3><NavLink exact to="/soda">Soda</NavLink></h3>
                <h3><NavLink exact to="/chips">Chips</NavLink></h3>
                <h3><NavLink exact to="/Sardines">Fresh Sardines</NavLink></h3>
            </nav>
        </div>
    )
}

export default VendingMachine;
