import React, {FC} from "react";
import {GiFlowerTwirl, GiHalfHeart, GiMoebiusTrefoil} from "react-icons/gi";
import {FaCalendarAlt} from "react-icons/fa";
import {IProjectProps} from "types/Project";

const SiteOverviewState: FC<IProjectProps> = ({project}) => {
    const statuses = [
        {name: 'Dropped', component: <GiFlowerTwirl/>},
        {name: 'Completed', component: <GiMoebiusTrefoil/>},
        {name: 'Planned', component: <FaCalendarAlt/>},
        {name: 'In work', component: <GiHalfHeart/>},
    ]
    const status = statuses.find(status => status.name === project.status)
    return (
        <div className="flex">
            {status.component}
        </div>
    );
};

export default SiteOverviewState;
