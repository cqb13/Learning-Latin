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
    <section className="block fixed rounded z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-3/12 max-sm:w-5/12 h-max-[calc(100vh-4.5rem)] pb-10 px-8 overflow-y-auto bg-slate-50 bg-opacity-10 shadow-card">
      <ul className="py-2">
        {renderNavItem(data)}
      </ul>
    </section>
  );
};

export default TextbookSideNav;
