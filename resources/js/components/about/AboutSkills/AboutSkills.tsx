import React, {FC} from 'react';
import {IoLogoCss3, IoLogoHtml5, IoLogoJavascript, IoLogoLaravel, IoLogoReact} from "react-icons/io5";
import {SiPhp, SiRedux, SiTailwindcss, SiTypescript} from "react-icons/si";
import AboutSkillsGroup from "components/about/AboutSkills/AboutSkillsGroup";

const AboutSkills: FC = () => {
    const nativeSkills = [
        {
            name: 'JavaScript',
            progress: '75%',
            logo: <IoLogoJavascript className={'text-5xl'}/>
        },
        {
            name: 'HTML5',
            progress: '93%',
            logo: <IoLogoHtml5 className={'text-5xl'}/>
        },
        {
            name: 'CSS3',
            progress: '88%',
            logo: <IoLogoCss3 className={'text-5xl'}/>
        },
        {
            name: 'PHP',
            progress: '15%',
            logo: <SiPhp className={'text-5xl'}/>
        }
    ];
    const frameworks = [
        {
            name: 'ReactJS',
            progress: '65%',
            logo: <IoLogoReact className={'text-5xl'}/>
        },
        {
            name: 'Laravel',
            progress: '20%',
            logo: <IoLogoLaravel className={'text-5xl'}/>
        },
        {
            name: 'TailwindCSS',
            progress: '60%',
            logo: <SiTailwindcss className={'text-5xl'}/>
        },
        {
            name: 'Redux (RTK)',
            progress: '50%',
            logo: <SiRedux className={'text-5xl'}/>
        },
        {
            name: 'TypeScript',
            progress: '20%',
            logo: <SiTypescript className={'text-5xl'}/>
        }
    ]
    return (
        <div className={'flex gap-4 flex-col'}>
            <div>
                <h2 className={'text-center font-bold text-2xl'}>Нативные знания</h2>
                <div className={'flex xs:flex-col sm:flex-row gap-4 mt-4 justify-center'}>
                    <AboutSkillsGroup skillsArray={nativeSkills}/>
                </div>
            </div>
            <div>
                <h2 className={'text-center font-bold text-2xl'}>Знания фреймворков</h2>
                <div className={'flex xs:flex-col sm:flex-row gap-4 mt-4 justify-center'}>
                    <AboutSkillsGroup skillsArray={frameworks}/>
                </div>
            </div>
        </div>
    );
};

export default AboutSkills;
