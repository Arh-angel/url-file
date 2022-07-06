import React, { useState } from 'react';

import Button from './common/Btn';
import Input from './common/Input';

import style from './App.module.scss';
import { isNullishCoalesce } from 'typescript';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [erMessage, setErMessage] = useState('');
  const [listNameFile, setListNameFile] = useState([]);

  const handlerErMessage = (value:string) => {
    setErMessage(value);
  }

  const trackUrl = (value: string) => {
    setInputValue(value);
  }

  return (
    <div className={style.app}>
      <Input id="url" placeholder="url" type={'text'} handlerErMessage={handlerErMessage} trackUrl={trackUrl} />
      <Button clName={null} title="Скачать" handler={() => null} width="100%" height='48px' background={null} textColor={null} fontSize={null} fontWeight={null} margin={null} borderRadius={null} icon={null} />
      {erMessage ? <span>erMessage</span> : ''}

      <div className={style.wrapper}>
        <ul className={style.list}>
          {listNameFile.map((file) => <li className={style.item}>file.name</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
