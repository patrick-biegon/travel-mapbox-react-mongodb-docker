import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from '../api';
import '../index.css'
import './LogEntryForm.css'

const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    outline: "black",
    height: "2rem",
    padding: "10px 10px 10px 10px",
    border: "0.5px solid black",
    cursor: "pointer",
    width: "100%",
    margin: "1rem 0 1rem 0",
  }

const LogEntryForm = ({ location, onClose }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

            { error ? <h3 className="error"> {error} </h3> : null}

            <label htmlFor="title"></label>
            <input name="title" placeholder="Enter Title" ref={register} required />

            <label htmlFor="comments"></label>
            <textarea name="comments" placeholder="Enter Comments" rows={3} ref={register} />

            <label htmlFor="description"></label>
            <textarea name="description" placeholder="Enter Description" rows={3} ref={register} />

            <label htmlFor="image"></label>
            <input name="image" placeholder="Enter Image URL" ref={register} />

            <label htmlFor="visitDate"></label>
            <input className="dateForm" name="visitDate" type="date" placeholder="Select Date" ref={register} required />

            <label htmlFor="tags"></label>
            <select className="commute" placeholder="Select Location Tag" name="tags" ref={register} >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="College">College</option>
                <option value="Hospital">Hospital</option>
                <option value="Food">Food</option>
                <option value="Monument">Monument</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>

            <label htmlFor="type"></label>
            <select className="commute" placeholder="Select Type" name="type" ref={register} >
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>

            <button style={buttonStyle} disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>

        </form>
    );
};

export default LogEntryForm;