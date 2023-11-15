import React, {FC} from 'react';
import AboutSkillsSkill, {IAboutSkill} from "components/about/AboutSkills/AboutSkillsSkill";

interface AboutSkillsGroupProps {
    skillsArray: IAboutSkill[]
}

const AboutSkillsGroup: FC<AboutSkillsGroupProps> = ({skillsArray}) => {
    return (
        <>
            {skillsArray.map(skill =>
                <AboutSkillsSkill skill={skill}/>
            )}
        </>
    );
};

export default AboutSkillsGroup;
