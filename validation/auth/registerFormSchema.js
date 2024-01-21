import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
	email: yup.string().required('Поле обов\'язкове'),
	password: yup.string().min(8, 'Мінімум 8 символів').required('Поле обов\'язкове'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Паролі не співпадають").required('Поле обов\'язкове'),
})