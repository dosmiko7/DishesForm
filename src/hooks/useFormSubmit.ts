import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

const useFormSubmit = (url: string) => {
	const [response, setResponse] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	const postData = async (data: {}) => {
		try {
			const response: AxiosResponse<any> = await axios.post(url, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setResponse(response);
			setError(null);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					setError("Validation errors: " + error.response.data);
				} else {
					setError("Request failed: " + (error as AxiosError).message);
				}
			} else {
				setError("Request failed: " + String(error));
			}
			setResponse(null);
		}
	};

	return { postData, response, error };
};

export default useFormSubmit;
