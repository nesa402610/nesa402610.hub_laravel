import React, {FC} from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";

interface TabsProps {
    titles: string[]
    setTab: any
    tab: number
}

const Tabs: FC<TabsProps> = ({titles, setTab, tab}) => {
    return (
        <>
            <BgCard>
                {titles.map((t, index) =>
                    <FgCard className={(index == tab ? 'bg-stone-500 ' : '') + 'text-center hover:bg-stone-500 transition-colors cursor-pointer'}
                            onClick={() => setTab(index)}
                    >
                        {t}
                    </FgCard>
                )}
            </BgCard>
        </>
    );
};

export default Tabs;
