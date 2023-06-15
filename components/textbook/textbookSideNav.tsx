import React, { useState } from "react";

const TextbookSideNav = ({ data, update }) => {
  const [activeItem, setActiveItem] = useState("INTRODUCTION");

  const newData = (content: string) => {
    update(content);
  };

  const handleItemClick = (item) => {
    newData(item.content);
    setActiveItem(item.path);
  };

  const renderNavItem = (item) => {
    if (item.name) {
      const subItems = Object.values(item).filter(
        value => typeof value === "object" && value !== null
      );

      return (
        <li key={item.path}>
          <span className="font-bold py-2 px-4">
            {item.name}
          </span>
          {subItems.length > 0 &&
            <ul className="ml-4">
              {subItems.map(subItem => renderNavItem(subItem))}
            </ul>}
        </li>
      );
    } else if (item.title) {

      if (item.path === activeItem) {
        newData(item.content);
      }

      return (
        <li key={item.path}>
          <button
            className={`py-2 px-4 text-left ${activeItem === item.path
              ? "text-blue-600"
              : ""}`}
            onClick={() => handleItemClick(item)}
          >
            {item.title}
          </button>
        </li>
      );
    }
    return null;
  };

  return (
    <section className="flex-auto w-3/12 bg-gray-100">
      <ul className="py-2">
        {renderNavItem(data)}
      </ul>
    </section>
  );
};

export default TextbookSideNav;
