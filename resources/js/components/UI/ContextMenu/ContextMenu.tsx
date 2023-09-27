import React, {FC, SetStateAction, useEffect} from 'react';
import useClickOutside from "hooks/useClickOutside";
import Portal from "components/UI/Portal";
import CopyURL from "components/UI/ContextMenu/CopyURL";
import Delete from "components/UI/ContextMenu/Delete";
import {useGetUserQuery} from "services/userService";

interface ContextMenuProps {
    children?: React.ReactNode
    contextMenu: { isOpen: boolean, link: null | string }
    setContextMenu: React.Dispatch<SetStateAction<{ isOpen: boolean, link: null | string }>>
    position: any
    cancel?: boolean
    deleteFn?: () => void | null
}

const ContextMenu: FC<ContextMenuProps> = ({children, setContextMenu, contextMenu, position, cancel = false, deleteFn = null}) => {
    const {data: user} = useGetUserQuery()
    const {ref, isOpen, setIsOpen} = useClickOutside()

    useEffect(() => {
        if (contextMenu.isOpen && !isOpen) {
            setIsOpen(true)
        } else {
            setContextMenu({...contextMenu, isOpen: false})
        }
    }, [contextMenu.isOpen, isOpen]);


    if (isOpen) return (
        <Portal>
            <div ref={ref} className={'bg-neutral-900 min-w-[180px] rounded-lg z-50 overflow-hidden'}
                 style={{
                     position: 'absolute',
                     left: position.x + 'px',
                     top: position.y + 'px',
                 }}>
                <ul className={'contextMenu'}>
                    <div className={'custom'}>
                        {children}
                    </div>
                    <div className={'mt-2 default'}>
                        <CopyURL link={contextMenu.link} setIsOpen={setIsOpen}/>
                        {(deleteFn && user?.role[0].name === 'Admin') && <Delete deleteFn={deleteFn}/>}
                        {cancel && <li onClick={() => setIsOpen(false)}>Отмена</li>}
                    </div>
                </ul>
            </div>
        </Portal>

    );
};

export default ContextMenu;
