import React, {FC, SetStateAction, useEffect, useRef} from 'react';

interface ContextMenuProps {
    children?: React.ReactNode
    setIsContextMenu: React.Dispatch<SetStateAction<boolean>>
    isContextMenu: boolean
    cursorPosition: { x: number, y: number }

}

const ContextMenu: FC<ContextMenuProps> = ({children, setIsContextMenu, isContextMenu, cursorPosition}) => {
    const ref = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsContextMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if (isContextMenu) return (
        <>
            <div className={'fixed top-0 left-0 bottom-0 right-0 bg-neutral-900/50 z-40'}/>
            <div ref={ref} className={'bg-neutral-800 p-4 rounded-lg z-50'}
                 style={{
                     position: 'absolute',
                     left: cursorPosition.x + 'px',
                     top: cursorPosition.y + 'px',
                 }}
            >
                <ul>
                    {children}
                    <li>Редактировать</li>
                    <li>Удалить</li>
                    <li onClick={() => setIsContextMenu(false)}>Отмена</li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenu;
