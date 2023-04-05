import React, {FC, useEffect, useState} from "react";

interface Interface {
  setpasskey: any;

  setError(data): any;

  error: any;
}

const Passkey: FC<Interface> = ({setpasskey, error, setError}) => {
  const [passkey, setPasskey] = useState("");

  const triggerHandler = () => {
    setpasskey(passkey);
    localStorage.setItem('passkey', passkey)
    setError(null)
  };

  useEffect(() => {
    if (localStorage.getItem("passkey")) {
      setPasskey(localStorage.getItem("passkey"));
    }
  }, []);
  useEffect(() => {
    if (passkey.length === 18 && !error) triggerHandler();
  }, [passkey]);

  return (
    <div className={"block--dark flex flex-col m-4"}>
      <h2 className={"text-center font-bold text-lg mb-2"}>Для прохода дальше, требуется ввести ключ доступа</h2>
      <div className={"flex gap-4 items-center"}>
        <input type="text"
               value={passkey}
               onChange={e => setPasskey(e.target.value)}
               onKeyUp={e => e.key === "Enter" ? triggerHandler() : ""}
               placeholder={"Ключ доступа..."}
               maxLength={18}/>
        <button onClick={triggerHandler}>Поверить</button>
      </div>
      <span className={"mt-2 text-red-500"}>{error && "Кажется.... Ключ не подошел? А может ошибка сервера?"}</span>
    </div>
  );
};

export default Passkey;
