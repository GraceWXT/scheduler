import { useState } from "react";
const useVisualMode = (initialVal) => {
  const [ mode, setMode ] = useState(initialVal);
  const [ history, setHistory ] = useState([initialVal]);

  const transition  = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev].slice(0, -1));
    }
    setMode(mode);
    setHistory(prev => [...prev, mode]);
  };
  const back = () => {
    if (history.length <= 1) return;
    setMode(history[history.length - 2 ]);
    setHistory(prev => [...prev].slice(0, -1));
  };

  return { mode, transition, back };
};

export default useVisualMode;