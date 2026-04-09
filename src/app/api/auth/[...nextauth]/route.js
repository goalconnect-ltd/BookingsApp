import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


//Main auth configuration
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            //fields for the login form
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            //This function checks if user credentials are correct 
            async authorize(credentials) {
                if (
                    credentials.email === "admin@gmail.com" && 
                    credentials.password === "admin123"
                ) {
                    return { id: 1, name: "Admin User", email: "admin@gmail.com" };
                }
                return null;
            },          
        })
    ],
            // Custom pages (optional)
            pages: {
                signIn: "/login",
            },

            session: {
                strategy: "jwt",
            },

            secret: process.env.NEXTAUTH_SECRET,

});
export { handler as GET, handler as POST };
