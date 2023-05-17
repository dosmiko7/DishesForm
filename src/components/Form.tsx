import classes from "./Form.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, MenuItem, Button, TextField, Typography } from "@mui/material";

const options = [
	{ value: "default", label: "Choose type of your dish" },
	{ value: "pizza", label: "Pizza" },
	{ value: "soup", label: "Soup" },
	{ value: "sandwich", label: "Sandwich" },
];

const defaultValues = {
	name: "Dish",
	type: "default",
	prep_hours: 1,
	prep_minutes: 0,
	prep_seconds: 0,
	no_of_slices: 1,
	diameter: 1,
	spiciness_scale: 5,
	slices_of_bread: 1,
};

interface IPreparationTime {
	hours: number;
	minutes: number;
	seconds: number;
}

interface IPizza {
	no_of_slices: number;
	diameter: number;
}

interface ISoup {
	spiciness_scale: number;
}

interface ISandwich {
	slices_of_bread: number;
}

type IFormInput = {
	name: string;
	type: string;
	preparation_time: IPreparationTime;
} & (IPizza | ISoup | ISandwich);

const Form = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: { ...defaultValues },
		shouldUnregister: true,
	});

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
					name="preparation_time.hours"
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
					name="preparation_time.minutes"
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
					name="preparation_time.seconds"
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
