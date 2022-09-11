import React, {FC} from 'react';
import ProjectSection from "../projectSection";
import CertificatesSection from "../certificatesSection";

const HomePage: FC = () => {
    return (
        <>
            <ProjectSection/>
            <CertificatesSection/>
        </>
    );
};

export default HomePage;