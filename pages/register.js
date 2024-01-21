import Register from "@/components/PageComponents/auth/register/Register";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
export async function getServerSideProps(context) {
	try {
		const data = await getServerSession(context.req, context.res, authOptions)
		console.log('SERVER SIDE SESSION', data)
		// console.log('SERVER SIDE status', status)
		if (data) {
			return {
				redirect: {
					permanent: false,
					destination: '/'
				},
				props: {

				}
			}
		} else {
			return {
				props: {

				}
			}
		}

	} catch (e) {

	}
}
const RegisterPage = () => {
	return (
		<Register />
	);
};

export default RegisterPage;