import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { ResolveFn } from '@angular/router';
import { EMPTY } from 'rxjs';

import { GameService } from '../services/game/game.service';

export const shedResolver: ResolveFn<boolean> = () => {
  const gameService = inject(GameService);
  const location = inject(Location);

  const gameInProgress = gameService.shouldExistGameInProgress();
  if (gameInProgress) {
    location.back();
    return EMPTY;
  }
  return true;
};
