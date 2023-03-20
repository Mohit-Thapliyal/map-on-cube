import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Map from "./components/Map";
import SceneWithSpinningBoxes from "./components/SceneWithSpinningBox";
import html2canvas from "html2canvas";

const App = () => {
  const compToPrint = useRef();
  const [texture, setTexture] = useState("dummy");
  const [boxVisible, setBoxVisible] = useState(true);

  useEffect(() => {
    setBoxVisible(true);
  }, [boxVisible]);

  const handleClick2 = async () => {
    if (!compToPrint.current) {
      throw new Error("'node' must be a RefObject");
    }
    const element = ReactDOM.findDOMNode(compToPrint.current);
    return html2canvas(element, {
      scrollY: -window.scrollY,
      useCORS: true,
    }).then((canvas) => {
      const newImage = canvas.toDataURL("image/png", 1.0);
      setTexture(newImage);
      setBoxVisible(false);
    });
  };

  return (
    <div className="px-10 py-5 bg-purple-100 flex flex-col gap-y-10 items-center min-h-screen">
      <h1 className="self-stretch py-4 text-purple-600 font-semibold text-lg shadow-md text-center bg-white rounded-md">
        Choose a location and covert it into the cube's skin
      </h1>
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-3 w-full">
        <div className="text-lg font-medium text-purple-500 py-3 bg-white shadow-md rounded-md text-center">Select Map</div>
        <div className="text-lg font-medium text-purple-500 py-3 bg-white shadow-md rounded-md text-center">Cube</div>
        <div className="flex flex-grow flex-col justify-center items-center rounded-md py-5 bg-white shadow-md">
          <div className=" h-64 w-64 lg:h-96 lg:w-96 rounded-md overflow-hidden">
            <Map ref={compToPrint} />
          </div>
        </div>
        <div className="flex flex-grow flex-col justify-center items-center rounded-md p-2 bg-white shadow-md">
          <div className="w-5/6 rounded-md overflow-hidden">
            {boxVisible && <SceneWithSpinningBoxes texture={texture} />}
          </div>
        </div>
      </div>
      <button
        onClick={() => handleClick2()}
        className="w-fit py-3 px-10 text-purple-600 font-semibold cursor-pointer hover:bg-slate-50 active:bg-purple-300 text-xl shadow-md bg-white rounded-md"
      >
        Generate the cube
      </button>
    </div>
  );
};

export default App;
