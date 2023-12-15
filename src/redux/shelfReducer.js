import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	folders: [],
};

export const shelfSlice = createSlice({
	name: 'shelf',
	initialState,
	reducers: {
		setFolders: (state, action) => {
			const currentFolders = action.payload;

			state.folders = currentFolders;
		},
		updateFolder: (state, action) => {
			const update = action.payload;
			state.folders = state.folders.map((folder) => {
				console.log('update._id.toString()', update._id.toString());
				console.log('folder._id.toString()', folder._id.toString());
				if (update._id.toString() === folder._id.toString()) {
					console.log('update', update);
					return update;
				}
				return folder;
			});
			console.log('state.folders', state.folders);
		},
	},
});

export const { setFolders, updateFolder } = shelfSlice.actions;

export const foldersSelector = (state) => state.shelf.folders;

export default shelfSlice.reducer;
