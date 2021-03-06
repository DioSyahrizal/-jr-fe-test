import * as React from 'react';

import { Avatar } from '@kata-kit/avatar';
import { Button } from '@kata-kit/button';
import { DashboardCards } from '@kata-kit/dashboard';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@kata-kit/drawer';
import { Card, CardButton } from '@kata-kit/card';

import { DataMap } from '~/interfaces/types';
import { Hero } from '~/interfaces/heroes';
import { Skeleton } from '~/components/Skeleton';
import { fetchRequest, selectHero } from '~/stores/heroes/actions';
import { CardInfo, CardInfoKey, CardInfoValue } from '../components/CardInfo';

interface HeroesListProps {
  loading?: boolean;
  index: string[];
  data: DataMap<Hero>;
  fetchRequest: typeof fetchRequest;
  selectHero: typeof selectHero;
  selected?: Hero;
}

interface HomeFirstPageState {
  open: boolean;
}

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com';

class HeroesList extends React.Component<HeroesListProps, HomeFirstPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.props.fetchRequest();
  }

  toggleDrawer() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  renderInner() {
    return (
      <>
        <DrawerHeader title="Drawer Title" />
        <DrawerBody>
          {this.props.selected ? (
            <div>
              <div style={styles.container}>
                <img src={API_ENDPOINT + this.props.selected.img} style={styles.image} />
                <h1 style={styles.name}>{this.props.selected.localized_name}</h1>
              </div>
              <img src={API_ENDPOINT + this.props.selected.icon} alt="" />
              <p>
                <b>Type: </b>
                {this.props.selected.attack_type}
              </p>
              <p>
                <b>Roles: </b>
                {this.props.selected.roles.join(', ')}
              </p>
              <CardInfo>
                <CardInfoKey>Primary Attr</CardInfoKey>
                <CardInfoValue>{this.props.selected.primary_attr}</CardInfoValue>
              </CardInfo>
              <CardInfo>
                <CardInfoKey>Legs</CardInfoKey>
                <CardInfoValue>{this.props.selected.legs}</CardInfoValue>
              </CardInfo>
            </div>
          ) : (
            'null'
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button color="primary" onClick={() => this.toggleDrawer()}>
            Close drawer
          </Button>
        </DrawerFooter>
      </>
    );
  }

  public render() {
    const { open } = this.state;

    return (
      <React.Fragment>
        <DashboardCards>
          {this.props.loading
            ? this.renderLoading()
            : this.props.index && this.props.index.length
            ? this.renderData()
            : null}
        </DashboardCards>

        <Drawer isOpen={open} onClose={() => this.toggleDrawer()}>
          {this.renderInner()}
        </Drawer>
      </React.Fragment>
    );
  }

  private renderLoading() {
    return [...Array(3)].map((_, i) => (
      <Card key={i} title={<Skeleton /> as any}>
        <Skeleton numberOfLines={3} />
      </Card>
    ));
  }

  private renderData() {
    return this.props.index.map(name => {
      const hero = this.props.data[name];

      return (
        <Card
          key={hero.id}
          title={hero.localized_name}
          avatarComponent={<Avatar src={API_ENDPOINT + hero.img} size={40} />}
          onClick={() => {
            this.toggleDrawer();
            this.props.selectHero(hero);
          }}
        >
          <div className="mb-2">
            {hero.attack_type} - <span>{hero.roles.join(', ')}</span>
          </div>
          <CardInfo>
            <CardInfoKey>Primary Attr</CardInfoKey>
            <CardInfoValue>{hero.primary_attr}</CardInfoValue>
          </CardInfo>
          <CardInfo>
            <CardInfoKey>Legs</CardInfoKey>
            <CardInfoValue>{hero.legs}</CardInfoValue>
          </CardInfo>
        </Card>
      );
    });
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  } as React.CSSProperties,

  name: {
    marginBottom: '40px'
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 50
  }
};

export default HeroesList;
