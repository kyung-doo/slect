import React, { useCallback } from 'react';
import axios from 'axios';

const Workspace = () => {

   const onLogout = useCallback(() => {
      axios.post
   }, []);

   return (
      <button onClick={onLogout}>로그아웃</button>
   );
}

export default Workspace;