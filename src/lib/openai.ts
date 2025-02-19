import OpenAI from "openai";
import fs from "fs";
import path from "path";
import os from "os";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioBase64: string): Promise<string> {
	try {
		// Split the data URL and extract the Base64 value & MIME type
		const [header, base64Data] = audioBase64.split(",");
		const audioBuffer = Buffer.from(base64Data || audioBase64, "base64");

		// Determine the MIME type from the header and set a corresponding file extension.
		const mimeMatch = header.match(/data:([^;]+);/);
		const mimeType = mimeMatch ? mimeMatch[1] : "audio/webm";
		let ext = "webm"; // default extension
		if (mimeType === "audio/mp4") ext = "mp4";
		else if (mimeType === "audio/mpeg") ext = "mpeg";
		// You may add further mappings if needed.

		// Create a temporary file with the detected extension
		const tempDir = os.tmpdir();
		const tempFilePath = path.join(tempDir, `recording.${ext}`);

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
