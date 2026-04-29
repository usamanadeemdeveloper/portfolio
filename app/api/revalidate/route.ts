import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { body, isValidSignature } = await parseBody<{ _type: string }>(
            req,
            process.env.SANITY_WEBHOOK_SECRET
        );

        if (!isValidSignature) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        if (!body?._type) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        // Revalidate the tag matching the document type
        revalidateTag(body._type);

        return NextResponse.json({
            status: 200,
            revalidated: true,
            type: body._type,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}