import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: null,
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setCart: (state, action) => {
			const { item, itemType, planDetails } = action.payload;
			state.cart = {
				item,
				itemType,
				planDetails,
			};
		},
		emptyCart: (state, _action) => {
			state.cart = null;
		},
	},
});

export const { setCart, emptyCart } = orderSlice.actions;

export const cartSelector = (state) => state.order.cart;

export default orderSlice.reducer;
