import React, { useRef, useState, useEffect, useMemo } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from '../Redux/authSlice'
import getRandomImage from "../Utills/getRandomImage";
import { ToastContainer,toast } from 'react-toastify';

const VERIFY_OTP = gql`
  mutation VERIFYOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp) {
      message
      token
      user {
        id
        userName
        email
        avatar
      }
    }
  }
`;

const OTPInput = ({ length = 4 }) => {
  const [inputArray, setInputArray] = useState(new Array(length).fill(""));
  const arrayRef = useRef([]);
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = inputArray.join("").trim();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bgImage = useMemo(() => getRandomImage(), []);

  useEffect(() => {
    arrayRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newArray = [...inputArray];
    newArray[index] = value.slice(-1);
    setInputArray(newArray);

    if (value && index < length - 1) {
      arrayRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (e, index) => {
    if (e.key === "Backspace" && !inputArray[index] && index > 0) {
      arrayRef.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      handleSubmitOTP();
    }


  };

  const [verifyOTPMutation, { loading, error }] = useMutation(VERIFY_OTP);

  const handleSubmitOTP = async () => {
    try {
      const response = await verifyOTPMutation({
        variables: { email, otp },
      });

      const userData = response?.data?.verifyOTP?.user
      const token = response?.data?.verifyOTP?.token

      if (token && userData) {
        dispatch(loginSuccess({ user: userData, token }));
        navigate('/feed')
      } else {
        toast.error("Invalid OTP or something went wrong");
      }

    } catch (err) {
      console.error("OTP Verification Failed:", err);
      toast.error(err.message || "OTP Verification Failed.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="absolute flex flex-col items-center p-8 sm:p-10 rounded-2xl shadow-2xl bg-white w-[90%] max-w-md transition-all duration-300">
  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text mb-2 flex items-center gap-2">
    Bondly
  </h1>
  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-wide mb-2">
    Enter OTP
  </h2>
  <p className="text-sm text-gray-500 text-center mb-6">
    We've sent an OTP to your registered email. Please enter it below to continue.
  </p>

  <div className="flex justify-center gap-3 mb-8">
    {inputArray.map((input, index) => (
      <input
        key={index}
        type="text"
        className="w-14 h-14 border-2 border-gray-300 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 shadow-sm hover:scale-105"
        value={input}
        ref={(el) => (arrayRef.current[index] = el)}
        onChange={(e) => handleChange(e.target.value, index)}
        maxLength={1}
        onKeyDown={(e) => handleBackSpace(e, index)}
      />
    ))}
  </div>

  <button
    onClick={handleSubmitOTP}
    className="bg-gradient-to-r from-red-500 to-pink-500 w-full text-white py-3 rounded-lg text-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={loading}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Verifying...
      </span>
    ) : (
      "Submit"
    )}
  </button>

</div>
<ToastContainer/>
    </div>
  );
};

export default OTPInput;