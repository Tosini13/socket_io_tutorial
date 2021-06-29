import React, { useState } from "react";
import ClientComponent from "./ClientComponent";
import FastData from "./FastData";

function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <>
      <button onClick={() => setLoadClient((prevState) => !prevState)}>
        {loadClient ? "STOP" : "START"} Sockets
      </button>
      {loadClient ? <ClientComponent /> : null}
      {loadClient ? <FastData /> : null}
    </>
  );
}

export default App;
