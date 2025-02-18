import { NextResponse } from "next/server";
import axios from "axios";
import { transcribeAudio } from "@/lib/openai";

const FLOWISE_API_URL =
	"https://flowise.zeet.agency/api/v1/prediction/d4f05642-9faf-425f-b312-dcbb26e896c0";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { sessionId } = body;
		console.log("API received sessionId:", sessionId);
		console.log(
			"Received request body type:",
			body.uploads ? "audio" : "text"
		);

		// If this is an audio upload, only return the transcription
		if (body.uploads && body.uploads.length > 0) {
			const audioData = body.uploads[0];
			console.log("Transcribing audio...");

			try {
				const transcription = await transcribeAudio(audioData.data);
				console.log("Transcribed text:", transcription);
				return NextResponse.json({ transcription });
			} catch (error) {
				console.error("Transcription error:", error);
				return NextResponse.json(
					{ error: "Failed to transcribe audio" },
					{ status: 500 }
				);
			}
		}

		// This is a text message, get response from Flowise
		const flowiseResponse = await axios.post(FLOWISE_API_URL, {
			question: body.message,
			overrideConfig: {
				sessionId,
			},
		});
		console.log("Sent to Flowise with sessionId:", sessionId);

		return NextResponse.json({
			response: flowiseResponse.data.text,
		});
	} catch (error) {
		console.error("Error in chat API:", error);

		if (axios.isAxiosError(error)) {
			console.log("Axios error details:", {
				response: error.response?.data,
				status: error.response?.status,
			});
			return NextResponse.json(
				{
					error: "Failed to get response from chatbot",
					details: error.response?.data || error.message,
				},
				{ status: error.response?.status || 500 }
			);
		}

		return NextResponse.json(
			{ error: "Failed to process request", details: String(error) },
			{ status: 500 }
		);
	}
}
