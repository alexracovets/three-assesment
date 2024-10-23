import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

const useMouseStore = createStore(
    immer((set) => ({
        mousePosition: { x: 0, y: 0 },
        setMousePosition: (value) => set((state) => {
            state.mousePosition = value;
        })
    }))
);

export default useMouseStore;
