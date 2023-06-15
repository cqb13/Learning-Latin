import textBookMap from "@prop-types/textbookMap";
import React, { useState } from "react";

const TextbookSideNav = ({
  data,
  update
}: {
  data: any;
  update: (content: string) => void;
}) => {
  const [activeItem, setActiveItem] = useState("INTRODUCTION");

  const newData = (content: string) => {
    update(content);
  };

  const handleItemClick = (item: textBookMap) => {
    if (item.path === undefined || item.content === undefined) return;
    newData(item.content);
    setActiveItem(item.path);
  };

  const renderNavItem = (item: textBookMap) => {
    if (item.name) {
      const subItems = Object.values(item).filter(
        value => typeof value === "object" && value !== null
      );

      return (
        <li key={item.path}>
          <span className="font-bold py-2 px-4 cursor-default">
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
        if (item.content === undefined) return;
        newData(item.content);
      }

      return (
        <li key={item.path}>
          <button
            className={`py-2 px-4 text-left hover:text-primary-color-dark ${activeItem ===
            item.path
              ? "text-primary-color"
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
    <section className="flex-auto w-3/12 bg-slate-50 bg-opacity-10 rounded shadow-card overflow-y-auto max-sm:w-5/12">
      <ul className="py-2">
        {renderNavItem(data)}
      </ul>
    </section>
  );
};

export default TextbookSideNav;
