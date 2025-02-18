"use client";

import { useState, useRef, useEffect } from "react";

export const useAudioRecorder = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [isSupported, setIsSupported] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	// Helper to get supported MIME type
	const getSupportedMimeType = () => {
		const types = [
			"audio/webm",
			"audio/webm;codecs=opus",
			"audio/mp4",
			"audio/aac",
			"audio/ogg",
		];

		for (const type of types) {
			if (MediaRecorder.isTypeSupported(type)) {
				return type;
			}
		}
		return "";
	};

	useEffect(() => {
		const checkSupport = async () => {
			const hasMediaDevices = !!(
				navigator.mediaDevices && navigator.mediaDevices.getUserMedia
			);
			const hasMediaRecorder = typeof MediaRecorder !== "undefined";
			const hasSupportedMimeType = getSupportedMimeType() !== "";

			if (
				!hasMediaDevices ||
				!hasMediaRecorder ||
				!hasSupportedMimeType
			) {
				setIsSupported(false);
				return;
			}

			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				stream.getTracks().forEach((track) => track.stop());
				setIsSupported(true);
			} catch (err) {
				console.error("Media devices error:", err);
				setIsSupported(false);
			}
		};

		checkSupport();
	}, []);

	const startRecording = async () => {
		if (!isSupported) {
			console.error("Recording is not supported in this browser");
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100,
				},
			});

			const mimeType = getSupportedMimeType();
			if (!mimeType) {
				throw new Error("No supported audio format found");
			}

			const mediaRecorder = new MediaRecorder(stream, {
				mimeType,
				audioBitsPerSecond: 128000,
			});

			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) {
					chunksRef.current.push(e.data);
				}
			};

			mediaRecorder.start(250);
			setIsRecording(true);
		} catch (error) {
			console.error("Error starting recording:", error);
			if (error instanceof Error) {
				alert(
					`Recording failed: ${error.message}. Please try using Safari on iOS or Chrome on Android.`
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

			mediaRecorderRef.current.onstop = async () => {
				try {
					const blob = new Blob(chunksRef.current, {
						type: "audio/webm",
					});

					// Convert to base64
					const reader = new FileReader();
					reader.onloadend = () => {
						const base64data = reader.result as string;
						resolve(base64data);
					};
					reader.onerror = () => {
						console.error("Error reading audio data");
						resolve("");
					};
					reader.readAsDataURL(blob);
				} catch (error) {
					console.error("Error processing audio:", error);
					resolve("");
				} finally {
					// Clean up
					mediaRecorderRef.current?.stream
						.getTracks()
						.forEach((track) => track.stop());
				}
			};

			try {
				mediaRecorderRef.current.stop();
			} catch (error) {
				console.error("Error stopping recording:", error);
			}
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
