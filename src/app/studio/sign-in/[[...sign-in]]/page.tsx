import { SignIn } from "@clerk/nextjs";

export default function StudioSignInPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FAFAF7",
            }}
        >
            <SignIn
                afterSignInUrl="/studio"
                signUpUrl="/studio/sign-up"
            />
        </div>
    );
}
