import React, {FC, useState} from 'react';
import Tabs from "../components/UI/Tabs";
import AboutStudy from "../components/about/AboutStudy";
import AboutSkills from "../components/about/AboutSkills/AboutSkills";

const AboutPage: FC = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className={'px-4 flex flex-col gap-4'}>
            <Tabs titles={['Навыки', 'Образование',]} tab={tab} setTab={setTab}/>
            <div className={'block--dark sm:flex-col'}>
                {tab === 0 && <AboutSkills/>}
                {tab === 1 && <AboutStudy/>}
            </div>
        </div>
    );
};

export default AboutPage;
