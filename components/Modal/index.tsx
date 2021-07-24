import React, { FC, MouseEvent, useCallback } from 'react';
import {
   CreateModal,
   CloseModalButton
} from './styles';


interface Props {
   show: boolean;
   onCloseModal: (e: any) => void;
}


const Modal: FC<Props> = ({ children, show, onCloseModal}) => {

   const stopPropagation = useCallback((e: MouseEvent) => {
      e.stopPropagation();
   }, []);

   if(!show) {
      return null;
   }
   
   return (
      <CreateModal onClick={onCloseModal}>
         <div onClick={stopPropagation}>
            <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
            { children }
         </div>
      </CreateModal>      
   );
}

export default Modal;
