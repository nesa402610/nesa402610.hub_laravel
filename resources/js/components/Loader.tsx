import React from 'react';
import {RiLoader3Fill} from "react-icons/ri";

const Loader = () => {
  return (
    <div className={'m-4 flex justify-center items-center'}>
      <h2 className={'text-center font-bold text-xl'}>Загрузка...</h2>
      <RiLoader3Fill size={'2rem'} className={'animate-spin'}/>
    </div>
  );
};

export default Loader;
