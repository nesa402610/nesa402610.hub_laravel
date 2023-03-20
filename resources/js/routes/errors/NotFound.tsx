import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className={'h-screen m-4 flex flex-col justify-center items-center'}>
      <h1 className={'text-4xl font-bold'}>Ты пошел не тем путем...</h1>
      <Link to={'/'} className={'text-lg text-neutral-300 hover:text-sky-300'}>Возвращайся назад!</Link>
    </div>
  );
};

export default NotFound;
