"use client";

import { useState } from "react";

export default function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleClick = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <section className="bg-white rounded-2xl p-4 shadow-card transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-between" onClick={handleClick}>
        <h3 className="text-xl font-medium cursor-pointer">{question}</h3>
        <button onClick={handleClick} className="text-highlight-color">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#496bbe"
            viewBox="0 0 20 20"
            width="25px"
            height="25px"
            className={`transform transition-transform duration-500 ${
              isAnswerVisible ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={`${isAnswerVisible ? "block" : "hidden"} mt-2`}>
        <p className="text-text-color text-left">{answer}</p>
      </div>
    </section>
  );
}
