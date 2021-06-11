import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [mValue, setmValue] = useState(0);
  const [money, setMoney] = useState(0);
  const [isInComing, setisInComing] = useState(true);

  function addItem(value, mValue, isInComing) {
    const data = {
      value: value,
      id: Math.floor(Math.random() * 10000),
      mValue: mValue,
      isInComing: isInComing
    };
    setList([...list, data]);
  }
  function remove(id) {
    const newList = list.filter(e => e.id !== id);
    setList([...newList]);
    list.map(e =>
      setMoney(
        e.isInComing ? money - parseInt(e.mValue) : money + parseInt(e.mValue)
      )
    );
  }

  function add() {
    addItem(value, mValue, isInComing);
    setValue("");
    setmValue(0);
    setisInComing(true);
    setMoney(isInComing ? money + parseInt(mValue) : money - parseInt(mValue));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value && !mValue) {
      return;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="tetel col m-2 p-2">
          <h1>Új tétel</h1>
          <input
            className="m-2"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div className="col">
            <form onSubmit={handleSubmit}>
              <input
                className="m-2"
                type="number"
                value={mValue}
                onChange={e => setmValue(e.target.value)}
              />
              <input
                checked="checked"
                className="m-2"
                type="radio"
                name="kibev"
                id="bevetel"
                onClick={() => setisInComing(true)}
              />
              <label htmlFor="bevetel">Bevétel</label>
              <input
                className="m-2"
                type="radio"
                name="kibev"
                id="kiadas"
                onClick={() => setisInComing(false)}
              />
              <label htmlFor="kiadas">Kiadás</label>
              <button className="btn btn-primary m-2" onClick={add}>
                Hozzáadás
              </button>
            </form>
          </div>
        </div>
        <div className="penz col m-2 p-2">
          <h1>Egyenleg</h1>
          <h5 className={`${money > 0 ? "positive" : "negative"}`}>
            {money} HUF
          </h5>
          <div className="row">
            <h6 className="col">{parseInt(money / 360)} EUR</h6>
            <h6 className="col">{parseInt(money / 297)} USD</h6>
            <h6 className="col">{parseInt(money / 414)} GBP</h6>
          </div>
        </div>
      </div>
      <div>
        {list.map(e => (
          <div className={`${!e.isInComing ? "negative m-2" : "positive m-2"}`}>
            {e.value} {e.mValue} HUF
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => remove(e.id)}
            >
              Törlés
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
