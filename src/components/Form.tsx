import classes from "./Form.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import defaultValues from "../constants/defaultValuesForDishes";
import IFormInput from "./shared/IFormInput.interface";
import FormInputSlider from "./form-components/FormInputSlider";
import FormSubmitButton from "./form-components/FormSubmitButton";
import FormInputText from "./form-components/FormInputText";
import FormInputSelect from "./form-components/FormInputSelect";
import { Grid } from "@mui/material";
import axios from "axios";

const Form = () => {
	const methods = useForm<IFormInput>({
		defaultValues: { ...defaultValues },
		shouldUnregister: true,
	});
	const { control, handleSubmit, watch, reset } = methods;
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

	const formatData = (data: IFormInput) => {
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

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const formattedData = formatData(data);
		console.log(formattedData);
		try {
			const response = await axios.post(
				"https://react-testfetch-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
				formattedData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response);
		} catch (error: any) {
			if (error.response) {
				console.log("Validation errors:", error.response.data);
			} else {
				console.error("Request failed:", error.message);
			}
		}
		reset({});
	};

	return (
		<Grid
			className={classes.container}
			container
			sx={{ flexGrow: 1 }}
		>
			<form
				className={classes.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className={classes.form__heading}>HexOcean Dishes</h1>
				<FormInputText
					name="name"
					control={control}
					rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
					type="text"
					label="Name"
				/>
				<div className={classes.form__duration_container}>
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
				<FormInputSelect
					name="type"
					control={control}
					rules={{ required: true, validate: (value) => value !== "default" }}
					label="Type of dish"
				/>
				{renderAdditionalInputs()}
				<FormSubmitButton />
			</form>
		</Grid>
	);
};

export default Form;
