import React from "react";

function Comments(props) {
    return (
        <div>
            <label htmlFor="tags">Commute Type:</label>
            <select name="tags" ref={register} >
                <option value="home">home</option>
                <option value="office">office</option>
                <option value="college">college</option>
                <option value="hospital">hospital</option>
                <option value="caffe">caffe</option>
                <option value="hotel">hotel</option>
                <option value="monument">monument</option>
                <option value="miscellaneousk ">miscellaneous</option>
            </select>
        </div>
    );
}

export default Comments;