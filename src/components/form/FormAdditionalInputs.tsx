import { IComponentInputProps } from "../../interfaces/FormTypes";
import FormInputText from "./FormInputText";
import FormInputSlider from "./FormInputSlider";

const AdditionalInputs = ({ name, type, control }: IComponentInputProps) => {
	switch (type) {
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

export default AdditionalInputs;
