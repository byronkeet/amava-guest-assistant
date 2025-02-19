import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		console.log("Client log received:", data);
		// Optionally, you might write this to an external log service here.
		return NextResponse.json({ status: "ok" });
	} catch (error) {
		console.error("Error processing client log:", error);
		return NextResponse.json(
			{ error: "Error processing log" },
			{ status: 500 }
		);
	}
}
