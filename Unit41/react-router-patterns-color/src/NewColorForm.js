import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewColorForm({ addColor }) {
    const [form, updateForm] = useState({name: "", hex:"#ffffffff"});
    const history = useHistory();

    function handleChange(e) {
        e.persist();
        updateForm(data => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        addColor({ [form.name] : form.hex});
        history.push("/colors");
    }

    const {hex, name} = form;

    return (
        <div className='NewColorForm'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Color Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Enter color name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='hex'>Color Value: </label>
                    <input
                        type="color"
                        name="hex"
                        id="hex"
                        value={hex}
                        onChange={handleChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default NewColorForm;
