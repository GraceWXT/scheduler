import { useState } from "react";

/** A custom hook that keeps track of the visual mode (of the appointment body)
 * and mode history, and provides functions to transition to another mode
 * or go back to a previous mode
 */
const useVisualMode = (initialVal) => {
  const [ mode, setMode ] = useState(initialVal);
  const [ history, setHistory ] = useState([initialVal]);

  /** A function that sets the mode and add the mode to the history.
   * The second parameter defaults to false.
   * If it's set to true, the new mode will replace the last mode in the history. */
  const transition  = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev].slice(0, -1));
    }
    setMode(mode);
    setHistory(prev => [...prev, mode]);
  };

  /** A function that sets the mode to the previous one in the history,
   * and removes the current one from the histroy. */
  const back = () => {
    if (history.length <= 1) return;
    setMode(history[history.length - 2 ]);
    setHistory(prev => [...prev].slice(0, -1));
  };

  return { mode, transition, back };
};

export default useVisualMode;