import classes from "./Form.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, MenuItem, Typography } from "@mui/material";
import options from "../constants/selectOptions";
import defaultValues from "../constants/defaultValuesForDishes";
import IFormInput from "./shared/IFormInput.interface";
import FormInputSlider from "./form-components/FormInputSlider";
import FormSubmitButton from "./form-components/FormSubmitButton";
import FormInputText from "./form-components/FormInputText";
import FormInputSelect from "./form-components/FormInputSelect";

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
			<FormInputSelect
				name="type"
				control={control}
				rules={{ required: true, validate: (value) => value !== "default" }}
				label="Type of dish"
			/>
			{renderAdditionalInputs()}
			<FormSubmitButton />
		</form>
	);
};

export default Form;
