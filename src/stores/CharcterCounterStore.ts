import { create } from "zustand";

interface CharacterCountState {
    characterLimit: number;
    setCharacterLimit: (Limit?: number) => void;
    characterWarningPercentage: number;
    setCharacterWarningPercentage: (warningPercent?: number) => void;
    lineBreakDelimiter: string;
    setLineBreakDelimiter: (delimiter?: string) => void;
}

const useCharacterCounterStore = create<CharacterCountState>(set => ({
    characterLimit: 20,
    setCharacterLimit: (Limit: number = 20) => set({ characterLimit: Limit }),
    characterWarningPercentage: 0.8,
    setCharacterWarningPercentage: (warningPercent: number = 80) => set({ characterWarningPercentage: (warningPercent/100) }),
    lineBreakDelimiter: "\n",
    setLineBreakDelimiter: (delimiter: string = "\n") => set({ lineBreakDelimiter: delimiter }),
}))

export default useCharacterCounterStore