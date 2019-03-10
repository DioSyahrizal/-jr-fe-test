import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootStore } from '~/interfaces/stores';
import { Hero } from '~/interfaces/heroes';
import {
  getHeroesLoading,
  getHeroesErrors,
  getHeroesData,
  getHeroesIndex,
  getSelected
} from '~/stores/heroes/selectors';

import { fetchRequest, selectHero } from '~/stores/heroes/actions';
import { DataMap } from '~/interfaces/types';

import HeroesList from './HeroesList';

interface PropsFromState {
  loading?: boolean;
  errors?: string;
  index: string[];
  data: DataMap<Hero>;
  selected?: Hero;
}

interface PropsFromDispatch {
  fetch: typeof fetchRequest;
  select: typeof selectHero;
}

type Props = PropsFromState & PropsFromDispatch;

const HeroesListContainer: React.FC<Props> = ({ loading, index, data, fetch, select, selected }) => (
  <HeroesList
    loading={loading}
    index={index}
    data={data}
    fetchRequest={fetch}
    selectHero={select}
    selected={selected}
  />
);

const mapStateToProps = ({ heroes }: RootStore) => {
  return {
    loading: getHeroesLoading(heroes),
    errors: getHeroesErrors(heroes),
    index: getHeroesIndex(heroes),
    data: getHeroesData(heroes),
    selected: getSelected(heroes)
  };
};

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetch: () => dispatch(fetchRequest()),
  select: (hero: Hero) => dispatch(selectHero(hero))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroesListContainer);
