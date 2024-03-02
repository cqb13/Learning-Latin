import useScreenWidth from "@hooks/useScreenWidth";
import textBookMap from "@prop-types/textbookMap";
import Button from "@components/shared/button";
import { useState } from "react";
import Image from "next/image";

const TextbookSideNav = ({
  data,
  open,
  update,
  updateSideBarVisibility
}: {
  data: any;
  open: boolean;
  update: (content: string) => void;
  updateSideBarVisibility: (newState: boolean) => void;
}) => {
  const [activeItem, setActiveItem] = useState("INTRODUCTION");

  const newData = (content: string) => {
    update(content);
  };

  const handleItemClick = (item: textBookMap) => {
    if (item.path === undefined || item.content === undefined) return;
    newData(item.content);
    setActiveItem(item.path);
    if (window.innerWidth < 800) updateSideBarVisibility(false);
  };

  const renderNavItem = (item: textBookMap) => {
    if (item.name) {
      const subItems = Object.values(item).filter(
        (value) => typeof value === "object" && value !== null
      );

      return (
        <li key={item.path}>
          <span className='font-bold py-2 px-4 cursor-default'>
            {item.name}
          </span>
          {subItems.length > 0 && (
            <ul className='ml-4'>
              {subItems.map((subItem) => renderNavItem(subItem))}
            </ul>
          )}
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
            className={`py-2 px-4 text-left hover:text-primary-color-dark ${
              activeItem === item.path ? "text-primary-color" : ""
            }`}
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
    <section
      className={`shadow-card flex sticky top-14 rounded-lg rounded-tl-none rounded-bl-none h-[86vh] overflow-y-scroll animate-slideIn
      ${useScreenWidth(800) && !open ? "hidden w-full mr-5" : ""}`}
    >
      <ul className='py-2'>{renderNavItem(data)}</ul>
      <Button
        class='mdLg:hidden child:w-5 child:h-5 w-fit h-fit rounded-2xl rounded-tr-none rounded-br-none my-2'
        onClick={() => updateSideBarVisibility(false)}
      >
        <Image src='/arrowLeft.svg' alt='Close' width={50} height={50} />
      </Button>
    </section>
  );
};

export default TextbookSideNav;
