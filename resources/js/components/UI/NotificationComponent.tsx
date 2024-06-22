import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {clearNotification} from "store/reducers/notificationSlice";

enum TypeStyles {
    'error' = 'bg-red-600 border-2 border-red-500',
    'success' = 'bg-blue-500 border-2 border-blue-400',
    'system' = 'bg-neutral-500 border-2 border-neutral-400',
    'alert' = 'bg-orange-500 border-2 border-orange-400'
}

const NotificationComponent = () => {
    const dispatch = useAppDispatch();
    const {message, type} = useAppSelector((state) => state.notification);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <div
            className={`animate-smoky transition text-left fixed z-[10000] bottom-4 right-4 p-2 rounded-lg min-w-[200px] ${TypeStyles[type]} `}>
            <span>{message}</span>
        </div>
    );
};

export default NotificationComponent;
