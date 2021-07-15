import react, { CSSProperties, FC } from 'react';
import { CreateMenu } from './styles';

interface Props {
   show: boolean,
   onCloseModal: (e: any) => void;
   style: CSSProperties,
   closeButton?: boolean
}


const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {

   if(!show) return null;

   return (
      <CreateMenu>
         { children }
      </CreateMenu>
   );
}

export default Menu;