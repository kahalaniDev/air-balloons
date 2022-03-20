import { useState } from "react";

export default function useToggle<T>(
  stages: T[]
): [state: T, toogle: () => void, reset: () => void] {
  const [state, setState] = useState(stages[0]);
  const toogle = () => {
    let newindex = stages.findIndex((stage) => stage === state) + 1;
    let newStage = stages[newindex % stages.length];
    setState(newStage);
  };
  const reset = () => {
    setState(stages[0]);
  };
  return [state, toogle, reset];
}
