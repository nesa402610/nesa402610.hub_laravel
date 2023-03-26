import React, {FC, useEffect, useState} from 'react';

interface Interface {
  trigger(passkey): Promise<any>

  error: any
  isLoading: boolean
}

const Passkey: FC<Interface> = ({trigger, error, isLoading}) => {
  const [passkey, setPasskey] = useState('');

  const triggerHandler = () => {
    if (!passkey) return;
    trigger({passkey, type: 'anime'})
      .then(r => {
        localStorage.setItem('passkey', passkey)
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    if (localStorage.getItem('passkey')) {
      setPasskey(localStorage.getItem('passkey'))
    }
  }, [passkey]);

  return (
    <div className={'block--dark flex flex-col m-4'}>
      <h2 className={'text-center font-bold text-lg mb-2'}>Для прохода дальше, требуется ввести ключ доступа</h2>
      <div className={'flex gap-4 items-center'}>
        <input type="text"
               value={passkey}
               onChange={e => setPasskey(e.target.value)}
               onKeyUp={e => e.key === 'Enter' ? triggerHandler() : ''}
               placeholder={'Ключ доступа...'}
               maxLength={18}/>
        <button disabled={isLoading} onClick={triggerHandler}>Поверить</button>
      </div>
      <span className={'mt-2 text-red-500'}>{error && 'Кажется.... Ключ не подошел? А может ошибка сервера?'}</span>
    </div>
  );
};

export default Passkey;
