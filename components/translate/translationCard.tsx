import ToolTip from "@components/shared/toolTip";
import Button from "@components/shared/button";
import { useState } from "react";
import Image from "next/image";

const TranslationCard = (props: any) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [moreInfo, setMoreInfo] = useState<boolean>(false);

  const changeVisibility = () => {
    setIsMinimized(!isMinimized);
  };

  const deleteCard = () => {
    props.removeCard();
  };

  const create_form_line = (formInfo: any) => {
    if (formInfo == "POS") {
      return "Part of Speech";
    } else if (formInfo == "X") {
      return "";
    }

    let form = `${
      formInfo.comparison == "unknown" ? "" : formInfo.comparison
    } ${formInfo.declension == "unknown" ? "" : formInfo.declension} ${
      formInfo.declension_type == "unknown" ? "" : formInfo.declension_type
    }
    ${formInfo.gender == "unknown" ? "" : formInfo.gender}
    ${formInfo.mood == "unknown" ? "" : formInfo.mood}
    ${formInfo.noun == "unknown" ? "" : formInfo.noun}
    ${formInfo.number == "unknown" ? "" : formInfo.number}
    ${formInfo.numeral == "unknown" ? "" : formInfo.numeral}
    ${formInfo.person == "unknown" ? "" : formInfo.person}
    ${formInfo.pos == "unknown" ? "" : formInfo.pos}
    ${formInfo.pronoun == "unknown" ? "" : formInfo.pronoun}
    ${formInfo.tense == "unknown" ? "" : formInfo.tense}
    ${formInfo.verb == "unknown" ? "" : formInfo.verb}
    ${formInfo.verb_type == "unknown" ? "" : formInfo.verb_type}
    ${formInfo.voice == "unknown" ? "" : formInfo.voice}`;

    return form;
  };

  const create_inflection_line = (inflectionInfo: any, stemInfo: any) => {
    const stem = stemInfo.orth;
    const ending = inflectionInfo.ending;
    const inflectionForm = inflectionInfo.form;

    let info = create_form_line(inflectionForm);

    let word = `${stem}.${ending}`;

    return `${word} | ${info}`;
  };

  return (
    <section
      className='bg-slate-50 bg-opacity-10 rounded flex flex-col p-4 shadow-card'
      key={props.data.word}
    >
      <section className='flex justify-between mb-3'>
        <div>
          <h2 className='text-3xl font-bold'>{props.data.word}</h2>
          {!isMinimized && props.data.definitions.length > 0 ? (
            <button
              className='text-primary-color hover:underline active:text-primary-color-dark'
              onClick={() => setMoreInfo(!moreInfo)}
            >
              {moreInfo ? "less info" : "more info"}
            </button>
          ) : null}
        </div>
        <div className='flex gap-3'>
          <ToolTip
            content={isMinimized ? "expand card" : "shrink card"}
            delay={20}
          >
            <Button onClick={changeVisibility} class='h-full'>
              {isMinimized ? (
                <Image
                  src='/plus.svg'
                  alt='expand card'
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src='/minus.svg'
                  alt='shrink card'
                  width={20}
                  height={20}
                />
              )}
            </Button>
          </ToolTip>
          <ToolTip content={"remove card"} delay={20}>
            <Button onClick={deleteCard} class='h-full'>
              <Image
                src='/clear.svg'
                alt='remove card'
                width={20}
                height={20}
              />
            </Button>
          </ToolTip>
        </div>
      </section>
      <section className={`${isMinimized ? "hidden" : ""} flex flex-col gap-3`}>
        {props.data.definitions.length > 0 ? (
          <>
            {props.data.definitions.map((definition: any) => (
              <div className='bg-slate-50 bg-opacity-25 rounded shadow-card p-2'>
                {definition.word ? (
                  <>
                    <div className='flex gap-3 text-2xl font-semibold'>
                      {definition.word.parts ? (
                        <>
                          {definition.word.parts.map((part: any) => (
                            <span>{part}</span>
                          ))}
                        </>
                      ) : null}
                      {definition.translation ? (
                        <>
                          {definition.translation.parts.map((part: any) => (
                            <span>{part}</span>
                          ))}
                        </>
                      ) : null}
                      {moreInfo ? (
                        <span className='text-primary-color'>
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
                        <div className='flex flex-wrap gap-2'>
                          <p>Tricks</p>
                          {definition.tricks.map((trick: any) => (
                            <p className='bg-primary-color bg-opacity-10 rounded px-2'>
                              {trick}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className='pl-2 py-2'>
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
                {definition.word.form ? (
                  <p>{create_form_line(definition.word.form)}</p>
                ) : (
                  <p>{create_form_line(definition.translation.form)}</p>
                )}
                {definition.inflections ? (
                  <div className='flex flex-col gap-2 my-3 w-fit'>
                    {definition.inflections.map((inflection: any) => (
                      <>
                        {inflection.ending ? (
                          <>
                            {create_inflection_line(
                              inflection,
                              definition.stem
                            ) == "" ? null : (
                              <span className='bg-opacity-10 rounded px-2'>
                                {create_inflection_line(
                                  inflection,
                                  definition.stem
                                )}
                              </span>
                            )}
                          </>
                        ) : null}
                      </>
                    ))}
                  </div>
                ) : null}
                <div className='flex flex-wrap gap-3'>
                  {definition.word.senses ? (
                    <>
                      {definition.word.senses.map((sense: any) => (
                        <p className=' bg-primary-color bg-opacity-10 rounded px-2'>
                          {sense}
                        </p>
                      ))}
                    </>
                  ) : null}
                  {definition.word.extension_senses ? (
                    <>
                      {definition.word.extension_senses.map((sense: any) => (
                        <p className=' bg-primary-color bg-opacity-10 rounded px-2'>
                          {sense}
                        </p>
                      ))}
                    </>
                  ) : null}
                  {definition.translation ? (
                    <>
                      {definition.translation.senses.map((sense: any) => (
                        <p className=' bg-primary-color bg-opacity-10 rounded px-2'>
                          {sense}
                        </p>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className='text-center'>No translations found</p>
        )}
      </section>
    </section>
  );
};

export default TranslationCard;
