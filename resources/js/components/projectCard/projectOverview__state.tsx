import React, {FC} from 'react';
import {GiFlowerTwirl, GiHalfHeart, GiMoebiusTrefoil} from "react-icons/gi";
import {FaCalendarAlt} from "react-icons/fa";
import {IProjectProps} from "../../types/types";

const SiteOverviewState: FC<IProjectProps> = ({project}) => {
    return (
        <div className="flex">
            {project.status === 'Dropped'
                ? <GiFlowerTwirl/>
                : project.status === 'Completed'
                    ? <GiMoebiusTrefoil/>
                    : project.status === 'Planned'
                        ? <FaCalendarAlt/>
                        : <GiHalfHeart/>
            }
        </div>
    );
};

export default SiteOverviewState;
