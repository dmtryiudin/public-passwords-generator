import { FC } from "react";
import styles from "./styles.module.css";

export const ImagePasswordCell: FC<{
  isChosen: boolean;
  setChosen: () => void;
}> = ({ isChosen, setChosen }) => {
  return (
    <button
      className={isChosen ? styles.cellFilled : styles.cell}
      onClick={setChosen}
    ></button>
  );
};
