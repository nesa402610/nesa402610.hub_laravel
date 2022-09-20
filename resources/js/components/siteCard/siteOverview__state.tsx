import React, {FC} from 'react';
import {GiFlowerTwirl, GiHalfHeart, GiMoebiusTrefoil} from "react-icons/gi";
import {FaCalendarAlt} from "react-icons/fa";
import {ISiteProps} from "../../types/types";

const SiteOverviewState: FC<ISiteProps> = ({project}) => {
    return (
        <div className="flex">
            {project.status === 'dropped'
                ? <GiFlowerTwirl/>
                : project.status === 'completed'
                    ? <GiMoebiusTrefoil/>
                    : project.status === 'planned'
                        ? <FaCalendarAlt/>
                        : <GiHalfHeart/>
            }
        </div>
    );
};

export default SiteOverviewState;
