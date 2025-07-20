import type { TextArray } from "../types/types";

function countCharacterForEachLine(text: string, delimiter: string): TextArray {
    if (delimiter != "\n") {
        text = text.replaceAll("\n", "");
    }
    
    const textArray: Array<string> = text.split(delimiter);
    const resultArray: TextArray = textArray.map(element => {
        return {text: element, length: element.length};
    });
    return resultArray
}

export default countCharacterForEachLine