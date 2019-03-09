import { RouterState } from 'connected-react-router';
import { HeroesState } from './heroes';

export interface RootStore {
  router: RouterState;
  heroes: HeroesState;
}
