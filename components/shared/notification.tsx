"use client";

import { useState, useEffect } from "react";

type Props = {
  title: string;
  type: "success" | "error" | "warning";
  message: string;
  timeout: number;
  updateNotificationAction: (value: boolean) => void;
};

export default function Notification({
  title,
  type,
  message,
  timeout,
  updateNotificationAction: updateNotification,
}: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(false);
      updateNotification(false);
    }, timeout);
    return () => clearTimeout(timer);
  });

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
    }
  };

  return (
    <section
      className={`${
        opened ? "" : "fixed bottom-2 left-2"
      } p-4 w-80 ${getBgColor()} rounded-md`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-white">{title}</h1>
        <button
          className="text-white"
          onClick={() => updateNotification(false)}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.147a.5.5 0 00-.708.708L9.293 10l-4.147 4.146a.5.5 0 10.708.708L10 10.707l4.146 4.147a.5.5 0 00.708-.708L10.707 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="text-white">{message}</p>
    </section>
  );
}
