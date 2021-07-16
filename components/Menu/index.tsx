import react, { CSSProperties, FC, useCallback, MouseEvent } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface Props {
   show: boolean,
   onCloseModal: (e: any) => void;
   style: CSSProperties,
   closeButton?: boolean
}


const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton = true }) => {

   if(!show) return null;

   return (
      <CreateMenu onClick={onCloseModal}>
         <div style={style} onClick={(e) => { e.stopPropagation(); }}>
            { closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton> }
            { children }
         </div>
      </CreateMenu>
   );
}

export default Menu;