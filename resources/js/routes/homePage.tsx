import React, {FC} from 'react';
import ProjectSection from "../components/projectSection";
import CertificatesSection from "../components/certificatesSection";

const HomePage: FC = () => {
    return (
        <>
            <ProjectSection/>
            <CertificatesSection/>
        </>
    );
};

export default HomePage;
