import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItemThunk } from '../redux/itemsSlice';
import './ItemList.css';

function ItemList({ onEdit }) {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.items);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteItemThunk(id));
        }
    };

    if (loading && items.length === 0) {
        return <div className="loading">Loading items...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="item-list">
            <h2>Items List</h2>
            {items.length === 0 ? (
                <p className="no-items">No items found. Create one to get started!</p>
            ) : (
                <div className="items-container">
                    {items.map(item => (
                        <div key={item.id} className="item-card">
                            <div className="item-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <small className="item-id">ID: {item.id}</small>
                            </div>
                            <div className="item-actions">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ItemList;
