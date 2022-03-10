function App() {
    return (
        <div>
            <FirstComponent />
            <NamedComponent name="Annie"/>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
