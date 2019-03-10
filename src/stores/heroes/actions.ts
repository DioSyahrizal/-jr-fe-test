import { action } from 'typesafe-actions';

import { Hero } from '~/interfaces/heroes';
import { DataMap } from '~/interfaces/types';

import { HeroesActionTypes } from './types';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(HeroesActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (heroes: Hero[]) => {
  const data: DataMap<Hero> = {};
  const index = heroes.map(hero => {
    data[hero.name] = {
      ...hero
    };

    return hero.name;
  });

  return action(HeroesActionTypes.FETCH_SUCCESS, { index, data });
};

export const fetchError = (message: string) => action(HeroesActionTypes.FETCH_ERROR, message);

export const selectHero = (hero: Hero) => action(HeroesActionTypes.SELECT_HERO, { hero });

export const selected = () => action(HeroesActionTypes.SELECTED);
