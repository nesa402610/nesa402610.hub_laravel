import React, {FC} from "react";

interface InfoBoxProps {
  title: string
  children: React.ReactElement
}

const InfoBox: FC<InfoBoxProps> = ({title, children}) => {
  return (
    <div className={"bg-neutral-700 rounded-lg overflow-hidden"}>
      <div className={"border-b py-2 px-4 bg-neutral-800 border-neutral-600"}>
        <span className={'font-bold text-lg'}>{title}</span>
      </div>
      {children}
    </div>
  );
};

export default InfoBox;
