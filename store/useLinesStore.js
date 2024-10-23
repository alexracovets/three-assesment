import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

const useLinesStore = createStore(
    immer((set) => ({
        isSelected: false,
        isClickChange: false,
        isDrawing: false,
        currentLine: null,
        toDelet: null,
        lines: [],
        setIsSelected: (value) => set((state) => {
            state.isSelected = value;
        }),
        setIsDrawing: (value) => set((state) => {
            state.isDrawing = value;
        }),
        setCurrentLine: (value) => set((state) => {
            state.currentLine = value;
        }),
        setLines: (value) => set((state) => {
            state.lines.push(value);
        }),
        removeLines: (value) => set((state) => {
            state.lines = state.lines.filter(item => item.line.uuid !== value.uuid);
        }),
        setToDelet: (value) => set((state) => {
            state.toDelet = value;
        }),
        setIsClickChange: (value) => set((state) => {
            state.isClickChange = value;
        }),
         
    }))
);

export default useLinesStore;
