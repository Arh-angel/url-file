import React, { ChangeEvent, useEffect, useState } from 'react';

import style from './Input.module.scss';

type InputPropsType = {
  id: string;
  placeholder: string | null;
  type: 'text' | 'password' | 'tel' | 'file';
  handlerErMessage: (value:string) => void | null;
  trackUrl: (value:string) => void | null;
};

const Input = ({
  id, placeholder, type = 'text', handlerErMessage, trackUrl }: InputPropsType) => {
  const [currentValue, setCurrentValue] = useState('');
  const [valid, setValid] = useState(true);
  const [erMessage, setErMessage] = useState('');

  const regUrl = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  useEffect(() => {
    if (currentValue.length > 1 && valid) {
      if (id === 'url') {
        trackUrl(currentValue);
      }
    } else if (currentValue.length === 0 || !valid) {
      if (id === 'url') {
        trackUrl('');
      }
    }
  }, [currentValue, valid]);

  useEffect(() => {
    handlerErMessage(erMessage);
  }, [currentValue, valid]);

  useEffect(() => {
    if (currentValue.length > 0) {
      if (id === 'url' && !currentValue.match(regUrl)) {
        setValid(false);
        setErMessage('Некорректный формат url адреса');
      }
    } else {
      setValid(true);
      setErMessage('');
    }
  }, [currentValue]);

  return (
    <label className={style.wrapper} htmlFor={id}>
      <input id={id} onChange={handler} type={type} className={!valid ? style.notValid : ''} />
      <span>{placeholder}</span>
    </label>
  );
};

export default Input;
