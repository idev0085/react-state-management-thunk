import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, updateItemThunk, clearSuccess, clearError } from '../redux/itemsSlice';
import './ItemForm.css';

function ItemForm({ editingItem, onReset }) {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.items);

    useEffect(() => {
        if (editingItem) {
            setFormData({
                title: editingItem.title,
                description: editingItem.description,
            });
        }
    }, [editingItem]);

    useEffect(() => {
        if (success) {
            setFormData({ title: '', description: '' });
            setErrors({});
            onReset();
            const timer = setTimeout(() => dispatch(clearSuccess()), 3000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, onReset]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => dispatch(clearError()), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (editingItem) {
            dispatch(updateItemThunk(editingItem.id, formData));
        } else {
            dispatch(createItem(formData));
        }
    };

    const handleReset = () => {
        setFormData({ title: '', description: '' });
        setErrors({});
        onReset();
    };

    return (
        <div className="item-form">
            <h2>{editingItem ? 'Edit Item' : 'Create New Item'}</h2>

            {error && <div className="alert alert-error">{error}</div>}
            {success && (
                <div className="alert alert-success">
                    {editingItem ? 'Item updated successfully!' : 'Item created successfully!'}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter item title"
                        className={errors.title ? 'input-error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter item description (optional)"
                        rows="4"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : (editingItem ? 'Update Item' : 'Create Item')}
                    </button>
                    {editingItem && (
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ItemForm;
