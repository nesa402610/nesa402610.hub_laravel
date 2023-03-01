import React, {FC} from 'react';
import { certificates } from '../../cetrificates';

interface certCardProps {
    handler: any
}
const CertCard: FC<certCardProps> = ({handler}) => {
    const previewImage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, img: string) => {
        e.stopPropagation();
        handler(img);
    };
    return (
        <>
            {certificates.map(cert =>
                <div key={cert.name} className={'flex rounded-lg overflow-hidden cursor-pointer'}>
                    <img onClick={e => previewImage(e, cert.img)}
                         src={cert.img}
                         alt={cert.name}/>
                </div>
            )}
        </>
    );
};

export default CertCard;
