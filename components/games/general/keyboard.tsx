import { useEffect, useState } from "react";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyStats: {
    [key: string]: "correct" | "incorrect" | "default";
  };
  locked?: boolean;
};

type KeyValue = "ENTER" | "DELETE";

const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  keyStats,
  locked
}: Props) => {
  const [valueOfKeys, setValueOfKeys] = useState();

  const onClick = (value: KeyValue) => {
    if (locked) {
      return;
    }

    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    if (locked) {
      return;
    }

    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        onEnter();
      } else if (event.code === "Backspace") {
        onDelete();
      } else {
        const key = event.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className='flex justify-center mb-1 gap-2'>
        <Key value='Q' onClick={onClick} status={keyStats["Q"]} />
        <Key value='W' onClick={onClick} status={keyStats["W"]} />
        <Key value='E' onClick={onClick} status={keyStats["E"]} />
        <Key value='R' onClick={onClick} status={keyStats["R"]} />
        <Key value='T' onClick={onClick} status={keyStats["T"]} />
        <Key value='Y' onClick={onClick} status={keyStats["Y"]} />
        <Key value='U' onClick={onClick} status={keyStats["U"]} />
        <Key value='I' onClick={onClick} status={keyStats["I"]} />
        <Key value='O' onClick={onClick} status={keyStats["O"]} />
        <Key value='P' onClick={onClick} status={keyStats["P"]} />
      </div>
      <div className='flex justify-center mb-1 gap-2'>
        <Key value='A' onClick={onClick} status={keyStats["A"]} />
        <Key value='S' onClick={onClick} status={keyStats["S"]} />
        <Key value='D' onClick={onClick} status={keyStats["D"]} />
        <Key value='F' onClick={onClick} status={keyStats["F"]} />
        <Key value='G' onClick={onClick} status={keyStats["G"]} />
        <Key value='H' onClick={onClick} status={keyStats["H"]} />
        <Key value='J' onClick={onClick} status={keyStats["J"]} />
        <Key value='K' onClick={onClick} status={keyStats["K"]} />
        <Key value='L' onClick={onClick} status={keyStats["L"]} />
      </div>
      <div className='flex justify-center gap-2'>
        <Key
          value='ENTER'
          onClick={onClick}
          status={keyStats["DELETE"]}
          className='max-md:hidden'
        />
        <Key value='Z' onClick={onClick} status={keyStats["Z"]} />
        <Key value='X' onClick={onClick} status={keyStats["X"]} />
        <Key value='C' onClick={onClick} status={keyStats["C"]} />
        <Key value='V' onClick={onClick} status={keyStats["V"]} />
        <Key value='B' onClick={onClick} status={keyStats["B"]} />
        <Key value='N' onClick={onClick} status={keyStats["N"]} />
        <Key value='M' onClick={onClick} status={keyStats["M"]} />
        <Key
          value='DELETE'
          onClick={onClick}
          status={keyStats["ENTER"]}
          className='max-md:hidden'
        />
      </div>
      <div className='mt-1 flex gap-2 md:hidden'>
        <Key
          value='ENTER'
          onClick={onClick}
          status={keyStats["ENTER"]}
          className='flex-grow'
        />
        <Key
          value='DELETE'
          onClick={onClick}
          status={keyStats["DELETE"]}
          className='flex-grow'
        />
      </div>
    </div>
  );
};

type KeyProps = {
  value: string;
  onClick: (value: KeyValue) => void;
  status: "correct" | "incorrect" | "default";
  className?: string;
};

const Key = ({ value, onClick, status, className }: KeyProps) => {
  const width = value.length === 1 ? "w-12" : "w-32";

  const color =
    status === "correct"
      ? "bg-green-500"
      : status === "incorrect"
      ? "bg-red-500"
      : "bg-white";
  return (
    <div
      className={`${width} ${color} bg-opacity-30 backdrop-blur-sm text-3xl max-sm:text-xl max-xs:text-lg max-xs:p-1 p-2 border border-neutral-300 rounded flex justify-center items-center cursor-pointer hover:bg-opacity-70 transition-colors ${className}`}
      onClick={() => onClick(value as KeyValue)}
    >
      {value}
    </div>
  );
};

export default Keyboard;
