import React, {FC} from 'react';
import {GiFlowerTwirl, GiHalfHeart, GiMoebiusTrefoil} from "react-icons/gi";
import {FaCalendarAlt} from "react-icons/fa";
import {ISiteProps} from "../../types/types";

const SiteOverviewState: FC<ISiteProps> = ({site}) => {
    return (
        <div className="flex">
            {site.state === 'dropped'
                ? <GiFlowerTwirl/>
                : site.state === 'completed'
                    ? <GiMoebiusTrefoil/>
                    : site.state === 'planned'
                        ? <FaCalendarAlt/>
                        : <GiHalfHeart/>
            }
        </div>
    );
};

export default SiteOverviewState;