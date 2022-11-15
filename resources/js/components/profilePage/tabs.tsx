import React from 'react';

const Tabs = ({setActive, isActive}) => {
    return (
        <div className={'block--light mb-4'}>
            <div className={'flex gap-4'}>
                <div onClick={() => setActive(0)}
                        className={'block--lighter text-center flex-1 transition-all cursor-pointer'
                            + (isActive === 0 ? ' bg-stone-500' : ' hover:bg-stone-500 block--dark')}
                >
                    Аккаунт
                </div>
                <div onClick={() => setActive(1)}
                        className={'block--lighter text-center flex-1 transition-all cursor-pointer'
                            + (isActive === 1 ? ' bg-stone-500' : ' hover:bg-stone-500 block--dark')}
                >
                    Профиль
                </div>
                <div onClick={() => setActive(2)}
                        className={'block--lighter text-center flex-1 transition-all cursor-pointer'
                            + (isActive === 2 ? ' bg-stone-500' : ' hover:bg-stone-500 block--dark')}
                >
                    Безопасность
                </div>
            </div>
        </div>
    );
};

export default Tabs;
