import React, { useState, useEffect } from "react";
import "../styles/tab.css";
import DragNDrop from "./DragNDrop";

const oficialData = [
  {
    category: "Social Innovation",
    categoryItems: [
      {
        nameSection: "Ideation",
        sectionItems: [
          { id: 1, item: "problem", isChecked: false },
          { id: 2, item: "solution", isChecked: false },
          { id: 3, item: "Team", isChecked: false },
        ],
      },
      {
        nameSection: "Validation",
        sectionItems: [
          { id: 1, item: "ecosystem", isChecked: false },
          { id: 2, item: "results", isChecked: false },
        ],
      },
    ],
  },
  {
    category: "Social Innovation2",
    categoryItems: [
      {
        nameSection: "Ideation2",
        sectionItems: [
          { id: 1, item: "problem2", isChecked: false },
          { id: 2, item: "solution2", isChecked: false },
          { id: 3, item: "Team2", isChecked: false },
        ],
      },
      {
        nameSection: "Validation2",
        sectionItems: [
          { id: 1, item: "ecosystem2", isChecked: false },
          { id: 2, item: "results2", isChecked: false },
        ],
      },
    ],
  },
];

const Tab = () => {
  const [data, setData] = useState([...oficialData]);
  const [fullData, setFullData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [infoTab, setInfoTab] = useState([]);

  const handleClick = (item, index) => {
    setInfoTab([]);
    setCurrentTab(index + 1);
    let categories = item.categoryItems.map((category) => {
      return category.sectionItems;
    });

    let currentInfo = categories
      .map((item) => {
        return item;
      })
      .reduce((a, b) => a.concat(b));
    setInfoTab(currentInfo);
    setFullData([]);
  };

  const handleClickSelect = (e) => {
    setInfoTab([]);
    let index = Number(e.target.value);
    setCurrentTab(index);
    let categories = data[index - 1].categoryItems.map((category) => {
      return category.sectionItems;
    });

    let currentInfo = categories
      .map((item) => {
        return item;
      })
      .reduce((a, b) => a.concat(b));
    setInfoTab(currentInfo);
    setFullData([]);
  };

  const handleClickAll = () => {
    setFullData([]);
    setCurrentTab(0);
    let categories = data.map((category) => {
      let categoryItems = category.categoryItems.map((item) => {
        return item;
      });

      return categoryItems;
    });

    let allItems = categories
      .map((item) => {
        return item;
      })
      .reduce((a, b) => a.concat(b));
    setFullData(allItems);
    setInfoTab([]);
  };

  return (
    <div className="container-tab">
      <div className="tabtitle">
        <button className="tablinks" draggable onClick={() => handleClickAll()}>
          All
        </button>
        <button key="All" className="tablinks" disabled>
          Templates
        </button>
        {data.map((item, index) => (
          <button
            key={item.category}
            className="tablinks"
            draggable
            onClick={() => handleClick(item, index)}
            disabled={item.name === "Templates" && true}
          >
            {item.category}
          </button>
        ))}
      </div>
      <div className="tabtitle-mobile">
        <button
          className="button-tabtitle-mobile"
          draggable
          onClick={() => handleClickAll()}
        >
          All
        </button>
        <select
          className="select-tabtitle-mobile"
          name="template"
          value={currentTab}
          onChange={handleClickSelect}
        >
          {data.map((item, index) => (
            <option value={index + 1}>{item.category}</option>
          ))}
        </select>
      </div>
      <div className="tabcontent">
        {currentTab >= 1
          ? infoTab && (
              <DragNDrop
                data={infoTab}
                titleSection={data[currentTab - 1].category}
              />
            )
          : currentTab === 0
          ? fullData &&
            fullData.map((item, index) => (
              <>
                <DragNDrop
                  data={item.sectionItems}
                  titleSection={item.nameSection}
                  currentTab={currentTab}
                />
              </>
            ))
          : null}
      </div>
    </div>
  );
};

export default Tab;
