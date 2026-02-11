import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { projectTable, screenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    const { userInput, device, projectId} = await req.json();
    const user = await currentUser();

    const result = await db.insert(projectTable).values({
        projectId: projectId,
        userId: user?.primaryEmailAddress?.emailAddress as string,
        device: device,
        userInput: userInput
    }).returning();

    return NextResponse.json(result[0]);
 }

 export async function GET(req:NextRequest){
    const projectId = await req.nextUrl.searchParams.get('projectId');
    const user = await currentUser();
    
    try{
        const result = await db
            .select()
            .from(projectTable)
            .where(
                and(
                    eq(projectTable.projectId, projectId as string),
                    eq(projectTable.userId, user?.primaryEmailAddress?.emailAddress as string)
                )
            );

        const screenConfig = await db.select().from(screenConfigTable)
            .where(eq(screenConfigTable.projectId,projectId as string))
        return NextResponse.json({
            projectDetail: result[0],
            screenConfig: screenConfig
        })

    }
    catch (e) {
        return NextResponse.json({ msg: 'Error'});
    }
 }
