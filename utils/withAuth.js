import useVerificationRedirect from "@/hooks/useVerificationRedirect";
const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const session = useVerificationRedirect()

        if(Component?.getLayout) {
            return !!session ? Component.getLayout(<Component session={session} {...props} />) : null; // Render whatever you want while the authentication occurs
        } else {
            return !!session ? <Component session={session} {...props} /> : null; // Render whatever you want while the authentication occurs
        }

    };

    return AuthenticatedComponent;
};

export default withAuth;