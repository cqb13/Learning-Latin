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

  const create_form_line = (word: any) => {
    if (word.pos == "noun") {
      return `${word.form.declension} ${word.form.gender} ${word.pos}`;
    } else if (word.pos == "verb" || word.pos == "participle") {
      return `${word.form.kind} ${word.pos}`;
    } else if (word.pos == "adjective") {
      return `${word.form.declension} ${word.pos}`;
    } else {
      return `${word.pos}`;
    }
  };

  const create_inflection_line = (inflectionInfo: any, stemInfo: any) => {
    const stem = stemInfo.orth;
    const ending = inflectionInfo.ending;
    const inflectionForm = inflectionInfo.form;

    const declension = inflectionForm.declension;
    const number = inflectionForm.number;
    const gender = inflectionForm.gender;
    const tense = inflectionForm.tense;
    const voice = inflectionForm.voice;
    const mood = inflectionForm.mood;
    const verb = inflectionForm.verb;
    const kind = inflectionForm.kind;

    if (
      declension == "unknown" ||
      number == "unknown" ||
      gender == "unknown" ||
      tense == "unknown" ||
      voice == "unknown" ||
      mood == "unknown" ||
      verb == "unknown" ||
      kind == "unknown"
    ) {
      return "";
    }

    return `${stem}.${ending} | ${number} ${inflectionInfo.pos} ${declension} ${gender} ${tense} ${voice} ${mood} ${verb} ${kind}`;
  };

  return (
    <section
      className='bg-slate-50 bg-opacity-10 rounded flex flex-col p-4 shadow-card'
      key={props.data.word}
    >
      <section className='flex justify-between mb-3'>
        <div>
          <h2 className='text-3xl font-bold'>{props.data.word}</h2>
          <button
            className='text-primary-color hover:underline active:text-primary-color-dark'
            onClick={() => setMoreInfo(!moreInfo)}
          >
            {moreInfo ? "less info" : "more info"}
          </button>
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
                      ) : (
                        <>
                          {definition.translation.parts.map((part: any) => (
                            <span>{part}</span>
                          ))}
                        </>
                      )}
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
                          <p>Area: {definition.word.info.age}</p>
                          <p>Origin: {definition.word.info.age}</p>
                          <p>Frequency: {definition.word.info.age}</p>
                          <p>Source: {definition.word.info.age}</p>
                        </>
                      ) : (
                        <>
                          <p>Age: {definition.translation.info.age}</p>
                          <p>Area: {definition.translation.info.age}</p>
                          <p>Origin: {definition.translation.info.age}</p>
                          <p>Frequency: {definition.translation.info.age}</p>
                          <p>Source: {definition.translation.info.age}</p>
                        </>
                      )}
                    </div>
                  </>
                ) : null}
                {definition.word.form ? (
                  <p>{create_form_line(definition.word)}</p>
                ) : (
                  <p>{create_form_line(definition.translation)}</p>
                )}
                {definition.inflections ? (
                  <div className='flex flex-col gap-2 my-3 w-fit'>
                    {definition.inflections.map((inflection: any) => (
                      <>
                        {create_inflection_line(inflection, definition.stem) ==
                        "" ? null : (
                          <span className='bg-opacity-10 rounded px-2'>
                            {create_inflection_line(
                              inflection,
                              definition.stem
                            )}
                          </span>
                        )}
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
                      {definition.word.extension_senses.map((sense: any) => (
                        <p className=' bg-primary-color bg-opacity-10 rounded px-2'>
                          {sense}
                        </p>
                      ))}
                    </>
                  ) : (
                    <>
                      {definition.translation.senses.map((sense: any) => (
                        <p className=' bg-primary-color bg-opacity-10 rounded px-2'>
                          {sense}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <p>Sorry, your word was not found</p>
            <p>Please double check spelling, confirm words existence</p>
            <p>
              You believe that program should have found you word, please open
              in issue in our github repo
            </p>
            <a href='https://github.com/cqb13/vocab-vault/issues/new/choose'>
              Vocab Vault
            </a>
          </div>
        )}
      </section>
    </section>
  );
};

export default TranslationCard;
