import {createContext, useState} from "react";

const initialState = [
	// {cityId: null, formData: null},
]

export const CitiesContext = createContext(initialState);
export const CitiesFormProvider = ({ children }) => {

	const [cities, setCities] = useState(initialState);

	return (
		<CitiesContext.Provider value={{ cities, setCities }}>
			{children}
		</CitiesContext.Provider>
	);
};