import React, { useState, useEffect } from "react";
import "../styles/dragndrop.css";
import Card from "./Card";
import dragndropIcon from "../assets/images/dragndrop.png";

const DragNDrop = ({ data, titleSection, currentTab }) => {
  const [dragItem, setDragItem] = useState();
  const [list, setList] = useState([...data]);
  const [isChecked, setIsChecked] = useState(false);
  const [border, setBorder] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDragStart = (index) => {
    setDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    e.target.style.boderColor = "#3BCEC7";
    const newList = [...list];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setList(newList);
  };

  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "white";
  };

  const handleDrop = (e) => {
    e.target.style.backgroundColor = "white";
  };

  const handleCheckItem = (item, event) => {
    let arrayItems = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].item == item) {
        list[i].isChecked = !list[i].isChecked;
        arrayItems.push(list[i]);
      } else {
        arrayItems.push(list[i]);
        event.target.style.borderColor = "#c5cbe0";
      }
    }
    setList(arrayItems);
  };

  const handleCheckAllItems = (item, event) => {
    let arrayItems = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === false) {
        list[i].isChecked = true;
        arrayItems.push(list[i]);
        setSelectAll(true);
      } else {
        list[i].isChecked = true;
        arrayItems.push(list[i]);
        setSelectAll(true);
      }
    }
    setList(arrayItems);
  };

  const handleUncheckAllItems = (item, event) => {
    let arrayItems = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === true) {
        list[i].isChecked = false;
        arrayItems.push(list[i]);
        setSelectAll(false);
      } else {
        list[i].isChecked = false;
        arrayItems.push(list[i]);
        setSelectAll(false);
      }
    }
    setList(arrayItems);
  };

  return (
    <>
      <div className="container-dnd">
        <h3>{titleSection.toUpperCase()}</h3>
        {currentTab === 0 && (
          <button
            className="dnd-links"
            draggable
            onClick={() =>
              selectAll !== true
                ? handleCheckAllItems()
                : handleUncheckAllItems()
            }
          >
            {selectAll !== true
              ? `Select all ${titleSection}`
              : `Unselect all ${titleSection}`}
          </button>
        )}
        <span>Due date (Optional)</span>
      </div>

      <ul className="dnd">
        {list &&
          list.map((item, index) => (
            <li
              draggable={currentTab === 0 ? "false" : "true"}
              key={index}
              onDragStart={() => currentTab !== 0 && handleDragStart(index)}
              onDragEnter={(e) => currentTab !== 0 && handleDragEnter(e, index)}
              onDragLeave={(e) => currentTab !== 0 && handleDragLeave(e)}
              onDrop={(e) => currentTab !== 0 && handleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              <label className="label">
                <div className="label-card">
                  {currentTab !== 0 && (
                    <img
                      className="dnd-icon"
                      src={dragndropIcon}
                      alt="Drag and drop Icon"
                      width="30"
                    />
                  )}
                  <input
                    className="input"
                    type="checkbox"
                    name={item.name}
                    value={item.name}
                    checked={item.isChecked}
                    onChange={(e) => handleCheckItem(item.item, e)}
                  />
                  <Card
                    border={border}
                    item={item.item}
                    isChecked={item.isChecked}
                    component={
                      item.isChecked && (
                        <div className="input-date-card">
                          <span>Due Date (Optional):</span>
                          <input
                            className="date"
                            type="date"
                            id="date2"
                            name="date2"
                          />
                          <input type="time" id="time" name="time" />
                        </div>
                      )
                    }
                  />
                </div>
                {item.isChecked && (
                  <div className="input-date">
                    <span>Due Date (Optional):</span>
                    <input type="date" id="date2" name="date2" />
                    <input type="time" id="time" name="time" />
                  </div>
                )}
              </label>
            </li>
          ))}
      </ul>
    </>
  );
};

export default DragNDrop;
