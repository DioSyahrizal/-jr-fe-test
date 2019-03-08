import * as React from 'react';

import { Avatar } from '@kata-kit/avatar';
import { Button } from '@kata-kit/button';
import { DashboardCards } from '@kata-kit/dashboard';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@kata-kit/drawer';
import { Card, CardButton } from '@kata-kit/card';

import { DataMap } from '~/interfaces/types';
import { Hero } from '~/interfaces/heroes';
import { Skeleton } from '~/components/Skeleton';
import { fetchRequest } from '~/stores/heroes/actions';
import { CardInfo, CardInfoKey, CardInfoValue } from '../components/CardInfo';

interface HeroesListProps {
  loading?: boolean;
  index: string[];
  data: DataMap<Hero>;
  fetchRequest: typeof fetchRequest;
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
          <p>
            Congratulations! You have opened this drawer.{' '}
            <a href="https://www.youtube.com/watch?v=ctSYCoMF4z4" target="_blank" rel="noopener noreferrer">
              Have some music.
            </a>
          </p>

          <p>
            <a href="https://www.youtube.com/watch?v=mUGDxyG1kOI" target="_blank" rel="noopener noreferrer">
              Lorem ipsum dolor sit amet
            </a>
            , consectetur adipiscing elit. Aliter enim nosmet ipsos nosse non possumus. Quae ista amicitia est? Duo
            Reges: constructio interrete. An hoc usque quaque, aliter in vita? Primum quid tu dicis breve? Cum ageremus,
            inquit, vitae beatum et eundem supremum diem, scribebamus haec. Sed finge non solum callidum eum, qui
            aliquid improbe faciat, verum etiam praepotentem, ut M. <i>Tibi hoc incredibile, quod beatissimum.</i>{' '}
          </p>

          <p>
            Quis animo aequo videt eum, quem inpure ac flagitiose putet vivere? Etsi ea quidem, quae adhuc dixisti,
            quamvis ad aetatem recte isto modo dicerentur. Non minor, inquit, voluptas percipitur ex vilissimis rebus
            quam ex pretiosissimis. Illa tamen simplicia, vestra versuta. Si qua in iis corrigere voluit, deteriora
            fecit. Stuprata per vim Lucretia a regis filio testata civis se ipsa interemit.{' '}
          </p>

          <p>
            Huic ego, si negaret quicquam interesse ad beate vivendum quali uteretur victu, concederem, laudarem etiam;
            Est enim effectrix multarum et magnarum voluptatum. At miser, si in flagitiosa et vitiosa vita afflueret
            voluptatibus. At iste non dolendi status non vocatur voluptas. Nunc ita separantur, ut disiuncta sint, quo
            nihil potest esse perversius. <i>Hic nihil fuit, quod quaereremus.</i> <b>Frater et T.</b> Ergo id est
            convenienter naturae vivere, a natura discedere. Si quae forte-possumus.{' '}
          </p>
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

export default HeroesList;
