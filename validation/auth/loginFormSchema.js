import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
	email: yup.string().required('Поле обов\'язкове'),
	password: yup.string().min(8, 'Мінімум 8 символів').required('Поле обов\'язкове'),
})