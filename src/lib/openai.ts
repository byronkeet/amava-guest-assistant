import OpenAI from "openai";
import fs from "fs";
import path from "path";
import os from "os";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioBase64: string): Promise<string> {
	try {
		// Convert base64 to Buffer
		const audioBuffer = Buffer.from(
			audioBase64.split(",")[1] || audioBase64,
			"base64"
		);

		// Create a temporary file
		const tempDir = os.tmpdir();
		const tempFilePath = path.join(tempDir, "recording.webm");

		// Write the buffer to a temporary file
		fs.writeFileSync(tempFilePath, audioBuffer);

		// Create transcription using the file path
		const transcription = await openai.audio.transcriptions.create({
			file: fs.createReadStream(tempFilePath),
			model: "whisper-1",
		});

		// Clean up: delete the temporary file
		fs.unlinkSync(tempFilePath);

		return transcription.text;
	} catch (error) {
		console.error("Transcription error details:", error);
		throw error;
	}
}
