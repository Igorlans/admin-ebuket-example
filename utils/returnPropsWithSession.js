import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export const customGetServerSession = async (context) => {
	let session = await getServerSession(context.req, context.res, authOptions);
	session = JSON.parse(JSON.stringify(session))
	return session;
}