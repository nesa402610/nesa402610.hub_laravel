import React from 'react';

const CollectionLinks = ({collection}) => {
  return (
    <>
      {collection.links.map((link, index) =>
        <a key={link.link}
           href={link.link}
           target={"_blank"}>Ссылка {index + 1}
        </a>
      )}
    </>
  );
};

export default CollectionLinks;
