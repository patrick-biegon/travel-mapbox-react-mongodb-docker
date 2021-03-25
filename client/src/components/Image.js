import React from "react";

function Comments(props) {
    return (
        <div>
            <label htmlFor="image">Image</label>
            <input name="image" ref={register} />
        </div>
    );
}

export default Comments;