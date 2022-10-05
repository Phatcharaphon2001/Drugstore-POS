import React, { useState } from "react";
import Button from "react-bootstrap/Button";
export const User = ({ name, email, id, onEdit, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(id, evt.target.name.value, evt.target.email.value);
        setIsEdit(!isEdit);
    };

    return (
        <tr>
        {isEdit ? (
            <form onSubmit={handleOnEditSubmit}>
                <td><input placeholder="Name" name="name" defaultValue={name} /></td>
                <td><input placeholder="Email" name="email" defaultValue={email} /></td>
                <td><button onSubmit={handleOnEditSubmit}>Save</button></td>
            </form>
        ) : (
            <>
            <td className="user-name">{name}</td>
            <td className="user-email">{email}</td>
            <td>
                <Button varient="info" >Edit</Button>{' '}
                <Button variant="danger" >Delete</Button>
            </td>
            </>
        )}
        </tr>
    );
    };
