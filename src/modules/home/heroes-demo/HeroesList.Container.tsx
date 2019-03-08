import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootStore } from '~/interfaces/stores';
import { Hero } from '~/interfaces/heroes';
import { getHeroesLoading, getHeroesErrors, getHeroesData, getHeroesIndex } from '~/stores/heroes/selectors';
import { fetchRequest } from '~/stores/heroes/actions';
import { DataMap } from '~/interfaces/types';

import HeroesList from './HeroesList';

interface PropsFromState {
  loading: string;
  errors?: string;
  index: string[];
  data: DataMap<Hero>;
}

interface PropsFromDispatch {
  fetch: typeof fetchRequest;
}

type Props = PropsFromState & PropsFromDispatch;

const HeroesListContainer: React.FC<Props> = ({ loading, index, data, fetch }) => (
  <HeroesList loading={loading} index={index} data={data} fetchRequest={fetch} />
);

const mapStateToProps = ({ heroes }: RootStore) => {
  return {
    loading: getHeroesLoading(heroes),
    errors: getHeroesErrors(heroes),
    index: getHeroesIndex(heroes),
    data: getHeroesData(heroes)
  };
};

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetch: () => dispatch(fetchRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroesListContainer);
