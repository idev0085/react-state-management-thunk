import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (item) => {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = () => {
        setEditingItem(null);
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="container">
                    <h1>CRUD App with Redux Thunk</h1>
                    <p>Manage your items with Redux state management</p>
                </div>
            </header>

            <main className="app-main">
                <div className="container">
                    <div className="layout">
                        <div className="form-section">
                            <ItemForm editingItem={editingItem} onReset={handleReset} />
                        </div>
                        <div className="list-section">
                            <ItemList onEdit={handleEdit} />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <div className="container">
                    <p>&copy; 2026 Redux Thunk CRUD App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
