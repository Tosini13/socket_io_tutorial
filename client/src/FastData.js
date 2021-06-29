import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function FastData() {
  const [response, setResponse] = useState();

  useEffect(() => {
    const socket = socketIoClient(ENDPOINT);

    socket.on("FastData", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  const fetchData = React.useCallback(() => response, [response]);

  console.log("response", response);
  return (
    <div>
      {fetchData()?.map((el) => (
        <div
          key={el.id}
          style={{ display: "flex", flexDirection: "row", width: "300px" }}
        >
          <div style={{ width: "150px" }}>{el?.left}</div>
          <div style={{ width: "150px" }}>{el?.right}</div>
        </div>
      ))}
    </div>
  );
}

export default FastData;
