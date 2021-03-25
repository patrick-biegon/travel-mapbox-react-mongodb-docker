import React from "react";

function Comments(props) {
    return (
        <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register} />
        </div>
    );
}

export default Comments;