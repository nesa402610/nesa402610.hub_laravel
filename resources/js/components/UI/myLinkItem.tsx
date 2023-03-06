import React, {FC} from 'react';

interface LinkItemProps {
    url: string,
    ico: any,
    name: string
}

interface LinkProps {
    link: LinkItemProps
}

const MyLinkItem: FC<LinkProps> = ({link}) => {
    return (
        <a className={'flex text-2xl hover:text-neutral-400 transition-all hover:scale-125'}
              href={link.url}
              target={"_blank"}
              rel="noreferrer">
            {link.ico}
        </a>
    );
};

export default MyLinkItem;
