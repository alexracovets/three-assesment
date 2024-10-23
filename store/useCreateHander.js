import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

const useCreateHander = createStore(
    immer((set) => ({
        isChangeHandler: false, 
        setIsChangeHandler: (value) => set((state) => {
            state.isChangeHandler = value;
        }),
    }))
);

export default useCreateHander;
