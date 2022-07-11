import React, { useEffect, useId, useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import Button from './common/Btn';
import Input from './common/Input';

import style from './App.module.scss';
import axios from 'axios';
import fileDownload from 'js-file-download';
import ModalWindow from './common/ModalWindow';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [erMessage, setErMessage] = useState('');
  const [listNameFile, setListNameFile] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  //================================== antd
  const [fileList, setFileList] = useState<any[]>([]);

  const onChange = ({ fileList: newFileList }:{fileList:any}) => {
    setFileList(newFileList);
  };

  const onPreview = async (file:any) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  //==============================================

  const imgName = `${inputValue.split('/').pop()}`;
  const thereIsList = listNameFile.includes(imgName);

  const id = useId();

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
    if(inputValue && !thereIsList) {
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

  return (
    <div className={style.app}>
      <Input id="url" placeholder="url" type={'text'} handlerErMessage={handlerErMessage} trackUrl={trackUrl} />
      <Button clName={null} title="Скачать" handler={handlerModalOpen} width="100%" height='48px' background={null} textColor={null} fontSize={null} fontWeight={null} margin={null} borderRadius={null} icon={null} />
      {erMessage ? <span>{erMessage}</span> : ''}

      <div className={style.wrapperList}>
        <ul className={style.list}>
            {listNameFile.map((file) => <li key={id} className={style.item}>{file}</li>)}
        </ul>
        {listNameFile.length > 0 ? <ImgCrop rotate>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Open image'}
          </Upload>
        </ImgCrop> : ''}
      </div>
      {modalOpen ? <ModalWindow text="Сохранить в загрузки?" titleBtnOne='Да' titleBtnTwo='Нет' handlerBtnOne={handlerFlag} handlerBtnTwo={handlerModalOpen} modalWindowOpen={handlerModalOpen} /> : ''}
    </div>
  );
}

export default App;
