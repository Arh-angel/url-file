import React, { useEffect, useId, useState } from 'react';

import Button from './common/Btn';
import Input from './common/Input';

import style from './App.module.scss';
import axios from 'axios';
import fileDownload from 'js-file-download';
import ModalWindow from './common/ModalWindow';
const fs = require('fs');

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [erMessage, setErMessage] = useState('');
  const [listNameFile, setListNameFile] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const imgName = `${inputValue.split('/').pop()}`;
  const thereIsList = listNameFile.includes(imgName);

  const id = useId();

  fs.readFile(`${inputValue}`, function (err:any, logData:any) {
    if (err) throw err;
    const img = logData;
    console.log(img);
    return img
  });

  useEffect(() => {
    if (flag) {
      downloadFile(true);
      setFlag(!flag)
    } else {
      downloadFile(false);
    }
  }, [flag]);

  const handlerErMessage = (value:string) => {
    setErMessage(value);
  }

  const handlerModalOpen = () => {
    if(inputValue) {
      setModalOpen(!modalOpen);
    } else {
      setModalOpen(false);
    }
  }

  const handlerFlag = () => {
    setFlag(!flag);
    handlerModalOpen()
  }

  const trackUrl = (value: string) => {
    setInputValue(value);
  }

  const downloadFile = async (flag:boolean) => {
    try{
      if(!thereIsList && inputValue) {
        await axios({
          url: inputValue,
          method: 'GET',
          responseType: 'blob',
          timeout: 10000,
        }).then((response) => {
          if (flag) {
            if (listNameFile.length >= 5 && !thereIsList) {
              const currentList = listNameFile;
              currentList.splice(0, 1);
              setListNameFile([...currentList, imgName]);
            } else if (listNameFile.length <= 5 && !thereIsList) {
              setListNameFile([...listNameFile, imgName]);
            }

            fileDownload(response.data, imgName)
          } else {
            return response.data
          }
        });
      }
    } catch(error){
      console.log(error)
    }
  };

  console.log(listNameFile);

  return (
    <div className={style.app}>
      <Input id="url" placeholder="url" type={'text'} handlerErMessage={handlerErMessage} trackUrl={trackUrl} />
      <Button clName={null} title="Скачать" handler={handlerModalOpen} width="100%" height='48px' background={null} textColor={null} fontSize={null} fontWeight={null} margin={null} borderRadius={null} icon={null} />
      {erMessage ? <span>{erMessage}</span> : ''}

      <div className={style.wrapperList}>
        <ul className={style.list}>
          {listNameFile.map((file) => <li key={id} className={style.item}>{file}</li>)} 
        </ul>
      </div>
      {modalOpen ? <ModalWindow text="Сохранить в загрузки?" titleBtnOne='Да' titleBtnTwo='Нет' handlerBtnOne={handlerFlag} handlerBtnTwo={handlerModalOpen} modalWindowOpen={handlerModalOpen} /> : ''}
    </div>
  );
}

export default App;
