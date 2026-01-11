import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Code } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Box, Card, Input, Typography, Button } from "@orbit_ui_toolkit/orbitui-kit";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
     message
    }
  }
`;

interface LoginData {
    login: {
        message: string;
    }
}

const LoginPage: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [login, { loading }] = useMutation<LoginData>(LOGIN);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const authData = useAuth();

    useEffect(() => {
        if (authData?.error) {
            console.error("Me query failed:", authData.error);
        }
        if (authData?.isAuthenticated) {
            navigate('/feed');
        }
    }, [authData, navigate]);

    const handleButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;

        if (!email) {
            setErrorMsg("Please enter the email!");
            emailRef?.current?.focus();
            return;
        }

        if (!password) {
            setErrorMsg("Please enter the password!");
            passwordRef?.current?.focus();
            return;
        }

        try {
            const response = await login({
                variables: { email, password },
            });

            if (response?.data?.login?.message) {
                navigate('/2factorAuth', { state: { email } });
            } else {
                setErrorMsg("Login failed. Please try again.");
            }
        } catch (err: any) {
            const errorMessage = err?.message || err?.graphQLErrors?.[0]?.message || "An unknown error occurred";
            setErrorMsg(errorMessage);
        }
    };

    return (
        <Box
            fullScreen
            center
            bgImage="https://cbx-prod.b-cdn.net/COLOURBOX61207252.jpg?width=800&height=800&quality=70"
            overlay
            className="overflow-hidden"
        >
            <Card variant="glass" className="w-full max-w-md" noPadding>
                <form
                    onSubmit={handleButtonClick}
                    className="flex flex-col gap-6 p-8"
                >
                    <Typography
                        variant="h1"
                        weight="extrabold"
                        align="center"
                        className="tracking-tight"
                        gradient
                    >
                        Bondly
                    </Typography>

                    <Input
                        variant="glass"
                        ref={emailRef}
                        type="email"
                        placeholder="Email or Username"
                        aria-label="Email or Username"
                    />

                    <Input
                        variant="glass"
                        ref={passwordRef}
                        type={!showPassword ? "password" : "text"}
                        placeholder="Password"
                        rightIcon={
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="hover:text-pink-500 transition-colors duration-200 cursor-pointer"
                            >
                                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </span>
                        }
                    />

                    {errorMsg && (
                        <Typography variant="caption" align="center" color="text-red-500 animate-pulse">
                            {errorMsg}
                        </Typography>
                    )}

                    <Button
                        variant="gradient"
                        isLoading={loading}
                        onClick={handleButtonClick}
                        fullWidth
                        size="lg"
                    >
                        Login
                    </Button>
                </form>

                <Box glass className="p-4 border-t border-gray-800">
                    <Typography variant="body2" color="text-white" align="center">
                        New to Bondly?{" "}
                        <Link className="text-blue-400 hover:text-blue-300 transition-colors" to="/register">
                            Create account
                        </Link>
                    </Typography>
                </Box>
            </Card>

            <div className="fixed top-4 right-4 z-20">
                <Link
                    to="/developer"
                    className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
                >
                    <Code size={22} />
                    <span className="text-[10px]">About Developer</span>
                </Link>
            </div>
        </Box>
    );
};

export default LoginPage;
