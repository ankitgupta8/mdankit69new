import { useState } from "react";

const useTheme = (initialValue = "clean") => {
  const [state, setState] = useState(initialValue);
  return [state, setState];
};

export default useTheme;
