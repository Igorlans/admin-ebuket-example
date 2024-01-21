import Login from "@/components/PageComponents/auth/login/Login";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
	try {
		const data = await getServerSession(context.req, context.res, authOptions)
		console.log('SERVER SIDE SESSION', data?.user?.storeId)
		const storeId = data?.user?.storeId;
		// console.log('SERVER SIDE status', status)
		if (storeId) {
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
const LoginPage = () => {
	return (
		<Login />
	);
};

export default LoginPage;