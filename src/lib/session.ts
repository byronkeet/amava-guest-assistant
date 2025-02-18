// Generate a unique session ID if none exists
export const getSessionId = () => {
	let sessionId = localStorage.getItem("chatSessionId");
	if (!sessionId) {
		sessionId = `session_${Date.now()}_${Math.random()
			.toString(36)
			.substring(2)}`;
		localStorage.setItem("chatSessionId", sessionId);
	}
	return sessionId;
};

// Save messages to local storage
export const saveMessages = (
	messages: Array<{ text: string; isBot: boolean; id: string }>
) => {
	localStorage.setItem("chatMessages", JSON.stringify(messages));
};

// Load messages from local storage
export const loadMessages = () => {
	const saved = localStorage.getItem("chatMessages");
	return saved ? JSON.parse(saved) : [];
};
