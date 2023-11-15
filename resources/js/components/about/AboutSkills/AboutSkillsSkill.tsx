import React, {FC} from 'react';

export interface AboutSkillsSkillProps {
    skill: IAboutSkill
}

export interface IAboutSkill {
    name: string
    progress: string
    logo: React.ReactNode
}

const AboutSkillsSkill: FC<AboutSkillsSkillProps> = ({skill}) => {
    return (
        <div key={skill.name} className={'flex block--light flex-col items-center flex-1'}>
            {skill.logo}
            <span className={'font-bold'}>{skill.name}</span>
            <div className={'w-full bg-zinc-400 h-[8px] rounded-full overflow-hidden'}>
                <div className={`bg-rose-400 h-full`} style={{width: skill.progress}}/>
            </div>
            {skill.progress}
        </div>
    );
};

export default AboutSkillsSkill;
