import React from 'react';
import Button from '../Btn';

import style from './ModalWindow.module.scss';

type ModalWindowPropsType = {
  text: string,
  titleBtnOne: string,
  titleBtnTwo: string,
  handlerBtnOne: () => void,
  handlerBtnTwo: () => void,
  modalWindowOpen: () => void
}

const ModalWindow = (props: ModalWindowPropsType) => {
  const { text, titleBtnOne, titleBtnTwo, handlerBtnOne, handlerBtnTwo, modalWindowOpen } = props;

  return (
    <div role="presentation" className={style.modalWindow} onClick={modalWindowOpen}>
      <div
        role="presentation"
        className={style.container}
        onClick={(e) => e.stopPropagation()}>
        <h3 className={style.text}>{text}</h3>
        <div className={style.wrapperBtn}>
          <Button clName={null} title={titleBtnOne} handler={handlerBtnOne} width={null} height={null} background={null} textColor={null} fontSize={null} fontWeight={null} margin={null} borderRadius={null} icon={null} />
          <Button clName={null} title={titleBtnTwo} handler={handlerBtnTwo} width={null} height={null} background={null} textColor={null} fontSize={null} fontWeight={null} margin={null} borderRadius={null} icon={null} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
