import React, {FC} from 'react';

interface TabsProps {
    titles: string[]
    setTab: any
    tab: number
}

const Tabs: FC<TabsProps> = ({titles, setTab, tab}) => {
    return (
        <>
            <div className={'block--dark flex gap-4'}>
                {titles.map((t, index) =>
                    <div key={index}
                         className={(index == tab ? 'block--lighter ' : 'block--light ') + 'flex-1 text-center hover:bg-neutral-600 transition-colors cursor-pointer'}
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
