import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IComponentInputProps } from "./shared/IComponentInputProps.interface";

const FormInputText = ({ name, control, rules, type, label, inputProps }: IComponentInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value = "0" }, fieldState: { error }, formState }) => (
				<TextField
					helperText={error ? "Incorrect entry" : ""}
					error={!!error}
					onChange={onChange}
					value={isNaN(value) ? value.toString() : parseFloat(value)}
					label={label}
					type={type}
					inputProps={inputProps}
					variant="standard"
					InputLabelProps={{ shrink: true }}
				/>
			)}
		/>
	);
};

export default FormInputText;
