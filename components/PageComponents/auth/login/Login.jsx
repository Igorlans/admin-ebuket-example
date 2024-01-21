import classes from './login.module.scss';
import Input from "@/components/UI/Input/Input";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormSchema} from "@/validation/auth/loginFormSchema";
import Image from "next/image";
import OrLine from "@/components/UI/OrLine/OrLine";
import ProviderButton from "@/components/PageComponents/auth/ProviderButton/ProviderButton";
import MyButton from "@/components/UI/Button/Button";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
const Login = () => {
	const { data: session, status, update } = useSession()
	const router = useRouter();
	console.log("SESSION", session)
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(loginFormSchema)
	})

	const submitHandler = async (data) => {
		console.log(data)
		try {
			await toast.promise(
				signIn('credentials', {
					redirect: false,
					email: data.email,
					password: data.password
				}),
				{
					loading: () => 'Вхід...',
					success: (res) => {
						console.log("RESPONSE", res)
						if (!res.ok) throw new Error(res.error)
						router.push('/')
						return 'Вхід успішний'
					},
					error: (err) => `${err.message}`
				}
			)
		} catch (e) {
			console.error('AUTH ERROR', e.message)
		}

	}

	return (
		<div className={classes.login}>
			<form className={classes.body} onSubmit={methods.handleSubmit(submitHandler)}>
				<FormProvider {...methods}>
					<Image src={'/assets/icons/logo.svg'} alt={'main_logo'} width={200} height={100} />
					<Input variant={'outlined'} name={'email'} placeholder={'Email'}/>
					<Input variant={'outlined'} name={'password'} placeholder={'Пароль'} type={'password'}/>
					<MyButton text={'Увійти'} onClick={methods.handleSubmit(submitHandler)} style={{alignSelf: 'flex-end'}}/>
					<div className={classes.text}>
						<span style={{display: 'block'}}>Не зареєстровані?</span>
						<Link href={'/register'}>  Створити акаунт</Link>
					</div>
					<OrLine />
					<Toaster
						position="top-center"
						reverseOrder={false}
						// reverseOrder={false}
					/>
					<ProviderButton onClick={() => signIn('google')} provider={'google'} />
					<ProviderButton provider={'facebook'} />
				</FormProvider>
			</form>
		</div>
	);
};

export default Login;