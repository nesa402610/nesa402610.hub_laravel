import React from 'react';

const Tabs = ({setActive, isActive}) => {
    return (
        <div className={'block--darker mb-4 flex sm:flex-col text-center'}>
            <div className={'flex gap-4'}>
                <div onClick={() => setActive(0)}
                        className={'block-lighter text-center xs:p-3 transition-all cursor-pointer'
                            + (isActive === 0 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Аккаунт
                </div>
                <div onClick={() => setActive(1)}
                        className={'block-lighter text-center xs:p-3 transition-all cursor-pointer'
                            + (isActive === 1 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Профиль
                </div>
                <div onClick={() => setActive(2)}
                        className={'block-lighter text-center xs:p-3 transition-all cursor-pointer'
                            + (isActive === 2 ? ' bg-stone-500' : ' hover:bg-stone-500')}
                >
                    Безопасность
                </div>
            </div>
        </div>
    );
};

export default Tabs;
