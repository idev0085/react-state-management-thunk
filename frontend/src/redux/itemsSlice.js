import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Initial state
const initialState = {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
    success: false,
};

// Create slice
const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        // Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Set error state
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // Clear error
        clearError: (state) => {
            state.error = null;
        },
        // Clear success message
        clearSuccess: (state) => {
            state.success = false;
        },
        // Set items list
        setItems: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        // Set single item
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
            state.loading = false;
        },
        // Add item to state
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        // Update item in state
        updateItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        // Delete item from state
        deleteItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.loading = false;
            state.success = true;
            state.error = null;
        },
    },
});

// Export actions
export const {
    setLoading,
    setError,
    clearError,
    clearSuccess,
    setItems,
    setSelectedItem,
    addItem,
    updateItem,
    deleteItem,
} = itemsSlice.actions;

// Thunks (async actions)

// Fetch all items
export const fetchItems = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        dispatch(setItems(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to fetch items'));
    }
};

// Fetch single item
export const fetchItemById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${API_BASE_URL}/items/${id}`);
        dispatch(setSelectedItem(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to fetch item'));
    }
};

// Create new item
export const createItem = (itemData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${API_BASE_URL}/items`, itemData);
        dispatch(addItem(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to create item'));
    }
};

// Update item
export const updateItemThunk = (id, itemData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.put(`${API_BASE_URL}/items/${id}`, itemData);
        dispatch(updateItem(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to update item'));
    }
};

// Delete item
export const deleteItemThunk = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`${API_BASE_URL}/items/${id}`);
        dispatch(deleteItem(id));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to delete item'));
    }
};

// Export reducer
export default itemsSlice.reducer;
