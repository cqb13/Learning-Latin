import Button from "./button";
import { useState } from "react";
import ToolTip from "./toolTip";
import Image from "next/image";

const TranslationCard = (props: any) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const changeVisibility = () => {
    setIsMinimized(!isMinimized);
  };

  const deleteCard = () => {
    props.removeCard();
  };

  const data = () => {
    console.log(props.data);
  };

  data();

  return (
    <section className="bg-slate-50 bg-opacity-10 rounded flex flex-col p-4 shadow-card" key={props.data.word}>
      <section className="flex justify-between mb-3">
        <h2 className="text-3xl font-bold">
          {props.data.word}
        </h2>
        <div className="flex gap-3">
          <ToolTip
            content={isMinimized ? "expand card" : "shrink card"}
            delay={20}
          >
            <Button onClick={changeVisibility} class="h-full">
              {isMinimized
                ? <Image
                    src="/plus.svg"
                    alt="expand card"
                    width={20}
                    height={20}
                  />
                : <Image
                    src="/minus.svg"
                    alt="shrink card"
                    width={20}
                    height={20}
                  />}
            </Button>
          </ToolTip>
          <ToolTip content={"remove card"} delay={20}>
            <Button onClick={deleteCard} class="h-full">
              <Image
                src="/clear.svg"
                alt="remove card"
                width={20}
                height={20}
              />
            </Button>
          </ToolTip>
        </div>
      </section>
      <section className={`${isMinimized ? "hidden" : ""} flex flex-col gap-3`}>
        {props.data.defs.length > 0 ? (
          <>
            {props.data.defs.map((def: any) => {
              return (
                <div className="bg-slate-50 bg-opacity-25 rounded shadow-card p-2">
                  <div className="flex gap-3 text-2xl font-semibold">
                    {def.orth.map((orth: string) => {
                      return (
                        <p>
                          {orth}
                        </p>
                      )
                    })}
                  </div>
                  <p>{def.info.gender != "unknown"? def.info.gender : ""} {def.info.pos != "POS"? def.info.pos : ""}</p>
                  {def.infls ? (
                    <div className="flex flex-col gap-2 my-3 w-fit">
                      {def.infls.map((infl: any) => {
                        return (
                          <span className="bg-opacity-10 rounded px-2">
                            {infl.stem}{infl.ending? `.${infl.ending}` : ""}
                            {infl.stem? ` | ` : ""}
                            {" "}{infl.form.number && infl.form.number != "unknown"? ` ${infl.form.number} ` : ""}
                            {infl.pos} 
                            {infl.form.declension && infl.form.declension != "unknown"? ` ${infl.form.declension}` : ""}
                            {infl.form.gender && infl.form.gender != "unknown"? ` ${infl.form.gender}` : ""}
                            {infl.form.tense && infl.form.tense != "unknown"? ` ${infl.form.tense}` : ""}
                            {infl.form.voice && infl.form.voice != "unknown"? ` ${infl.form.voice}` : ""}
                            {infl.form.mood && infl.form.mood != "unknown"? ` ${infl.form.mood}` : ""}
                            {infl.form.person && infl.form.person != "unknown"? ` ${infl.form.person}` : ""}
                          </span>
                        )
                      })}
                    </div>
                      
                  ) : (
                    null
                  )}
                  <div className="flex flex-wrap gap-3">
                  {def.senses.map((sense: string) => {
                    return (
                      <p className=" bg-primary-color bg-opacity-10 rounded px-2">
                        {sense}
                      </p>
                    )
                  })}
                  </div>
                </div>
              );
            })
            }
          </>
        ) : (
          <div>
            <p>Sorry, your word was not found</p>
            <p>Please double check spelling, confirm words existence</p>
            <p>You believe that program should have found you word, please open in issue in our github repo</p>
            <a href="https://github.com/Templar-Development/Open-Words-TS/issues/new/choose">Open Words TS</a>
          </div>
        )}
      </section>
    </section>
  );
};

export default TranslationCard;
