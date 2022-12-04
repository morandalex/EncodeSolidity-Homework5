//library import
import React, { useState } from 'react';
//ui import
import {  Button, Text } from "@chakra-ui/react";
export default function ExampleComponent() {
    const [number, setNumber] = useState(1);
    async function add() {
        console.log("hello world");
        setNumber(number + 1);
    }
    async function subtract() {
        console.log("hello world");
        setNumber(number - 1);
    }
    return (
        <>
            <Button onClick={add}>add()</Button>
            <Button onClick={subtract}>subtract()</Button>
            <Text textAlign="center">{number}</Text>
        </>
    );
}