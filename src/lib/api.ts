import axios from "axios";

const FLOWISE_API_URL =
	"https://flowise.zeet.agency/api/v1/prediction/d4f05642-9faf-425f-b312-dcbb26e896c0";

export async function sendMessageToFlowise(message: string): Promise<string> {
	try {
		const response = await axios.post(
			FLOWISE_API_URL,
			{
				question: message,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				timeout: 10000, // 10 second timeout
			}
		);
		return response.data.text;
	} catch (error) {
		console.error("Error calling Flowise API:", error);
		return "Sorry, I'm having trouble connecting to the server. Please try again later.";
	}
}
