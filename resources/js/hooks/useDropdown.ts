import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const useDropdown = (initState = false, admin = false) => {
    const [isOpen, setIsOpen] = useState(initState)
    const [pos, setPos] = useState({x: 0, y: 0});
    const [link, setLink] = useState(null);
    const nav = useNavigate()

    const toggleHandle = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | MouseEvent>, link?: string) => {
        e.preventDefault()
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
            setPos({x: e.clientX, y: e.clientY})
        }
        if (link) setLink(`${window.location.href}/${link}`)
    }

    return {toggleHandle, isOpen, setIsOpen, nav, pos, link}


};

export default useDropdown;
