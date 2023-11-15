import {useEffect} from "react";

const usePageTitle = (newTitle: string) => {
    const oldtitle = document.title

    useEffect(() => {
        if (newTitle) document.title = `${newTitle} || n/esa | blog`
        return () => {
            document.title = oldtitle
        }
    }, [newTitle]);
};

export default usePageTitle;
