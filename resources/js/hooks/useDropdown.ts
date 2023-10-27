import {useState} from 'react';
import {useNavigate} from "react-router-dom";

const useDropdown = (initState = false) => {
    const [isOpen, setIsOpen] = useState(initState)
    const [pos, setPos] = useState({x: 0, y: 0});
    const [link, setLink] = useState(null);
    const nav = useNavigate()

    const toggleHandle = (e: any, link?: string) => {
        e.preventDefault()
        if (e.touches) {
            const touch = e.touches[0]
            setPos({x: touch.clientX, y: touch.clientY})
        } else {
            setPos({x: e.clientX, y: e.clientY})
        }
        setIsOpen(prev => !prev)
        if (link) setLink(`${window.location.href}/${link}`)
    }
    return {toggleHandle, isOpen, setIsOpen, nav, pos, link}


};

export default useDropdown;
