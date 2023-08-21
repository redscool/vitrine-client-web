import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folders: [],
};

export const shelfSlice = createSlice({
    name: "shelf",
    initialState,
    reducers: {
        setFolders: (state, action) => {
            const currentFolders = action.payload;

            state.folders = currentFolders;
        },
    },
});

export const { setFolders } = shelfSlice.actions;

export const foldersSelector = (state) => state.shelf.folders;

export default shelfSlice.reducer;
