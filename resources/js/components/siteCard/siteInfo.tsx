import React, {FC} from 'react';
import {ISiteProps} from "../../types/types";

const SiteInfo: FC<ISiteProps> = ({project}) => {
    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between gap-4">
                <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {project.name}
                </div>
                {project.sourceURL ?
                    <a href={project.sourceURL}
                       target={"_blank"}
                       className="site__info--source"
                       rel="noreferrer">
                        {project.source}
                    </a> : project.source
                }
            </div>
            <div className={'capitalize'}>
                {project.status}
            </div>
        </div>
    );
};

export default SiteInfo;
