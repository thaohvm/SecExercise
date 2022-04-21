import React, { useState } from 'react';
import uuid from "uuid/v4";

const NewBoxForm = ({ addBox }) => {
    const INIT_STATE = [{
        id: "",
        height: "",
        width: "",
        backgroundColor: ""
    }]
    const [formData, setFormData] = useState(INIT_STATE);
    const handleChange = (e) => {
        const { name, value } = e.target.value;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addBox({ ...formData })
        setFormData(INIT_STATE)
    }
    return (
        <div className='NewBoxForm'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='width'>Width</label>
                <input
                    type="text"
                    placeholder='Enter value of Width'
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                />

                <label htmlFor='height'>Height</label>
                <input
                    type="text"
                    placeholder='Enter value of Height'
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                />

                <label htmlFor='color'>Background Color</label>
                <input
                    type="text"
                    placeholder='Enter background color'
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
                <button>Add new box</button>
            </form>
        </div>
    )
}

export default NewBoxForm;
