import React, { useState } from 'react';
import uuid from 'uuid/v4';

const NewBoxForm = ({ createBox }) => {
    const INIT_STATE = { height: "", width: "", backgroundColor: "" }
    const [formData, setFormData] = useState(INIT_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createBox({...formData, id: uuid() })
        setFormData(INIT_STATE)
    }
    return (
        <form onSubmit={handleSubmit} className='NewBoxForm'>
            <label htmlFor='backgroundColor'>Background Color: </label>
            <input
                type="text"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
            />

            <label htmlFor='width'>Width: </label>
            <input
                type="text"
                name="width"
                value={formData.width}
                onChange={handleChange}
            />

            <label htmlFor='height'>Height: </label>
            <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
            />
            <button>Create New Box</button>
        </form>
    );
}

export default NewBoxForm;
