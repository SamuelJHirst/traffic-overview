import { createSlice } from '@reduxjs/toolkit';

export const showDistancesSlice = createSlice({
    name: 'showDistances',
    initialState: true,
    reducers: {
        toggle: (state) => {
            return !state;
        }
    }
});

export const { toggle } = showDistancesSlice.actions;
export default showDistancesSlice.reducer;