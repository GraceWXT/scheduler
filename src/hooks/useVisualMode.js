import { useState } from "react";
const useVisualMode = (initialVal) => {
  const [ mode, setMode ] = useState(initialVal);
  const [history, setHistory] = useState([initialVal]);

  const transition  = (mode) => {
    setMode(mode);
    setHistory(prev => [...prev, mode]);
  };
  const back = () => {
    setMode(history[history.length - 2 ]);
    setHistory([...history].slice(0, -1));
  };

  return { mode, transition, back };
};

export default useVisualMode;