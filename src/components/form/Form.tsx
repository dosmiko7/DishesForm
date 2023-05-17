// Hooks
import { SubmitHandler, useForm } from "react-hook-form";
import useFormSubmit from "../../hooks/useFormSubmit";
// SCSS
import classes from "./Form.module.scss";
// Components
import FormSubmitButton from "./FormSubmitButton";
import FormInputText from "./FormInputText";
import FormInputSelect from "./FormInputSelect";
import AdditionalInputs from "./FormAdditionalInputs";
import { Box, Grid, Typography } from "@mui/material";
// Types
import { IFormInput } from "../../interfaces/FormTypes";
// Props
import { defaultValues } from "../../constants/FormProps";
// Utils
import { formatData } from "../../utils/formatData";

const Form = () => {
	const { postData, response, error } = useFormSubmit(
		"https://react-testfetch-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
	);
	const methods = useForm<IFormInput>({
		defaultValues: { ...defaultValues },
		shouldUnregister: true,
	});
	const { control, handleSubmit, watch, reset } = methods;
	const selectedType = watch("type");

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const formattedData = formatData(data);
		postData(formattedData);
		console.log(response);
		console.log(error);
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
				<Typography
					variant="h3"
					align="center"
				>
					HexOcean Dishes
				</Typography>
				<FormInputText
					name="name"
					control={control}
					rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
					type="text"
					label="Name"
				/>
				<Box className={classes.form__duration_container}>
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
				</Box>
				<FormInputSelect
					name="type"
					control={control}
					rules={{ required: true, validate: (value) => value !== "default" }}
					label="Type of dish"
				/>
				<AdditionalInputs
					name="type"
					type={selectedType}
					control={control}
				/>
				<FormSubmitButton />
			</form>
		</Grid>
	);
};

export default Form;
