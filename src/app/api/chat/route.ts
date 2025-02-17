import { NextResponse } from "next/server";
import axios from "axios";

const FLOWISE_API_URL =
	"https://flowise.zeet.agency/api/v1/prediction/d4f05642-9faf-425f-b312-dcbb26e896c0";

export async function POST(request: Request) {
	try {
		const { message } = await request.json();
		console.log("Received message:", message); // Debug log

		const flowiseResponse = await axios.post(FLOWISE_API_URL, {
			question: message,
		});
		console.log("Flowise response:", flowiseResponse.data); // Debug log

		return NextResponse.json({ response: flowiseResponse.data.text });
	} catch (error) {
		console.error("Error in chat API:", error);
		return NextResponse.json(
			{ error: "Failed to get response from chatbot" },
			{ status: 500 }
		);
	}
}
