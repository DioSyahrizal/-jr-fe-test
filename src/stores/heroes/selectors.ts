import * as Heroes from '~/interfaces/heroes';

export function getHeroesLoading(store: Heroes.HeroesState) {
  return store.loading;
}

export function getHeroesIndex(store: Heroes.HeroesState) {
  return store.index;
}

export function getHeroesData(store: Heroes.HeroesState) {
  return store.data;
}

export function getHeroesErrors(store: Heroes.HeroesState) {
  return store.errors || undefined;
}
