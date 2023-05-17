import { Controller } from "react-hook-form";
import { Box, Slider, Typography } from "@mui/material";
import { IComponentInputProps } from "../../interfaces/FormTypes";

const FormInputSlider = ({ name, control, rules, label, defaultValue, min, max }: IComponentInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<Box>
					<Typography
						variant="overline"
						gutterBottom
					>
						{label}
					</Typography>
					<Slider
						aria-label={label}
						defaultValue={defaultValue}
						valueLabelDisplay="auto"
						onChange={onChange}
						step={1}
						marks
						min={min}
						max={max}
					/>
				</Box>
			)}
		/>
	);
};

export default FormInputSlider;
