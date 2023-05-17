import classes from "./Form.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, MenuItem, Button, Slider, TextField, Typography } from "@mui/material";
import options from "../constants/selectOptions";
import defaultValues from "../constants/defaultValuesForDishes";
import IFormInput from "./shared/IFormInput.interface";
import FormInputSlider from "./form-components/FormInputSlider";
import FormSubmitButton from "./form-components/FormSubmitButton";
import FormInputText from "./form-components/FormInputText";

const Form = () => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: { ...defaultValues },
		shouldUnregister: true,
	});
	const selectedType = watch("type");

	const renderAdditionalInputs = () => {
		switch (selectedType) {
			case "pizza":
				return (
					<>
						<FormInputText
							name="no_of_slices"
							control={control}
							rules={{ required: true }}
							label="Number of slices"
							type="number"
							inputProps={{ min: 1 }}
						/>
						<FormInputText
							name="diameter"
							control={control}
							rules={{ required: true }}
							label="Diameter"
							type="number"
							inputProps={{ min: 1, step: 0.1 }}
						/>
					</>
				);
			case "soup":
				return (
					<FormInputSlider
						name="spiciness_scale"
						control={control}
						rules={{ required: true }}
						label="Spiciness"
						defaultValue={5}
						min={1}
						max={10}
					/>
				);
			case "sandwich":
				return (
					<FormInputText
						name="slices_of_bread"
						control={control}
						rules={{ required: true }}
						label="Slices of bread"
						type="number"
						inputProps={{ min: 1 }}
					/>
				);
			default:
				return null;
		}
	};

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
		reset({});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInputText
				name="name"
				control={control}
				rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
				type="text"
				label="Name"
			/>
			<div>
				<FormInputText
					name={"prep_hours"}
					control={control}
					rules={{ required: true, pattern: /^[0-9]*$/ }}
					type="number"
					label="Hours"
					inputProps={{ min: 0 }}
				/>
				<FormInputText
					name={"prep_minutes"}
					control={control}
					rules={{ required: true, pattern: /^[0-9]*$/ }}
					type="number"
					label="Minutes"
					inputProps={{ min: 0, max: 59 }}
				/>
				<FormInputText
					name={"prep_seconds"}
					control={control}
					rules={{ required: true, pattern: /^[0-9]*$/ }}
					type="number"
					label="Seconds"
					inputProps={{ min: 0, max: 59 }}
				/>
			</div>
			<Controller
				name="type"
				control={control}
				rules={{ required: true, validate: (value) => value !== "default" }}
				render={({ field }) => (
					<Select
						{...field}
						label="Type of meal"
						variant="outlined"
						fullWidth
						required
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
				)}
			/>
			{errors.type && errors.type.type === "required" && (
				<Typography color="error">Please select a meal type</Typography>
			)}
			{errors.type && errors.type.type === "validate" && (
				<Typography color="error">Please select a valid meal type</Typography>
			)}
			{renderAdditionalInputs()}
			<FormSubmitButton />
		</form>
	);
};

export default Form;
