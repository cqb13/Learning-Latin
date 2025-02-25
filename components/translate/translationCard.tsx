"use client";

import ToolTip from "@/components/shared/toolTip";
import Button from "@/components/shared/button";
import { useState } from "react";
import Image from "next/image";

const TranslationCard = ({
  kind,
  data,
  removeCard,
}: {
  kind: "latin" | "english";
  data: any;
  removeCard: () => void;
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [moreInfo, setMoreInfo] = useState<boolean>(false);

  const changeVisibility = () => {
    setIsMinimized(!isMinimized);
  };

  const deleteCard = () => {
    removeCard();
  };

  const createLatinFormLine = (form: any) => {
    if (typeof form == "string") {
      return form;
    }

    let formString = `${form.comparison == "unknown" ? "" : form.comparison} ${
      form.declension == "unknown" ? "" : form.declension
    } ${form.declension_type == "unknown" ? "" : form.declension_type}
    ${form.gender == "unknown" ? "" : form.gender}
    ${form.mood == "unknown" ? "" : form.mood}
    ${form.noun == "unknown" ? "" : form.noun}
    ${form.number == "unknown" ? "" : form.number}
    ${form.numeral == "unknown" ? "" : form.numeral}
    ${form.person == "unknown" ? "" : form.person}
    ${form.pos == "unknown" ? "" : form.pos}
    ${form.pronoun == "unknown" ? "" : form.pronoun}
    ${form.tense == "unknown" ? "" : form.tense}
    ${form.verb == "unknown" ? "" : form.verb}
    ${form.verb_type == "unknown" ? "" : form.verb_type}
    ${form.voice == "unknown" ? "" : form.voice}`;

    return formString;
  };

  const createInflectionLine = (inflectionInfo: any, stemInfo: any) => {
    const stem = stemInfo.orth;
    const ending = inflectionInfo.ending;
    const inflectionForm = inflectionInfo.form;

    let info = createLatinFormLine(inflectionForm);

    if (info == "") {
      return "";
    }

    let word = `${stem}.${ending}`;

    return `${word} | ${info}`;
  };

  return (
    <section
      className="bg-slate-50 bg-opacity-10 rounded flex flex-col p-4 shadow-card"
      key={data.word}
    >
      <section className="flex justify-between mb-3">
        <div>
          <h2 className="text-3xl font-bold">{data.word}</h2>
          {!isMinimized && data.definitions.length > 0 ? (
            <button
              className="text-primary-color hover:underline active:text-primary-color-dark"
              onClick={() => setMoreInfo(!moreInfo)}
            >
              {moreInfo ? "less info" : "more info"}
            </button>
          ) : null}
        </div>
        <div className="flex gap-3">
          <ToolTip
            content={isMinimized ? "expand card" : "shrink card"}
            delay={20}
          >
            <Button onClick={changeVisibility} class="h-full">
              {isMinimized ? (
                <Image
                  src="/plus.svg"
                  alt="expand card"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/minus.svg"
                  alt="shrink card"
                  width={20}
                  height={20}
                />
              )}
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
        {data.definitions.length > 0 ? (
          <>
            {data.definitions.map((definition: any, i: number) => (
              <div
                className="bg-slate-50 bg-opacity-25 rounded shadow-card p-2"
                key={i}
              >
                {definition.word ? (
                  <>
                    <div className="flex gap-3 text-2xl font-semibold">
                      {definition.word.parts ? (
                        <>
                          {definition.word.parts.map((part: any, k: number) => (
                            <span key={k}>{part}</span>
                          ))}
                        </>
                      ) : null}
                      {definition.translation ? (
                        <>
                          {definition.translation.parts.map(
                            (part: any, k: number) => (
                              <span key={k}>{part}</span>
                            ),
                          )}
                        </>
                      ) : null}
                      {moreInfo ? (
                        <span className="text-primary-color">
                          word id:{" "}
                          {definition.word.id
                            ? definition.word.id
                            : definition.word.wid}
                        </span>
                      ) : null}
                    </div>
                  </>
                ) : null}
                {moreInfo ? (
                  <>
                    <div>
                      {definition.tricks ? (
                        <div className="flex flex-wrap gap-2">
                          <p>Tricks</p>
                          {definition.tricks.map((trick: any, k: number) => (
                            <p
                              className="bg-primary-color bg-opacity-10 rounded px-2"
                              key={k}
                            >
                              {trick}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-2 py-2">
                      {definition.word.info ? (
                        <>
                          <p>Age: {definition.word.info.age}</p>
                          <p>Area: {definition.word.info.area}</p>
                          <p>Origin: {definition.word.info.geo}</p>
                          <p>Frequency: {definition.word.info.freq}</p>
                          <p>Source: {definition.word.info.source}</p>
                        </>
                      ) : (
                        <>
                          <p>Age: {definition.translation.info.age}</p>
                          <p>Area: {definition.translation.info.area}</p>
                          <p>Origin: {definition.translation.info.geo}</p>
                          <p>Frequency: {definition.translation.info.freq}</p>
                          <p>Source: {definition.translation.info.source}</p>
                        </>
                      )}
                    </div>
                  </>
                ) : null}
                {definition.word.pos ? (
                  <p>{definition.word.pos}</p>
                ) : (
                  <p>{definition.translation.pos}</p>
                )}
                {kind == "latin" && definition.word.form ? (
                  <p>{createLatinFormLine(definition.word.form)}</p>
                ) : null}
                {kind == "english" && definition.translation.form ? (
                  <p>{createLatinFormLine(definition.translation.form)}</p>
                ) : null}
                {definition.inflections ? (
                  <div className="flex flex-col gap-2 my-3 w-fit">
                    {definition.inflections.map((inflection: any) => (
                      <>
                        {inflection.ending ? (
                          <>
                            {createInflectionLine(
                              inflection,
                              definition.stem,
                            ) == "" ? null : (
                              <span className="bg-opacity-10 rounded px-2">
                                {createInflectionLine(
                                  inflection,
                                  definition.stem,
                                )}
                              </span>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-3">
                  {definition.word.senses ? (
                    <>
                      {definition.word.senses.map((sense: any, k: number) => (
                        <p
                          className=" bg-primary-color bg-opacity-10 rounded px-2"
                          key={k}
                        >
                          {sense}
                        </p>
                      ))}
                    </>
                  ) : null}
                  {definition.word.extension_senses ? (
                    <>
                      {definition.word.extension_senses.map(
                        (sense: any, k: number) => (
                          <p
                            className=" bg-primary-color bg-opacity-10 rounded px-2"
                            key={k}
                          >
                            {sense}
                          </p>
                        ),
                      )}
                    </>
                  ) : null}
                  {definition.translation ? (
                    <>
                      {definition.translation.senses.map(
                        (sense: any, k: number) => (
                          <p
                            className=" bg-primary-color bg-opacity-10 rounded px-2"
                            key={k}
                          >
                            {sense}
                          </p>
                        ),
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center">No translations found</p>
        )}
      </section>
    </section>
  );
};

export default TranslationCard;
