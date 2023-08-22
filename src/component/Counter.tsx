/** @format */

import React from "react";
import styles from "./Counter.module.css";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
const Counter = ({ name, countKey, localCount, addCounter }: any) => {
  const [count, setCount] = React.useState<number>(localCount ? localCount : 0);
  React.useEffect(() => {
    addCounter(count, countKey);
  }, [count]);

  const countUpHandler = () => {
    setCount((prev) => prev + 1);
  };

  const countDownHandler = () => {
    if (count === 0) return;
    setCount((prev) => prev - 1);
  };
  return (
    <div className={styles.decorator}>
      <div className={styles.counterName}>{name}</div>
      <div className={styles.countDeco}>
        <button aria-label="Increment value" onClick={countUpHandler}>
          <BiSolidUpArrow />
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={countDownHandler}>
          <BiSolidDownArrow />
        </button>
      </div>
    </div>
  );
};
export default Counter;
