import React from 'react';
import {FormProvider, useForm, useFormContext} from "react-hook-form";

const Form = ({children, onSubmit, ...props}) => {
	const methods = useFormContext();
	return (
		<form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
			<FormProvider {...methods}>
				{children}
			</FormProvider>
		</form>
	);
};

export default Form;