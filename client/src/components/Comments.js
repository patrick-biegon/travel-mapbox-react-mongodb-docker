import React from "react";

function Comments(props) {
    return (
        <div>
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register} />
        </div>
    );
}

export default Comments;