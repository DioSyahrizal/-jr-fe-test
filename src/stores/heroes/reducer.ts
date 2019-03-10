import { Reducer, combineReducers } from 'redux';

import { HeroesState } from '~/interfaces/heroes';

import { HeroesActionTypes } from './types';

// Type-safe initialState!
const initialState: HeroesState = {
  index: [],
  data: {},
  errors: null,
  loading: false,
  selected: null
};

const index: Reducer<HeroesState['index']> = (state = initialState.index, { type, payload }) => {
  switch (type) {
    case HeroesActionTypes.FETCH_SUCCESS: {
      return [...payload.index];
    }
    case HeroesActionTypes.FETCH_ERROR: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const data: Reducer<HeroesState['data']> = (state = initialState.data, { type, payload }) => {
  switch (type) {
    case HeroesActionTypes.FETCH_SUCCESS: {
      return Object.assign({}, payload.data);
    }
    default: {
      return state;
    }
  }
};

const errors: Reducer<HeroesState['errors']> = (state = initialState.errors, { type, payload }) => {
  switch (type) {
    case HeroesActionTypes.FETCH_ERROR: {
      return payload.error;
    }
    default: {
      return state;
    }
  }
};

const loading: Reducer<HeroesState['loading']> = (state = initialState.loading, { type, payload }) => {
  switch (type) {
    case HeroesActionTypes.FETCH_REQUEST: {
      return true;
    }
    case HeroesActionTypes.FETCH_SUCCESS:
    case HeroesActionTypes.FETCH_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const selected: Reducer<HeroesState['selected']> = (state = initialState.selected, { type, payload }) => {
  switch (type) {
    case HeroesActionTypes.SELECT_HERO: {
      return Object.assign({}, payload.hero);
    }
    case HeroesActionTypes.SELECTED: {
      return state;
    }
    default: {
      return state;
    }
  }
};

const heroesReducer = combineReducers<HeroesState>({
  index,
  data,
  errors,
  loading,
  selected
});

export { heroesReducer };
