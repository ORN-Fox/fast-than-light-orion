import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../core/services/game/game.service';
import { I18nService } from '../../core/services/translations/i18n.service';

import { Settings } from '../../core/models/settings/settings.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  settings: Settings;
  languages: string[];

  gameInProgress: boolean;

  constructor(
    private router: Router,
    private gameService: GameService,
    private i18nService: I18nService
  ) {
    this.settings = new Settings(); // TODO store settings in local storage
    this.languages = this.i18nService.supportedLanguages;
  }

  ngOnInit(): void {
    this.gameInProgress = this.gameService.shouldExistGameInProgress();

    const modals = document.querySelectorAll("[data-modal]");

    modals.forEach(function (trigger: any) {
      trigger.addEventListener("click", function (event: any) {
        event.preventDefault();
        const modal = document.getElementById(trigger.dataset.modal) as HTMLElement;
        modal.classList.add("open");
        const exits = modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
          exit.addEventListener("click", function (event) {
            event.preventDefault();
            modal.classList.remove("open");
          });
        });
      });
    });
  }

  continueGame() {
    this.router.navigate(['/game']);
  }

  newGame() {
    this.router.navigate(['/shed']);
  }

  // Options related

  toggleFullScren()
  {
    this.settings.fullScreenMode = !this.settings.fullScreenMode;

    let element = document.querySelector('body') as any;
    console.log(element, element.requestFullscreen)

    if (this.settings.fullScreenMode)
    {
      this.openFullscreen(element);
    }
    else
    {
      this.closeFullscreen();
    }
  }

  changeLanguage(language: string)
  {
    this.i18nService.language = language;
  }

  private openFullscreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  private closeFullscreen() {
    let documentElement: any = document;

    if (documentElement.exitFullscreen) {
      documentElement.exitFullscreen();
    } else if (documentElement.webkitExitFullscreen) { /* Safari */
      documentElement.webkitExitFullscreen();
    } else if (documentElement.msExitFullscreen) { /* IE11 */
      documentElement.msExitFullscreen();
    }
  }

}
