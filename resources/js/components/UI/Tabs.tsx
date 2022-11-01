import React, {FC} from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";

interface TabsProps {
    titles: string[]
    setTab: any
}

const Tabs: FC<TabsProps> = ({titles, setTab}) => {
    return (
        <>
            <BgCard>
                {titles.map((t, index) =>
                    <FgCard className={'text-center hover:bg-stone-400 transition-colors cursor-pointer'}
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
