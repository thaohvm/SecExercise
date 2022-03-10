function App() {
    return (
        <div>
            <Tweet username="test123" name="u1" date="June 21st" message="This is the first message"/>
            <Tweet username="test123" name="u1" date="June 21st" message="This is the first message"/>
            <Tweet username="test123" name="u1" date="June 21st" message="This is the first message"/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById("root"))
