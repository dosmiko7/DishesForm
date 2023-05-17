interface IFormInput {
	name: string;
	type: string;
	prep_hours: number;
	prep_minutes: number;
	prep_seconds: number;
	no_of_slices?: number;
	diameter?: number;
	spiciness_scale?: number;
	slices_of_bread?: number;
}

export default IFormInput;
