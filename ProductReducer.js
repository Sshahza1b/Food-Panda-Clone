import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name:"product",
    initialState:{
        product:[],
    },
    reducers:{
        getProducts:(state,action) => {
            state.product.push({...action.payload});
        },
        incrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if (itemPresent) {
                itemPresent.quantity++;
            }
        },
        decrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if (itemPresent.quantity === 1) { // Check if quantity is 1 before decrementing
                itemPresent.quantity = 0;
                const removeItem = state.product.filter((item) => item.id !== action.payload.id);
                state.product = removeItem; // Use 'product' instead of 'cart'
            } else {
                itemPresent.quantity--;
            }
        },
    }
});

export const {getProducts,incrementQty,decrementQty} = productSlice.actions;

export default productSlice.reducer;