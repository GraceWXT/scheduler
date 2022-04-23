import { useState } from "react";
const useVisualMode = (initialVal) => {
  const [ mode, setMode ] = useState(initialVal);
  const transition  = (mode) => setMode(mode);
  return { mode, transition };
};

export default useVisualMode;