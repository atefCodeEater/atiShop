import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';
import { JsonObject } from "next-auth/adapters";
import { colgroup } from "framer-motion/client";
export async function POST(request:Request) {
    
    const formdata = request.formData()
    const image = (await formdata).get("Image") as File
    const user = (await formdata).get("user") as any 
    const parseUser = JSON.parse(user)

     const buffer = await image?.arrayBuffer();
        const uploadDir = path.join(process.cwd(), '/public/uploads/imagesOfGroup'); 
        // Ensure this directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, parseUser.username+'.jpg');
        fs.writeFileSync(filePath, Buffer.from(buffer) as Uint8Array);
        // fs.writeFileSync(filePath, buffer as any);
        console.log(`File saved to ${filePath}`);

    console.log(image);

    return  NextResponse.json({message:'با موفقیت انجام شد'})
}