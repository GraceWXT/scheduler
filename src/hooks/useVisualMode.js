import { useState } from "react";
const useVisualMode = (initialVal) => {
  const [ mode, setMode ] = useState(initialVal);
  return { mode };
};

export default useVisualMode;