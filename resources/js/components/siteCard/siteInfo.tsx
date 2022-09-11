import React, {FC} from 'react';
import {ISiteProps} from "../../types/types";

const SiteInfo: FC<ISiteProps> = ({site}) => {
    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between gap-4">
                <div className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {site.name}
                </div>
                {site.sourceUrl ?
                    <a href={site.sourceUrl}
                       target={"_blank"}
                       className="site__info--source"
                       rel="noreferrer">
                        {site.source}
                    </a> : site.source
                }
            </div>
            <div className={'capitalize'}>
                {site.state}
            </div>
        </div>
    );
};

export default SiteInfo;