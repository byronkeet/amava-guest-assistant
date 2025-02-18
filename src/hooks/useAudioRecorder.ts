"use client";

import { useState, useRef, useEffect } from "react";

export const useAudioRecorder = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [isSupported, setIsSupported] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		if (
			typeof navigator === "undefined" ||
			!navigator.mediaDevices ||
			!navigator.mediaDevices.getUserMedia
		) {
			setIsSupported(false);
			return;
		}

		// Request microphone permission to ensure the API is available
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				stream.getTracks().forEach((track) => track.stop()); // Clean up
				setIsSupported(true);
			})
			.catch((err) => {
				console.error("Media devices error:", err);
				setIsSupported(false);
			});
	}, []);

	const startRecording = async () => {
		if (!isSupported) {
			console.error("Recording is not supported in this browser");
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) {
					chunksRef.current.push(e.data);
				}
			};

			mediaRecorder.start();
			setIsRecording(true);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			if (error instanceof Error) {
				alert(
					`Could not access microphone: ${error.message}. Please ensure you've granted microphone permissions.`
				);
			}
		}
	};

	const stopRecording = (): Promise<string> => {
		return new Promise((resolve) => {
			if (!mediaRecorderRef.current) {
				resolve("");
				return;
			}

			mediaRecorderRef.current.onstop = () => {
				const blob = new Blob(chunksRef.current, {
					type: "audio/webm;codecs=opus",
				});
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64data = reader.result as string;
					resolve(base64data);
				};
				reader.readAsDataURL(blob);

				// Stop all tracks
				mediaRecorderRef.current?.stream
					.getTracks()
					.forEach((track) => track.stop());
			};

			mediaRecorderRef.current.stop();
			setIsRecording(false);
		});
	};

	return {
		isRecording,
		isSupported,
		startRecording,
		stopRecording,
	};
};
