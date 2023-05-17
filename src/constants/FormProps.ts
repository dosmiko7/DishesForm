export const defaultValues = {
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

export const options = [
	{ value: "default", label: "Choose type of your dish" },
	{ value: "pizza", label: "Pizza" },
	{ value: "soup", label: "Soup" },
	{ value: "sandwich", label: "Sandwich" },
];
