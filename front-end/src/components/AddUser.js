import React from "react";

export const AddUser = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(evt.target.name.value, evt.target.email.value);
        evt.target.name.value = "";
        evt.target.email.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit} className="d-none">
        <h3>Add User</h3>
        <input placeholder="Name" name="name" />
        <input placeholder="Email" name="email" />
        <button onSubmit={handleOnSubmit}>Add</button>
        <hr />
        </form>
    );
};
