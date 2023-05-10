import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './reducers'

export default configureStore({
    reducer: {
        darkMode: darkModeReducer
    }
})
