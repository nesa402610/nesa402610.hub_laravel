import React, {FC, SetStateAction, useEffect} from 'react';
import useClickOutside from "hooks/useClickOutside";
import Portal from "components/UI/Portal";
import CopyURL from "components/UI/ContextMenu/CopyURL";
import Delete from "components/UI/ContextMenu/Delete";
import {useGetUserQuery} from "services/userService";
import AdminChecker from "components/AdminChecker";

interface ContextMenuProps {
    children?: React.ReactNode
    contextMenu: boolean
    setContextMenu: React.Dispatch<SetStateAction<boolean>>
    link?: string
    position: any
    cancel?: boolean
    adminOnly?: boolean
    deleteFn?: () => void
}

const ContextMenu: FC<ContextMenuProps> = ({
                                               children,
                                               setContextMenu,
                                               link,
                                               contextMenu,
                                               position,
                                               cancel = false,
                                               deleteFn = null,
                                               adminOnly = false
                                           }) => {
    const {ref, isOpen, setIsOpen} = useClickOutside(contextMenu)
    const {data} = useGetUserQuery()

    useEffect(() => {
        setContextMenu(isOpen)
    }, [isOpen]);
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, []);
    if (adminOnly && data?.role[0].name !== 'Admin') return null
    return (
        <Portal>
            <div ref={ref} className={'bg-neutral-900 min-w-[180px] rounded-lg z-50 overflow-hidden'}
                 style={{
                     position: 'absolute',
                     left: position.x + 'px',
                     top: position.y + 'px',
                 }}>
                <ul className={'contextMenu'}>
                    {children &&
                        <div className={'custom mb-2'}>
                            {children}
                        </div>
                    }
                    <div className={'default'}>
                        <CopyURL link={link} setIsOpen={setIsOpen}/>
                        {deleteFn &&
                            <AdminChecker>
                                <Delete deleteFn={deleteFn}/>
                            </AdminChecker>
                        }
                        {cancel && <li onClick={() => setIsOpen(false)}>Отмена</li>}
                    </div>
                </ul>
            </div>
        </Portal>

    );
};

export default ContextMenu;
