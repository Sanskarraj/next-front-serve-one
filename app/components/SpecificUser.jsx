"use client";
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";
import React, { useState } from 'react'

function SpecificUser() {
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const response = await fetch(`api/users/${userId}`);

        if (response.ok) {
            const res = await response.json()
            setUserData(res.user);
        } else {
            console.log("error fetching data");
            setUserData(null);
        }
    };


    return (
        <div className="flex">
            <div className="w-72">
                <Input label="Enter User ID" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <Button onClick={fetchUserData}>Fetch User </Button>
            </div>
            {userData ? (userData.map((d) => (
                <>
                    <Card className="w-96 mt-5">
                        <List>
                            <ListItem>
                                Name:{d.name}
                                <br />
                                email:{d.email}
                                <br />

                                password:{d.password}
                            </ListItem>
                        </List>
                    </Card>
                </>
            ))) : (
                <p className="mt-2">Search for a specific user</p>
            )


            }
        </div>
    )
}

export default SpecificUser