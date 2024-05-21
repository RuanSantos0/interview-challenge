import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([])

  const handleClick = (event) => {
    console.log({ event });

    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    console.log(newDot);
    setList((prev) => [...prev, newDot]);
    setUndid([])
  };

  const handleUndo = (event) => {
    event.stopPropagation()

    if(list.length === 0){
      return;
    }

    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])
    
    setList((prev) => {
      const newArray = [...prev].slice(0,-1)
      return newArray;
    })
  }

  const handleRedo = (event) => {
    event.stopPropagation()

    if(undid.length === 0){
      return;
    }

    const recoveredDot = undid[undid.length - 1]
    

    setUndid((prev) => {
      const newArray = [...prev].slice(0,-1)
      return newArray;
    })

    setList((prev) => [...prev, recoveredDot])
  }

  return (
    <div id="page" onClick={handleClick}>
      <button className="button" onClick={handleUndo}>Desfazer</button>
      <button className="button" onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span key={index} className="dot" style={{left: item.clientX, top: item.clientY}} />
      ))}
    </div>
  );
}

export default App;
