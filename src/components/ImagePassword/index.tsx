import { FC, useEffect } from "react";
import { ImagePasswordCell } from "../ImagePasswordCell";
import styles from "./styles.module.css";

export const ImagePassword: FC<{
  state: boolean[][];
  setState: React.Dispatch<React.SetStateAction<boolean[][]>>;
  disabled: boolean;
}> = ({ state, setState, disabled }) => {
  const initState = () => {
    const position: boolean[][] = [];

    for (let x = 0; x < 10; x++) {
      const xAxis: boolean[] = [];

      for (let y = 0; y < 10; y++) {
        xAxis.push(false);
      }

      position.push(xAxis);
    }

    return position;
  };

  useEffect(() => {
    setState(initState());
  }, []);

  if (!state.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {new Array(10).fill(1).map((_, x) => {
        return new Array(10).fill(1).map((_, y) => {
          return (
            <ImagePasswordCell
              key={`${x}.${y}`}
              isChosen={state[x][y]}
              setChosen={() => {
                if (!disabled) {
                  setState((prev) => {
                    prev[x][y] = !prev[x][y];
                    return JSON.parse(JSON.stringify(prev));
                  });
                }
              }}
            />
          );
        });
      })}
    </div>
  );
};
