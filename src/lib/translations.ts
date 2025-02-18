export type Language =
	| "english"
	| "spanish"
	| "french"
	| "dutch"
	| "german"
	| "italian"
	| "russian"
	| "mandarin";

export const languages = [
	{ value: "english", label: "English" },
	{ value: "spanish", label: "Español" },
	{ value: "french", label: "Français" },
	{ value: "dutch", label: "Nederlands" },
	{ value: "german", label: "Deutsch" },
	{ value: "italian", label: "Italiano" },
	{ value: "russian", label: "Русский" },
	{ value: "mandarin", label: "中文" },
];

export const translations = {
	english: {
		welcome: "Welcome to your AI Assistant",
		askQuestion: "Ask a question...",
		downloadPack: "Download the welcome pack",
		wifiPassword: "What is the wifi password",
		roomProblem: "What to do in case of a problem in your room",
	},
	spanish: {
		welcome: "Bienvenido a tu Asistente IA",
		askQuestion: "Haz una pregunta...",
		downloadPack: "Descarga el paquete de bienvenida",
		wifiPassword: "¿Cuál es la contraseña del wifi?",
		roomProblem: "Qué hacer en caso de un problema en tu habitación",
	},
	french: {
		welcome: "Bienvenue sur votre Assistant IA",
		askQuestion: "Posez une question...",
		downloadPack: "Télécharger le pack de bienvenue",
		wifiPassword: "Quel est le mot de passe wifi",
		roomProblem: "Que faire en cas de problème dans votre chambre",
	},
	dutch: {
		welcome: "Welkom bij je AI Assistent",
		askQuestion: "Stel een vraag...",
		downloadPack: "Download het welkomstpakket",
		wifiPassword: "Wat is het wifi-wachtwoord",
		roomProblem: "Wat te doen bij een probleem in je kamer",
	},
	german: {
		welcome: "Willkommen bei Ihrem KI-Assistenten",
		askQuestion: "Stellen Sie eine Frage...",
		downloadPack: "Willkommenspaket herunterladen",
		wifiPassword: "Wie lautet das WLAN-Passwort",
		roomProblem: "Was tun bei einem Problem in Ihrem Zimmer",
	},
	italian: {
		welcome: "Benvenuto nel tuo Assistente IA",
		askQuestion: "Fai una domanda...",
		downloadPack: "Scarica il pacchetto di benvenuto",
		wifiPassword: "Qual è la password del wifi",
		roomProblem: "Cosa fare in caso di problemi nella tua stanza",
	},
	russian: {
		welcome: "Добро пожаловать в ваш ИИ-ассистент",
		askQuestion: "Задайте вопрос...",
		downloadPack: "Скачать приветственный пакет",
		wifiPassword: "Какой пароль от wifi",
		roomProblem: "Что делать в случае проблемы в вашей комнате",
	},
	mandarin: {
		welcome: "欢迎使用您的AI助手",
		askQuestion: "提出问题...",
		downloadPack: "下载欢迎包",
		wifiPassword: "WiFi密码是什么",
		roomProblem: "房间出现问题时该怎么办",
	},
};

export const useTranslations = (language: Language) => {
	return translations[language];
};
