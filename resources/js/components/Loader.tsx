import React, {FC} from "react";
import {RiLoader3Fill} from "react-icons/ri";

interface LoaderProps {
  text?: string
}

const Loader: FC<LoaderProps> = ({text = 'Загрузка'}) => {
  return (
    <div className={'m-4 flex justify-center items-center'}>
      <h2 className={'text-center font-bold text-xl'}>{text}...</h2>
      <RiLoader3Fill size={'2rem'} className={'animate-spin'}/>
    </div>
  );
};

export default Loader;
