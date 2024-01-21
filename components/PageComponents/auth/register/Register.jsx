import classes from './register.module.scss';
import Input from "@/components/UI/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "next/image";
import MyButton from "@/components/UI/Button/Button";
import {registerFormSchema} from "@/validation/auth/registerFormSchema";
import OrLine from "@/components/UI/OrLine/OrLine";
import ProviderButton from "@/components/PageComponents/auth/ProviderButton/ProviderButton";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
const Register = () => {
	const router = useRouter()
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(registerFormSchema)
	})

	const handleGoogleSignIn = async () => {
		await signIn('google')
	}

	const submitHandler = async (data) => {
		console.log(data)
		try {
			const res = await fetch('/api/auth/signUp', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!res.ok) throw new Error('Помилка створення користувача')
			toast.success('Користувача створено')
			router.push('/login')
		} catch (e) {
			console.error(e.message)
			toast.error(e.message)
		}
	}

	return (
		<div className={classes.register}>
			<form className={classes.body} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<Image src={'/assets/icons/logo.svg'} alt={'main_logo'} width={200} height={100} />
					<Input variant={'outlined'} name={'email'} placeholder={'Email'}/>
					<Input variant={'outlined'} name={'password'} placeholder={'Пароль'} type={'password'}/>
					<Input variant={'outlined'} name={'confirmPassword'} placeholder={'Підтвердіть пароль'} type={'password'}/>
					<MyButton text={'Зареєструватись'} onClick={methods.handleSubmit(submitHandler)} style={{alignSelf: 'flex-end'}}/>
					<div className={classes.text}>
						<span>
							Вже зареєстровані?
						</span>
						<Link href={'/login'}>  Увійти</Link>
					</div>
					<OrLine />
					<ProviderButton provider={'google'} onClick={handleGoogleSignIn}/>
					<ProviderButton provider={'facebook'} />
					<Toaster
						position="top-center"
						reverseOrder={false}
						// reverseOrder={false}
					/>
				</FormProvider>
			</form>
		</div>
	);
};

export default Register;