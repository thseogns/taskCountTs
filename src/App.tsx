/** @format */

import "./App.css";
import React from "react";
import Counter from "./component/Counter";
import AddCount from "./component/AddCount";

function App() {
  const [countData, setCountData] = React.useState<
    Array<{
      name: string;
      count: number;
    }>
  >([]);
  React.useEffect(() => {
    const storedData = localStorage.getItem("countData");
    if (storedData) {
      setCountData(JSON.parse(storedData));
      console.log("전달");
    }
  }, []);
  React.useEffect(() => {
    if (countData.length > 0) {
      localStorage.setItem("countData", JSON.stringify(countData));
    }
  }, [countData]);

  const addNameHandler = (name: string) => {
    if (countData.some((data) => data.name === name)) {
      // 이미 같은 이름이 추가되어 있는 경우 경고 메시지를 표시합니다.
      alert("서승현씨 이미 같은 이름이 추가되어 있습니다.");
    } else {
      setCountData([...countData, { name, count: 0 }]);
    }
  };

  const deleteNameHandler = (name: string) => {
    const updatedData = countData.filter((data) => data.name !== name);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setCountData(updatedData);
  };
  const addCounterHandler = (count: number, countKey: string) => {
    const existingDataIndex = countData.findIndex(
      (item) => item.name === countKey
    );
    console.log(count);
    if (existingDataIndex !== -1) {
      const updatedData = [...countData];
      console.log(count);
      updatedData[existingDataIndex].count = count;
      setCountData(updatedData);
    } else {
      const newCountData = {
        name: countKey,
        count: count,
      };

      setCountData([...countData, newCountData]);
    }
  };
  console.log(countData);
  return (
    <div className="aling">
      <AddCount addName={addNameHandler} />
      <div className="border">
        {countData.map((data) => (
          <div
            key={data.name}
            className={
              countData.length === 1
                ? "firstBorder"
                : countData.length === 2
                ? "twin"
                : "flex"
            }
          >
            <Counter
              name={data.name}
              countKey={data.name}
              localCount={data.count}
              addCounter={addCounterHandler}
            />

            <button
              className="delete"
              onClick={() => deleteNameHandler(data.name)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
