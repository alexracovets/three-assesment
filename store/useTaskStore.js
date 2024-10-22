import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

const useTaskStore = createStore(
    immer((set) => ({
        currentTask: 2,
        setCurrentTask: (value) => set((state) => {
            state.currentTask = value;
        }),
    }))
);

export default useTaskStore;
