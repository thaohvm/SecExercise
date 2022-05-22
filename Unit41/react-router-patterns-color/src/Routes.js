import React, {useState, useEffect} from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import ColorList from './ColorList';
import Color from './Color';
import NewColorForm from './NewColorForm';


function Routes() {
    const initColors = JSON.parse(localStorage.getItem("colors")) || {
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF"
    }
    const [colors, updateColors] = useState(initColors);

    useEffect(
        () => localStorage.setItem("color", JSON.stringify(colors)), [colors]
    );

    function handleAdd(newColor) {
        updateColors(prevColors => ({ ...prevColors, ...newColor}))
    }
    function renderCurrentColor(props) {
        const { color } = props.match.params;
        const hex = colors[color];
        return <Color {...props} hex={hex} color={color} />;
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/colors">
                    <ColorList colors={colors}/>
                </Route>
                <Route exact path="/colors/new">
                    <NewColorForm addColor={handleAdd}/>
                </Route>
                <Route path="/colors/:color" render={renderCurrentColor} />
                <Redirect to="/colors" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
