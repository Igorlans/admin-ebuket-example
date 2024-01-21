import { withAuth } from "next-auth/middleware"

export default withAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: ({ token }) => {
            console.log("with auth TOKEN", token)
            if (token) {
                return true
            } else {
                return false
            }
            // console.log("with auth session", session)
        },
    },
})
export const config = { matcher: ['/((?!api|_next|assets|favicon.ico|login|register).*)'] }
