import { users } from "@/app/utils/db";
import { NextResponse } from "next/server";
import fs from "fs";
//2.GET specific user

export async function GET(_, res) {
    const { id } = await res.params;
    const user = users.filter((u) => u.id == id)
    return NextResponse.json({ user, ok: true });
}


//3.user login POST
export async function POST(req, res) {
    let { name, email, password } = await req.json()
    const { id } = await res.params

    const { name: uName, email: uEmail, password: uPassword } = users.find((u) => u.id == id);

    if (uName == name && uEmail === email && uPassword === password) {
        return NextResponse.json({ result: "successfully logged in baby" })
    }
    else if (!name || !email || !password) {
        return NextResponse.json({ result: "fill the form baby" })
    }
    else {
        return NextResponse.json({ result: "bhokaat jaa" })
    }
}


//6.DELETE user
export async function DELETE(req, res) {
    const { id } = await res.params;
    const userIndex = users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
        return NextResponse.json({ result: "user not found" }, { status: 404 });
    }

    //remove user
    users.splice(userIndex, 1)

    //extract just the user array from the updated data
    const updatedUsersArray = users;

    //convert the updated users array to a Json string
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)

    //write the updated users array to a json string
    fs.writeFileSync("./app/utils/db.js", `export const users =${updatedData};`, "utf-8");

    return NextResponse.json({ result: "successfully user deleted" })

}