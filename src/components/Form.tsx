import classes from "./Form.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, MenuItem, Button, Slider, TextField, Typography } from "@mui/material";
import options from "../constants/selectOptions";
import defaultValues from "../constants/defaultValuesForDishes";
import IFormInput from "./shared/IFormInput.interface";

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
						<Controller
							name="no_of_slices"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Number of slices"
									variant="outlined"
									type="number"
									fullWidth
									value={field.value ?? ""}
									onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									inputProps={{ min: 1 }}
									required
								/>
							)}
						/>

						<Controller
							name="diameter"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Diameter"
									variant="outlined"
									type="number"
									fullWidth
									value={field.value ?? ""}
									onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									inputProps={{ min: 1 }}
									required
								/>
							)}
						/>
					</>
				);
			case "soup":
				return (
					<Controller
						name="spiciness_scale"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Slider
								aria-label="Spiciness"
								defaultValue={5}
								valueLabelDisplay="auto"
								onChange={(e, value) => field.onChange(value)}
								step={1}
								marks
								min={1}
								max={10}
							/>
						)}
					/>
				);
			case "sandwich":
				return (
					<Controller
						name="slices_of_bread"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Slices of bread"
								variant="outlined"
								type="number"
								fullWidth
								value={field.value ?? ""}
								onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
								inputProps={{ min: 1 }}
								required
							/>
						)}
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
			<Controller
				name="name"
				control={control}
				rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
				render={({ field }) => (
					<TextField
						{...field}
						type="text"
						label="name"
						required
					/>
				)}
			/>
			{errors.name && errors.name.type === "pattern" && (
				<Typography color="error">Meal should have only letters</Typography>
			)}
			{errors.name && errors.name.type === "required" && (
				<Typography color="error">Please enter name for your dish</Typography>
			)}
			<div>
				<Controller
					name="prep_hours"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label="Hours"
							inputProps={{ min: 0 }}
							required
						/>
					)}
				/>
				<Controller
					name="prep_minutes"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label="Minutes"
							inputProps={{ min: 0, max: 59 }}
							required
						/>
					)}
				/>
				<Controller
					name="prep_seconds"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							type="number"
							label="Seconds"
							inputProps={{ min: 0, max: 59 }}
							required
						/>
					)}
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
			<Button
				variant="outlined"
				type="submit"
			>
				Submit dish
			</Button>
		</form>
	);
};

export default Form;
