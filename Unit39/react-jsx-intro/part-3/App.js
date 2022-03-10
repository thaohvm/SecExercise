function App() {
    return (
        <div>
            <Person
                name="Homer"
                age={38}
                hobbies={["bowling", "watching tv", "drinking beer"]}
            />
            <Person
                name="Linda"
                age={12}
                hobbies={["bowling", "watching tv", "drinking beer"]}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
