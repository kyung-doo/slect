import React, { FC, useCallback } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect, Route, Switch } from 'react-router';
import gravatar from 'gravatar';

import { 
   Channels, 
   Chats, 
   Header, 
   MenuScroll, 
   ProfileImg, 
   RightMenu, 
   WorkspaceName, 
   Workspaces, 
   WorkspaceWrapper 
} from '@layouts/Workspace/styles';

import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import Menu from '@components/Menu';


const Workspace: FC = ({ children }) => {

   const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);

   const onLogout = useCallback( async() => {
      try {
         axios.post('/api/users/logout');
         mutate( false, false );
      } catch(e){}
   }, []);

   if(!data) {
      return <Redirect to="/login" />
   }

   return (
      <div>
         <Header>
            <RightMenu>
               <span>
                  <ProfileImg src={gravatar.url(data.nickname, {s: '28px', d: 'retro'})} alt={data.nickname} />
                  <Menu show={false} onCloseModal={()=>{}} style={{ right: 0, top: 38}}>메뉴</Menu>
               </span>
            </RightMenu>
         </Header>
         <button onClick={onLogout}>로그아웃</button>
         <WorkspaceWrapper>
            <Workspaces>test</Workspaces>
            <Channels>
               <WorkspaceName>Sleact</WorkspaceName>
               <MenuScroll>
                  {/* <Menu></Menu> */}
               </MenuScroll>
            </Channels>
            <Chats>
               <Switch>
                  <Route path="/workspace/channel" component={Channel} />
                  <Route path="/workspace/dm" component={DirectMessage} />
               </Switch>
            </Chats>
         </WorkspaceWrapper>
      </div>
   );
}

export default Workspace;