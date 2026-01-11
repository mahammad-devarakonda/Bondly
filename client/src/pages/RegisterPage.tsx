import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_MUTATION } from '../graphql/operations';
import { useMutation } from '@apollo/client/react';
import { Box, Card, Input, Typography, Button } from "@orbit_ui_toolkit/orbitui-kit";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [register, { loading }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data: any) => {
            setSuccessMsg(data.register.message || 'Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000);
        },
        onError: (error: any) => {
            setErrorMsg(error.message || 'Registration failed.');
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        if (!userName || !email || !password) {
            setErrorMsg('Please fill in all fields.');
            return;
        }
        await register({ variables: { userName, email, password } });
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
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 p-8"
                >
                    <Typography
                        variant="h1"
                        weight="extrabold"
                        align="center"
                        gradient
                        className="tracking-tight"
                    >
                        Join Bondly
                    </Typography>

                    {errorMsg && (
                        <Typography variant="caption" align="center" color="text-red-500 animate-pulse">
                            {errorMsg}
                        </Typography>
                    )}

                    {successMsg && (
                        <Typography variant="caption" align="center" color="text-green-500">
                            {successMsg}
                        </Typography>
                    )}

                    <Input
                        variant="glass"
                        label="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Choose a username"
                        required
                    />

                    <Input
                        variant="glass"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <Input
                        variant="glass"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                    />

                    <Button
                        variant="gradient"
                        isLoading={loading}
                        type="submit"
                        fullWidth
                        size="lg"
                    >
                        Sign Up
                    </Button>
                </form>

                <Box glass className="p-4 border-t border-gray-800">
                    <Typography variant="body2" color="text-white" align="center">
                        Already have an account?{" "}
                        <Link className="text-blue-400 hover:text-blue-300 transition-colors" to="/login">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default RegisterPage;
