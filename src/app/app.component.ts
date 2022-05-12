import { Component, OnInit, OnDestroy } from '@angular/core';

import { Logger } from './core/services/logger/logger.service';
import { I18nService } from './core/services/translations/i18n.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fast-than-light-orion';

  constructor(private i18nService: I18nService)
  {}

  ngOnInit() {
    log.debug('init');

    // Setup translations
    this.i18nService.init();
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
