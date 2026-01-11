import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { VERIFY_OTP_MUTATION } from '../graphql/operations';
import { useAuth } from '../hooks/useAuth';
import { Box, Card, Typography, Button } from "@orbit_ui_toolkit/orbitui-kit";

const TwoFactorAuth: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginSuccess } = useAuth();
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
    const [errorMsg, setErrorMsg] = useState('');
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    const [verifyOTP, { loading }] = useMutation(VERIFY_OTP_MUTATION, {
        onCompleted: (data: any) => {
            if (data.verifyOTP.token) {
                loginSuccess({
                    user: data.verifyOTP.user,
                    token: data.verifyOTP.token
                });
                navigate('/feed', { replace: true });
            } else {
                setErrorMsg(data.verifyOTP.message || 'Verification failed.');
            }
        },
        onError: (error: any) => {
            setErrorMsg(error.message || 'Verification failed.');
        }
    });

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setErrorMsg('Please enter all 4 digits.');
            return;
        }
        await verifyOTP({ variables: { email, otp: otpValue } });
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
                <div className="flex flex-col gap-6 p-8 items-center">
                    <div className="text-5xl mb-2">🔐</div>
                    <Typography
                        variant="h3"
                        weight="bold"
                        align="center"
                        color="text-white"
                    >
                        Two-Factor Authentication
                    </Typography>

                    <Typography variant="body2" align="center" color="text-gray-400">
                        Enter the 4-digit code sent to <br />
                        <span className="font-bold text-white">{email}</span>
                    </Typography>

                    {errorMsg && (
                        <Typography variant="caption" align="center" color="text-red-500 animate-pulse">
                            {errorMsg}
                        </Typography>
                    )}

                    <div className="flex justify-between w-full gap-2 mb-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-12 h-14 text-center text-2xl font-bold bg-black/30 border border-gray-600 rounded-xl text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                            />
                        ))}
                    </div>

                    <Button
                        variant="gradient"
                        isLoading={loading}
                        onClick={handleVerify}
                        fullWidth
                        size="lg"
                    >
                        Verify & Continue
                    </Button>

                    <Typography variant="caption" color="text-gray-400">
                        Didn't receive a code?{" "}
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">Resend</button>
                    </Typography>
                </div>

                <Box glass className="p-4 border-t border-gray-800">
                    <Typography variant="body2" color="text-white" align="center">
                        Back to{" "}
                        <Link className="text-blue-400 hover:text-blue-300 transition-colors" to="/login">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default TwoFactorAuth;
