import React, {FC} from 'react';

interface TabsProps {
    titles: string[]
    setTab: any
    tab: number
}

const Tabs: FC<TabsProps> = ({titles, setTab, tab}) => {
    return (
        <>
            <div className={'block--darker'}>
                {titles.map((t, index) =>
                    <div className={(index == tab ? 'bg-stone-500 ' : '') + 'block--lighter text-center hover:bg-stone-500 transition-colors cursor-pointer'}
                            onClick={() => setTab(index)}
                    >
                        {t}
                    </div>
                )}
            </div>
        </>
    );
};

export default Tabs;
