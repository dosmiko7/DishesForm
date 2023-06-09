import { Control, ValidationRule } from "react-hook-form";

export interface IComponentInputProps {
	control: Control<any>;
	name: keyof IFormInput;
	rules?: { required: boolean; pattern?: ValidationRule<RegExp>; validate?: (value: any) => any };
	label?: string;
	step?: string;
	type?: string;
	inputProps?: { min: number; max?: number; step?: number; maxLength?: string };
	min?: number;
	max?: number;
	defaultValue?: number;
}

export interface IFormInput {
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
