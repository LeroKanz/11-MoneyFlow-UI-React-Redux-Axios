import { createSlice } from '@reduxjs/toolkit';

const exchangeSlice = createSlice({
    name: 'exchanges',
    initialState: {
        exchanges: [],
        status: null,
        error: null
    },
    reducers: {
        addExchange(state, action) {
            state.exchanges.push(action.payload);
        },        
        removeExchange(state, action) {
            state.exchanges = state.exchanges.filter(exchange => exchange.id !== action.payload.id);
        },
        getAllExchanges(state, action) {
            state.exchanges = action.payload
        },
    }
});

export const { addExchange, removeExchange, getAllExchanges } = exchangeSlice.actions;

export default exchangeSlice.reducer;