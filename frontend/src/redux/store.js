import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import itemsReducer from './itemsSlice';

// Combine reducers
const rootReducer = combineReducers({
    items: itemsReducer,
});

// Create store with thunk middleware
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
