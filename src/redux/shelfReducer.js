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
				if (update._id.toString() === folder._id.toString()) {
					return update;
				}
				return folder;
			});
		},
		deleteFolder: (state, action) => {
			const folderId = action.payload;
			state.folders = state.folders.filter((folder) => {
				if (folderId.toString() === folder._id.toString()) {
					return false;
				}
				return true;
			});
		}
	},
});

export const { setFolders, updateFolder, deleteFolder } = shelfSlice.actions;

export const foldersSelector = (state) => state.shelf.folders;

export default shelfSlice.reducer;
