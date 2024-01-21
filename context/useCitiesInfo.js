import {useContext} from "react";
import {CitiesContext} from "@/context/providers/CitiesFormProvider";

export const useCitiesInfo = () => {
	const context = useContext(CitiesContext);

	if (context === undefined) {
		throw new Error("useCitiesInfo must be used within a ContextProvider");
	}
	return context;
};