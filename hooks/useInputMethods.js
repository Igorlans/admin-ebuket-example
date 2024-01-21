import {useFormContext} from "react-hook-form";

export const useFormMethods = () => {
	try {
		const methods = useFormContext();
		return methods;
	} catch (e) {
		// console.log(e)
		return false;
	}

}