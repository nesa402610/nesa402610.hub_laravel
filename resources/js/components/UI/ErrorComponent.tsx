import React, {useEffect} from 'react';
import {clearError} from "store/reducers/errorSlice";
import {useAppDispatch, useAppSelector} from "hooks/redux";

const ErrorComponent = () => {
    const dispatch = useAppDispatch();
    const errorMessage = useAppSelector((state) => state.error.message);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, dispatch]);

    if (!errorMessage) return null;

    return (
        <div
            className="animate-smoky transition text-left absolute z-50 bottom-4 right-4 block--lighter border-2 shadow-md">
            <h2>Ошибка</h2>
            <span>{errorMessage}</span>
        </div>
    );
};

export default ErrorComponent;
