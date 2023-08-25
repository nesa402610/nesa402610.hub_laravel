import React, {FC, SetStateAction} from 'react';
import {HiCubeTransparent} from 'react-icons/hi2';

interface BbCodeProps {
    refer: any
    setComment: React.Dispatch<SetStateAction<string>>
}

const BbCode: FC<BbCodeProps> = ({refer, setComment}) => {
    const style = 'bg-neutral-600 px-2 flex items-center justify-center w-[30px] h-[30px] hover:bg-neutral-500 transition-all cursor-pointer rounded-lg'
    const getSelectedText = () => {
        const start = refer.current.selectionStart;
        const end = refer.current.selectionEnd;

        const selectedText = refer.current.value.substring(start, end);
        return {selectedText, start, end}
    };
    const addBBCode = (e) => {
        const code = e.currentTarget.dataset.code
        if (!code) return
        const {selectedText, start, end} = getSelectedText()
        const bbCode = `[${code}]${selectedText}[/${code}]`
        setComment(prev => prev.substring(0, start) + bbCode + prev.substring(end))
    }
    return (
        <div className={'flex gap-2'}>
            <div onClick={addBBCode} data-code={'b'} className={`${style} font-bold`}>
                B
            </div>
            <div onClick={addBBCode} data-code={'em'} className={`${style} italic`}>
                I
            </div>
            <div onClick={addBBCode} data-code={'u'} className={`${style} underline`}>
                U
            </div>
            <div onClick={addBBCode} data-code={'spoiler'} className={`${style}`}>
                <HiCubeTransparent/>
            </div>
        </div>
    );
};

export default BbCode;
