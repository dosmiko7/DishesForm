import { IFormInput } from "../interfaces/FormTypes";

export const formatData = (data: IFormInput) => {
	const { prep_hours, prep_minutes, prep_seconds, ...rest } = data;
	const preparation_time = `${prep_hours.toString().padStart(2, "0")}:${prep_minutes
		.toString()
		.padStart(2, "0")}:${prep_seconds.toString().padStart(2, "0")}`;

	const updatedData = {
		...rest,
		preparation_time,
	};
	return updatedData;
};
