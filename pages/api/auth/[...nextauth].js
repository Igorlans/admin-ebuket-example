import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXT_AUTH_SECRET,
	providers: [
		GoogleProvider({
			name: 'Google',
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const {email, password} = credentials;
				const dbUser = await prisma.user.findUnique({
					where: {
						email
					},
					include: {
						likedBukets: {
							select: {
								id: true
							}
						},
						Employee: true,
						SuperUser: true
					}
				})
				if (!dbUser) {
					throw new Error('Користувача не знайдено\nСтворіть обліковий запис')
				}
				if (!dbUser.password) {
					throw new Error('Невірний метод авторизації\nСпробуйте увійти за допомогою Google')
				}
				if (dbUser.password !== password) {
					throw new Error('Неправильний пароль')
				}
				const isSuperUser = !!dbUser?.SuperUser?.id;
				const user = {...dbUser, ...dbUser?.Employee};
				delete user?.Employee;

				if (isSuperUser) {
					return user;
				}

				if (!user.storeId) {
					throw new Error("Обліковий запис не прив'язаний до жодного з магазинів")
				}
				return user;
			}
		})
	],
	callbacks: {
		async signIn({account, user, profile}) {
			try {
				console.log('SIGN IN USER', user)
				console.log('SIGN IN profile', profile)
				console.log('SIGN IN account', account)
				if (account?.provider === 'google') {
					const {email} = user;
					const existingUser = await prisma.User.findUnique({
						where: {email},
					});

					if (existingUser) {
						// User already exists, nothing to do here
						return true;
					}

					// User does not exist, create employee
					const newUser = await prisma.User.create({
						data: {
							email,
							accounts: {
								create: {
									type: account.type,
									provider: account.provider,
									providerAccountId: account.providerAccountId,
									access_token: account.accessToken,
									refresh_token: account.id_token,
									expires_at: account.expiresAt,
								},
							},
						},
					});

					const newStore = await prisma.Store.create({
						data: {
							shop_name: 'Невідомий магазин',
							name: email,
							phone: 'вкажіть номер',
							email: email,
							Employees: {
								create: {
									userId: newUser.id,
									role: 'OWNER'
								}
							}
						},
					})
				}
				return true
			} catch (e) {
				console.log(e)
				throw e
			}
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			console.log("TOKEN", token)
			const email = token.email;
			const dbUser = await prisma.user.findUnique({
				where: {
					email
				},
				include: {
					likedBukets: {
						select: {
							id: true
						}
					},
					Employee: {
						include: {
							store: true
						}
					},
					SuperUser: true
				}
			})
			console.log(dbUser)
			const isSuperUser = !!dbUser?.SuperUser?.id;
			let sessionUser;
			if (!isSuperUser) {
				sessionUser = {...user, ...dbUser, ...dbUser?.Employee, store: dbUser?.Employee?.store}
				delete sessionUser?.Employee;
			} else {
				sessionUser = {...user, ...dbUser}
			}
			return {...session, user: sessionUser}
		}
	}

}
export default NextAuth(authOptions)