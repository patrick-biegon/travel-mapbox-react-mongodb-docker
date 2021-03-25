import React from "react";

function Comments(props) {
    return (
        <div>
            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" ref={register} required />
        </div>
    );
}

export default Comments;