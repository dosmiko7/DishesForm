import { ValidationRule } from "react-hook-form";
import IFormInput from "../../shared/IFormInput.interface";

export interface IComponentInputProps {
	name: keyof IFormInput;
	control: any;
	rules: { required: boolean; pattern?: ValidationRule<RegExp>; validate?: (value: any) => any };
	label: string;
	step?: string;
	type?: string;
	inputProps?: { min: number; max?: number; step?: number; maxLength?: string };
	min?: number;
	max?: number;
	value?: number | string;
	defaultValue?: number;
	onChange?: (event: any) => any;
	transform?: any;
}
