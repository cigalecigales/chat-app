import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Global } from '@emotion/core';

import global from './styles/global';
import ChatListPage from './pages/chat-list-page';
import ChatRoomPage from './pages/chat-room-page';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Global styles={global} />
    <Switch>
      <Route exact path="/" component={ChatListPage} />
      <Route exact path="/room" component={ChatRoomPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
