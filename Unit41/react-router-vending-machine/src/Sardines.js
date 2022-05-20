import React from 'react';
import { Link } from "react-router-dom";

function Sardines() {
    return (
        <div class="sardines">
            <h3>YOU DON'T EAT THE SARDINES.</h3>
            <h3>THE SARDINES EAT YOU!</h3>
            <Link to="/">GO BACK</Link>
        </div>
    )
}

export default Sardines;
