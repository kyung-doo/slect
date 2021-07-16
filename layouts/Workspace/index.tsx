import React, { FC, useCallback, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';

import { 
   AddButton,
   Channels, 
   Chats, 
   Header, 
   LogOutButton, 
   MenuScroll, 
   ProfileImg, 
   ProfileModal, 
   RightMenu, 
   WorkspaceButton, 
   WorkspaceName, 
   Workspaces, 
   WorkspaceWrapper 
} from '@layouts/Workspace/styles';

import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';
import Menu from '@components/Menu';
import { IUser, IWorkspace } from '@typings/db';



const Workspace: FC = ({ children }) => {

   const { data: userData, error, revalidate, mutate } = useSWR<IUser>('/api/users', fetcher);
   const [showUserMenu, setShowUserMenu] = useState( false );

   console.log(userData);

   const onLogout = useCallback( async() => {
      try {
         axios.post('/api/users/logout');
         mutate( undefined, false );
      } catch(e){}
   }, []);

   const onClickUserProfile = useCallback(( e ) => {
      setShowUserMenu(( prev ) => !prev );
   }, []);

   const onClickCreateWorkspace = useCallback(( e ) => {

   }, []);

   if(!userData) {
      return <Redirect to="/login" />
   }

   return (
      <div>
         <Header>
            <RightMenu>
               <span onClick={onClickUserProfile}>
                  <ProfileImg 
                     src={gravatar.url(userData?.nickname, {s: '28px', d: 'retro'})} 
                     alt={userData?.nickname} />
                  <Menu show={showUserMenu} 
                     onCloseModal={onClickUserProfile} 
                     style={{ right: 0, top: 38}}>
                     <ProfileModal>
                        <img src={gravatar.url(userData?.nickname, {s: '28px', d: 'retro'})} alt={userData?.nickname} />
                        <div>
                           <span id="profile-name">{userData?.nickname}</span>
                           <span id="profile-active">Active</span>
                        </div>
                     </ProfileModal>
                     <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                  </Menu>
               </span>
            </RightMenu>
         </Header>
         <WorkspaceWrapper>
            <Workspaces>
               {userData.Workspaces?.map((ws: IWorkspace) => {
                  return (
                     <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                        <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                     </Link>
                  )
               })}
               <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
            </Workspaces>
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