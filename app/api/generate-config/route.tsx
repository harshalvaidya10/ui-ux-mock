import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "@/config/openrouter"
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/Prompt";
import { projectTable, screenConfigTable } from "@/config/schema";
import { db } from "@/config/db"
import { PgColumn } from "drizzle-orm/pg-core";
export async function POST(req: NextRequest) {
    const { userInput, deviceType, projectId } = await req.json();
    try {
        const aiResult = await openrouter.chat.send({
            chatGenerationParams: {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: 'system',
                        content: `${APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}', deviceType)}\n\nReturn MINIFIED JSON only (no newlines). Keep each field concise (1–2 sentences max).`
                    },
                    {
                        "role": "user",
                        "content": userInput
                    }
                ],
                maxTokens: 1200,
                maxCompletionTokens: 1200,
                responseFormat: { type: "json_object" },
                stream: false
            }
        });

        const rawContent = aiResult?.choices?.[0]?.message?.content;
        let jsonAiResult: any = null;
        try {
            jsonAiResult = typeof rawContent === "string" ? JSON.parse(rawContent) : rawContent;
        } catch (parseError: any) {
            try {
                const repairResult = await openrouter.chat.send({
                    chatGenerationParams: {
                        model: "openai/gpt-4o-mini",
                        messages: [
                            {
                                role: "system",
                                content: "You fix invalid JSON. Return ONLY valid JSON, no commentary."
                            },
                            {
                                role: "user",
                                content: typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent)
                            }
                        ],
                        maxTokens: 800,
                        maxCompletionTokens: 800,
                        responseFormat: { type: "json_object" },
                        stream: false
                    }
                });
                const repaired = repairResult?.choices?.[0]?.message?.content;
                jsonAiResult = typeof repaired === "string" ? JSON.parse(repaired) : repaired;
            } catch (repairError: any) {
                console.error("JSON parse error:", parseError);
                console.error("JSON repair error:", repairError);
                return NextResponse.json(
                    { error: "AI returned invalid JSON", detail: parseError?.message ?? String(parseError), raw: rawContent },
                    { status: 500 }
                );
            }
        }
        //Save to Database
        console.log(aiResult);

        if (jsonAiResult) {
            //Update Project Table with Project Name
            await db.update(projectTable).set({
                projectVisualDescription: jsonAiResult?.projectVisualDescription,
                projectName: jsonAiResult?.projectName
                // @ts-ignore
            }).where(eq(projectTable.projectId,projectId as string))

            //Insert Screen Config
            jsonAiResult.screens?.forEach(async (screen: any) => {
                const result = await db.insert(screenConfigTable).values({
                    projectId: projectId,
                    purpose: screen?.purpose,
                    screenDescription: screen?.layoutDescription,
                    screenId: screen?.id,
                    screenName: screen?.name
                })
            })

            return NextResponse.json(jsonAiResult)

        }
        else{
            NextResponse.json({ msg: "Internal Server Error" })
        }

    } catch (error: any) {
        console.error("OpenRouter error:", error);
        return NextResponse.json(
            { error: "OpenRouter request failed", detail: error?.message ?? String(error) },
            { status: 500 }
        );
    }
}


