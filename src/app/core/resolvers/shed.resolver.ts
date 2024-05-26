import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { ResolveFn } from '@angular/router';

import { GameService } from '../services/game/game.service';
import { EMPTY } from 'rxjs';

export const shedResolver: ResolveFn<boolean> = (route, state) => {
  const gameService = inject(GameService);
  const location = inject(Location);

  console.log('resolver', route, state);
  const gameInProgress = gameService.shouldExistGameInProgress();
  console.log('gameInProgress', gameInProgress);
  if (gameInProgress) {
    location.back();
    return EMPTY;
  }
  return true;
};
