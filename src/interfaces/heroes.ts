import { ApiResponse, DataMap } from './types';

// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface Hero extends ApiResponse {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  legs: number;
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface HeroesState {
  readonly loading: boolean;
  readonly index: string[];
  readonly data: DataMap<Hero>;
  readonly errors?: string | null;
}
