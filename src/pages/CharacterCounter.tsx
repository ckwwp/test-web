import { useState } from "react"

import type { TextArray } from "../types/types";

import "../styles/textInput.css"

import countCharacterForEachLine from "../utils/countCharacterForEachLine"
import useCharacterCounterStore from "../stores/CharcterCounterStore";

function TextInput({ value, onChange, placeholder } :
    {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        placeholder: string;
    }
) {
  return (
    <div className="character-counter-input-container">
      <textarea
        className="input character-counter-input noto-sans-kr"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

function CharacterCountResult({ textArray } : 
    {
        textArray: TextArray
    })
    {
    const { characterLimit, characterWarningPercentage } = useCharacterCounterStore();

    function getLengthClass(itemLength: number): string {
        if (itemLength >= characterLimit) return "error";
        if (itemLength >= characterLimit * characterWarningPercentage) return "warning";
        return ""
    }

    return (
        <div className="character-counter-result noto-sans-kr">
        {textArray.map((item, index) => (
                <div className="character-count-result-component" key={index}>
                    <div className={`character-count-result-length ${getLengthClass(item.length)}`} >{item.length}</div>
                    <div className="character-count-result-text">{item.text}</div>
                </div>
        ))}
        </div>
    )
}

function CharacterCounterOption() {
    const { setCharacterLimit, setCharacterWarningPercentage, setLineBreakDelimiter } = useCharacterCounterStore();

    function changeNumber(userInput: string, func: (value?: number) => void): void {
        if (userInput.length === 0) {func()}
        const parsedLimit = parseInt(userInput)
        if (!isNaN(parsedLimit)) {
            func(parsedLimit);
        }
    }

    function changeDelimiter(userInput: string, func: (value?: string) => void): void {
      if (userInput.length === 0) {func()}
      else { func(userInput) }
    } 

    return (
        <div className="character-counter-option">
            <label htmlFor="character-counter-option-delimiter">줄바꿈 구분자</label>
            <input id="character-counter-option-delimiter" placeholder="" onChange={(e) => changeDelimiter(e.target.value, setLineBreakDelimiter)}></input>
            <br></br>
            <label htmlFor="character-counter-option-warning-percentage">경고</label>
            <input id="charcter-counter-option-warning-percentage" placeholder="80" onChange={(e) => changeNumber(e.target.value, setCharacterWarningPercentage)}></input>
            <label htmlFor="character-counter-option-warning-percentage">%</label>
            <br></br>
            <label htmlFor="character-counter-option-error-limit">글자수 제한</label>
            <input id="character-counter-option-error-limit" placeholder="20" onChange={(e) => changeNumber(e.target.value, setCharacterLimit)}></input>
        </div>
    )
}

function CharacterCounter() {
    const [ inputText, setInputText ] = useState("")
    const { lineBreakDelimiter } = useCharacterCounterStore();

    function parseText(inputText: string) {
        return countCharacterForEachLine(inputText, lineBreakDelimiter)
    }

    const textArray = parseText(inputText)

  return (
    <>
    <h1>Character Counter</h1>
      <div className="character-counter-container">
        <TextInput 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="여기에 텍스트를 입력하세요"
        />
        <CharacterCounterOption />
        {inputText.length > 0 &&
            <CharacterCountResult textArray={textArray} />
        }
      </div>
    </>
  )
}

export default CharacterCounter
