import React from "react";

function Title(props) {
    return (
        <div>
            <label htmlFor="title">Title</label>
            <input name="title" ref={register} required />
        </div>
    );
}

export default Title;