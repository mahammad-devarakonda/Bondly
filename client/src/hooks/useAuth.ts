import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, isAuthenticated, isLoading, error } = useSelector(
        (state: RootState) => state.auth
    );

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        loginStart: () => dispatch(loginStart()),
        loginSuccess: (payload: { user: any; token: string }) => dispatch(loginSuccess(payload)),
        loginFailure: (err: string) => dispatch(loginFailure(err)),
        logout: () => dispatch(logout()),
    };
};
