"use client";
import React from 'react'
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import AllUsers from './AllUsers';
import SpecificUser from './SpecificUser';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

function AccordionUI() {
    const [open, setOpen] = useState(1)
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <section className='w-[40rem]'>
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    All Users
                </AccordionHeader>
                <AccordionBody>
                    <AllUsers />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Search specific user
                </AccordionHeader>
                <AccordionBody>
                    <SpecificUser />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    Create user
                </AccordionHeader>
                <AccordionBody>
                    <CreateUser />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    Update user
                </AccordionHeader>
                <AccordionBody>
                    <UpdateUser />
                </AccordionBody>
            </Accordion>
        </section>
    )
}

export default AccordionUI