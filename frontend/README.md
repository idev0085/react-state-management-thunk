# Redux Thunk CRUD Application

A complete CRUD application built with React and Redux Thunk for state management.

## Features

- ✅ **Create**: Add new items with title and description
- ✅ **Read**: Display all items in a responsive grid layout
- ✅ **Update**: Edit existing items
- ✅ **Delete**: Remove items with confirmation
- ✅ **Redux Thunk**: Handle async API calls with Redux Thunk middleware
- ✅ **Error Handling**: Display error messages when API calls fail
- ✅ **Loading States**: Show loading indicators during API operations
- ✅ **Responsive Design**: Works great on desktop, tablet, and mobile

## Project Structure

```
src/
├── components/
│   ├── ItemForm.jsx       # Form for creating/editing items
│   ├── ItemForm.css       # Form styles
│   ├── ItemList.jsx       # Display list of items
│   └── ItemList.css       # List styles
├── redux/
│   ├── itemsSlice.js      # Redux slice with reducers and thunks
│   └── store.js           # Redux store configuration
├── App.jsx                # Main application component
├── App.css                # Main application styles
├── index.js               # React entry point
└── index.css              # Global styles
public/
└── index.html             # HTML template
```

## Redux Thunk Implementation

### Actions (Thunks)
- `fetchItems()` - Fetch all items from API
- `fetchItemById(id)` - Fetch a single item
- `createItem(itemData)` - Create a new item
- `updateItemThunk(id, itemData)` - Update an existing item
- `deleteItemThunk(id)` - Delete an item

### State Structure
```javascript
{
  items: {
    items: [],           // Array of item objects
    selectedItem: null,  // Currently selected item
    loading: false,      // Loading state for async operations
    error: null,         // Error message if any
    success: false       // Success flag for feedback
  }
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start Backend Server** (in backend directory)
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start React Frontend** (in frontend directory)
   ```bash
   npm start
   ```
   Frontend will open at `http://localhost:3000`

## API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get a single item |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## How Redux Thunk Works

Redux Thunk is middleware that allows action creators to return a function instead of an action object. This function can contain async logic:

```javascript
// Thunk action creator
export const fetchItems = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        dispatch(setItems(response.data));
    } catch (error) {
        dispatch(setError(error.response?.data?.error || 'Failed to fetch items'));
    }
};

// Usage in component
dispatch(fetchItems());
```

## Component Interactions

### ItemForm Component
- Handles both creation and editing of items
- Includes form validation
- Shows loading states and success/error messages
- Automatically resets after successful submission

### ItemList Component
- Displays all items in a responsive grid
- Shows loading state while fetching data
- Handles item deletion with confirmation
- Allows editing items by clicking the Edit button

## Styling

The application uses:
- CSS Grid for responsive layouts
- CSS Flexbox for component layouts
- Media queries for mobile responsiveness
- Gradient backgrounds and transitions for modern UI

## Adding More Features

To extend the application:

1. **Add Filtering**: Add a filter thunk and reducer
2. **Add Sorting**: Implement sorting functionality
3. **Add Search**: Add search for items by title
4. **Add Pagination**: Implement pagination in the list
5. **Add Categories**: Extend items with category field

## Troubleshooting

### Backend not responding
- Ensure backend is running on port 5000
- Check if CORS is enabled in backend
- Check browser console for detailed error messages

### Items not loading
- Check browser Network tab for API errors
- Verify backend is returning correct data format
- Check Redux DevTools for state updates

### Form not submitting
- Check browser console for JavaScript errors
- Verify all required fields are filled
- Check Network tab for API request/response

## Technologies Used

- **React** - UI library
- **Redux** - State management
- **Redux Thunk** - Async action middleware
- **Axios** - HTTP client
- **Express** - Backend framework
- **Node.js** - JavaScript runtime
- **CSS3** - Styling

## License

MIT
