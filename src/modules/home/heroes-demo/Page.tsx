import * as React from 'react';

import { Dashboard } from '@kata-kit/dashboard';
import HeroesListContainer from './HeroesList.Container';

export function HeroesDemoPage() {
  return (
    <Dashboard title="Heroes" tooltip="List of Dota 2 heroes and their attributes.">
      <HeroesListContainer />
    </Dashboard>
  );
}
