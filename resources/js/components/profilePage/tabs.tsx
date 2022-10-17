import React from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";

const Tabs = ({setActive, isActive}) => {
    return (
        <BgCard className={'mb-4 flex sm:flex-col text-center'}>
            <div className={'flex gap-4'}>
                <FgCard onClick={() => setActive(0)}
                        className={'text-center transition-all cursor-pointer'
                            + (isActive === 0 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Аккаунт
                </FgCard>
                <FgCard onClick={() => setActive(1)}
                        className={'text-center transition-all cursor-pointer'
                            + (isActive === 1 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Профиль
                </FgCard>
                <FgCard onClick={() => setActive(2)}
                        className={'text-center transition-all cursor-pointer'
                            + (isActive === 2 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Безопасность
                </FgCard>
            </div>
        </BgCard>
    );
};

export default Tabs;
