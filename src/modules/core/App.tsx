import * as React from 'react';
import { Switch, Route, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';

import { Wrapper, Content, Topbar, SidebarAndContent, Sidebar, SidebarMain, SidebarMainMenu } from '@kata-kit/layout';
import { Robot } from '@kata-kit/loading';

import Logo from './components/Logo';
import Selector from './components/Selector';

import * as sidebar from './sidebar';
import HomeSidebar from '../home/sidebar';

// const HomeModule = React.lazy(() => import('../home'));
// const AboutModule = React.lazy(() => import('../about'));

import HomeModule from '../home';
import AboutModule from '../about';

class App extends React.Component<RouteComponentProps> {
  public render() {
    const currLoc = this.getCurrentLocation();

    return (
      <Wrapper>
        <Topbar logoContent={<Logo />} />
        <SidebarAndContent hasTop>
          <Sidebar hasTop collapsed={this.isSidebarCollapsed()}>
            <SidebarMain hasTop>
              {Object.keys(sidebar.menus).map(menu => (
                <React.Fragment key={menu}>
                  <SidebarMainMenu
                    asNavLink
                    exact={sidebar.menus[menu].isExact}
                    to={sidebar.menus[menu].path}
                    icon={sidebar.menus[menu].icon}
                  >
                    {sidebar.menus[menu].title}
                  </SidebarMainMenu>
                </React.Fragment>
              ))}
            </SidebarMain>
            {!this.isSidebarCollapsed() && (
              <React.Fragment>{currLoc ? this.getSidebarSub(currLoc) : null}</React.Fragment>
            )}
          </Sidebar>
          <Content>
            <React.Suspense fallback={<Robot />}>
              <Switch>
                <Route path="/heroes" component={HomeModule} />
                <Route path="/about" component={AboutModule} />
                <Route render={() => <Redirect to="/heroes" />} />
              </Switch>
            </React.Suspense>
          </Content>
        </SidebarAndContent>
      </Wrapper>
    );
  }

  private isSidebarCollapsed() {
    return this.props.location.pathname.search(/heroes/) === -1;
  }

  private getCurrentLocation() {
    const locations =
      this.props.location && this.props.location.pathname ? this.props.location.pathname.split('/') : [];
    return locations.length > 1 ? locations[1] : undefined;
  }

  private getSidebarSub(location: string) {
    switch (location) {
      case 'heroes': {
        return <HomeSidebar />;
      }
      default: {
        return null;
      }
    }
  }
}

export default withRouter(App);
