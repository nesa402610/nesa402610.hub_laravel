import React, {FC, useState} from 'react';
import Tabs from "../components/UI/Tabs";
import AboutStudy from "../components/about/AboutStudy";
import AboutSkills from "../components/about/AboutSkills/AboutSkills";
import AboutProjects from "components/about/AboutProjects";
import AboutDocuments from "components/about/AboutDocuments";


const AboutPage: FC = () => {
    const tabs = ['Навыки', 'Образование', 'Проекты', 'Сертификаты и дипломы']
    const [tab, setTab] = useState(0);
    return (
        <div className={'px-4 flex flex-col gap-4'}>
            <Tabs titles={tabs} tab={tab} setTab={setTab}/>
            {tab === 0 && <AboutSkills/>}
            {tab === 1 && <AboutStudy/>}
            {tab === 2 && <AboutProjects/>}
            {tab === 3 && <AboutDocuments/>}
        </div>
    );
};

export default AboutPage;
