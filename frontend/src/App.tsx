import logo from "./assets/convo_talk_logo.jpg";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
      <img src={logo} alt="Convo Talk Logo" className="h-72 w-72" />
    </div>
  );
}

export default App;
