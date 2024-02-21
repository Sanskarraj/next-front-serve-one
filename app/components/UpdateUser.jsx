"use client";
import { Button, Input } from "@material-tailwind/react";
import { useState } from 'react';
import React from 'react'

function UpdateUser() {


    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("pls provide ID");
            return;
        }
        const requestData = { id };
        if (name) {
            requestData.name = name;
        }
        if (email) {
            requestData.email = email;
        } if (password) {
            requestData.password = password;
        }

        try {
            const response = await fetch('api/users', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            if (response.ok) {
                alert("user info updated successfully");
                clearForm()
                return;
            }
            else {
                const data = await response.json()
                alert(data.result || "lvde baji jhali zavadya");
                return;
            }
        }

        catch { e } {
            alert(e)
        }
    }


    const clearForm = () => {
        setId('')
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    label="ID"
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    label="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><Input
                    label="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><Input
                    label="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="mt-2" type="submit">
                    Update User
                </Button>
            </form>
        </div>
    )
}

export default UpdateUser