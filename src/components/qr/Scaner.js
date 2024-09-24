import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { UpcScan } from "react-bootstrap-icons";

const MyScaner = () => {
  const [state, setState] = useState({
    result: "No result",
  });

  const [isRunningScan, setIsRunningScan] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data,
      });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleOnClick = () => {
    setIsRunningScan(true);
  };

  return (
    <div>
      {!isRunningScan && (
        <button
          className="submit"
          className="btn btn-primary mt-1 mb-2"
          onClick={handleOnClick}
        >
          <UpcScan />
        </button>
      )}
      {isRunningScan && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}
      <p>{state.result}</p>
    </div>
  );
};

export default MyScaner;
