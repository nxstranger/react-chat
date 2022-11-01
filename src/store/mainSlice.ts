import {createSlice} from '@reduxjs/toolkit';

const loadInitialState = () => {
    return {
        isInitializing: false,
    };
}

const mainSlice = createSlice({
    name: 'main',
    initialState: loadInitialState(),
    reducers: {
        setIsInitializing: (state, action) => {
            state.isInitializing = action.payload;
        }
    }
})

export const { setIsInitializing } = mainSlice.actions
export default mainSlice.reducer
