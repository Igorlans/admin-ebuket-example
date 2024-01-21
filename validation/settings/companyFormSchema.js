import * as yup from "yup";

export const companyFormSchema = yup.object().shape({
	shop_name: yup.string().required('Поле обов\'язкове'),
	description: yup.string().max(500, 'Поле може містити максимум 500 символів').required('Поле обов\'язкове'),
	name: yup.string().required('Поле обов\'язкове'),
	phone: yup.string().required('Поле обов\'язкове'),
	email: yup.string().email().required('Поле обов\'язкове'),
	prefer_phone: yup.boolean(),
	prefer_viber: yup.boolean(),
	prefer_telegram: yup.boolean(),
	prefer_email: yup.boolean(),
	cityId: yup.number().required('Поле обов\'язкове'),
})