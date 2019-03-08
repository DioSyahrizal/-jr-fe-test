import * as React from 'react';
import { SidebarSub, SidebarSubMenu } from '@kata-kit/layout';
import SidebarSubTitle from '../core/components/SidebarSubTitle';
import { withRouter, RouteComponentProps } from 'react-router';

const HomeSidebar: React.SFC<RouteComponentProps> = ({ match }) => (
  <SidebarSub titleElement={<SidebarSubTitle>Sidebar</SidebarSubTitle>}>
    <SidebarSubMenu asNavLink exact to={`/heroes/`} icon="bot">
      Heroes
    </SidebarSubMenu>
    <SidebarSubMenu asNavLink to={`/heroes/dummy`} icon="nlu">
      Second Page
    </SidebarSubMenu>
  </SidebarSub>
);

export default withRouter(HomeSidebar);
