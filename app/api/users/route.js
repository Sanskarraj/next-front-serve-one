import { users } from "@/app/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";


//1.GET all users
export function GET() {
    const data = users;
    return NextResponse.json({ data }, { status: 200 });
}


//4.add user POST
export async function POST(req, res) {
    let { id, name, email, password } = await req.json()

    if (!id || !name || !email || !password) {
        return NextResponse.json({ result: "fill the form baby" }, { status: 400 })
    }
    else {

        //add new user to in-memory array
        users.push({
            id,
            name,
            email,
            password
        })

        //extract just the user array from the updated data
        const updatedUsersArray = users;

        //convert the updated users array to a Json string
        const updatedData = JSON.stringify(updatedUsersArray, null, 2)

        //write the updated users array to a json string
        fs.writeFileSync("./app/utils/db.js", `export const users =${updatedData};`, "utf-8");

        return NextResponse.json({ result: "successfully user added" })
    }
}



//5.update user PUT
export async function PUT(req, res) {
    let { id, name, email, password } = await req.json();


    const userIndex = users.findIndex((user) => user.id == id)
    if (userIndex === -1) {
        return NextResponse.json({ result: "b jaa" }, { status: 404 })
    }

    if (name) {
        users[userIndex].name = name
    }
    if (email) {
        users[userIndex].email = email
    }
    if (password) {
        users[userIndex].password = password
    }

    //extract just the user array from the updated data
    const updatedUsersArray = users;

    //convert the updated users array to a Json string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)

    //write the updated users array to a json string
    fs.writeFileSync("./app/utils/db.js", `export const users =${updatedData};`, "utf-8");

    return NextResponse.json({ result: "successfully user info updated" })


}