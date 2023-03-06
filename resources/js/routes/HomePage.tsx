import React, {FC} from 'react';
import ProjectSection from "../components/projectSection";
import CertificatesSection from "../components/certificatesSection";

const HomePage: FC = () => {
    return (
        <div className={'flex flex-col my-4'}>
            <ProjectSection/>
            <CertificatesSection/>
        </div>
    );
};

export default HomePage;
