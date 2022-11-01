import React, {FC} from 'react';
import {IoLogoCss3, IoLogoHtml5, IoLogoJavascript, IoLogoLaravel, IoLogoReact} from "react-icons/io5";
import {SiPhp, SiRedux, SiTailwindcss, SiTypescript} from "react-icons/si";
import FgCard from "../fgCard";

const AboutSkills: FC = () => {
    const nativeSkills = [
        {
            name: 'JavaScript',
            progress: 'w-[75%]',
            logo: <IoLogoJavascript className={'text-5xl'}/>
        },
        {
            name: 'HTML5',
            progress: 'w-[93%]',
            logo: <IoLogoHtml5 className={'text-5xl'}/>
        },
        {
            name: 'CSS3',
            progress: 'w-[88%]',
            logo: <IoLogoCss3 className={'text-5xl'}/>
        },
        {
            name: 'PHP',
            progress: 'w-[30%]',
            logo: <SiPhp className={'text-5xl'}/>
        }
    ];
    const frameworks = [
        {
            name: 'ReactJS',
            progress: 'w-[85%]',
            logo: <IoLogoReact className={'text-5xl'}/>
        },
        {
            name: 'Laravel',
            progress: 'w-[20%]',
            logo: <IoLogoLaravel className={'text-5xl'}/>
        },
        {
            name: 'TailwindCSS',
            progress: 'w-[60%]',
            logo: <SiTailwindcss className={'text-5xl'}/>
        },
        {
            name: 'Redux (RTK)',
            progress: 'w-[70%]',
            logo: <SiRedux className={'text-5xl'}/>
        },
        {
            name: 'TypeScript',
            progress: 'w-[30%]',
            logo: <SiTypescript className={'text-5xl'}/>
        }
    ]
    return (
        <div className={'flex gap-4'}>
            <FgCard>
                <h2 className={'text-center font-bold text-2xl'}>Нативные знания</h2>
                <div className={'flex gap-4 mt-4 justify-center'}>
                    {nativeSkills.map(skill =>
                        <div className={'flex flex-col items-center flex-1'}>
                            {skill.logo}
                            <span className={'font-bold'}>{skill.name}</span>
                            <div className={'w-full bg-zinc-400 min-h-[8px] rounded-full overflow-hidden'}>
                                <div className={`bg-rose-400 h-full ${skill.progress}`}/>
                            </div>
                            {skill.progress.substring(3, 6)}
                        </div>
                    )}
                </div>
            </FgCard>
            <FgCard>
                <h2 className={'text-center font-bold text-2xl'}>Знания фреймворков</h2>
                <div className={'flex gap-4 mt-4 justify-center'}>
                    {frameworks.map(skill =>
                        <div className={'flex flex-col items-center flex-1'}>
                            {skill.logo}
                            <span className={'font-bold'}>{skill.name}</span>
                            <div className={'w-full bg-zinc-400 min-h-[8px] rounded-full overflow-hidden'}>
                                <div className={`bg-rose-400 h-full ${skill.progress}`}/>
                            </div>
                            {skill.progress.substring(3, 6)}
                        </div>
                    )}
                </div>
            </FgCard>
        </div>
    );
};

export default AboutSkills;
