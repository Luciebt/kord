import { useCallback } from "react";
import { unPressElementsStyleWithoutEvent } from "./unPressElementStyle";

export const usePressedState = (pressedClass: string) => {
  const handlePress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      unPressElementsStyleWithoutEvent(pressedClass);
      event.currentTarget.classList.add(pressedClass);
    },
    [pressedClass]
  );

  return handlePress;
};
