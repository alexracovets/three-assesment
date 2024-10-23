import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

const useLinesStore = createStore(
    immer((set) => ({
        isSelected: false,
        isDrawing: false,
        mousePosition: { x: 1, y: 0 },
        currentLine: null,
        lines: [],
        setMousePosition: (value) => set((state) => {
            state.mousePosition = value;
        }),
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
            state.lines = state.lines.filter(line => line.uuid === value.uuid);
        }),
    }))
);

export default useLinesStore;
