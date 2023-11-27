import React, {FC, ReactNode} from 'react';
import {createPortal} from "react-dom";

interface PortalProps {
    children: ReactNode
    variant?: 'fullscreen' | 'center' | 'none'
}

const Portal: FC<PortalProps> = ({children, variant = 'fullscreen'}) => {
    const variants = {
        fullscreen: 'inset-0',
        center: 'justify-center',
    }
    return (
        createPortal(
            <div className={`z-50 ${variants[variant]} flex fixed bg-neutral-900/70`}>
                {children}
            </div>,
            document.body,
        )
    );
};

export default Portal;
