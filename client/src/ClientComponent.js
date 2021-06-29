import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function ClientComponent() {
  const [response, setResponse] = useState();

  useEffect(() => {
    const socket = socketIoClient(ENDPOINT);

    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <p>
      It's time
      <time dateTime={response} style={{ marginLeft: "5px" }}>
        {response}
      </time>
    </p>
  );
}

export default ClientComponent;
