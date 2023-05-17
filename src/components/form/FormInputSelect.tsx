import { Controller } from "react-hook-form";
import { options } from "../../constants/FormProps";
import { IComponentInputProps } from "../../interfaces/FormTypes";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const FormInputSelect = ({ name, control, rules, label }: IComponentInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<FormControl
					fullWidth
					variant="outlined"
					required
					error={!!error}
				>
					<InputLabel>{label}</InputLabel>
					<Select
						label={label}
						value={value}
						onChange={onChange}
					>
						{options.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{error && <FormHelperText>Select a correct type</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};

export default FormInputSelect;
