import * as yup from "yup";

export const employeeFormSchema = yup.object().shape({
    name: yup.string().required('Поле обов\'язкове'),
    phone: yup.string().required('Поле обов\'язкове').min(19, 'Неправильний формат'),
    email: yup.string().email('Неправильний формат').required('Поле обов\'язкове'),
    role: yup.string().required('Поле обов\'язкове'),
    password: yup.string().required('Поле обов\'язкове').min(8, 'Мінімум 8 символів')
})