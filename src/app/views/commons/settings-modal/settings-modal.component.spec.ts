import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { SoundsManagerService } from 'src/app/core/services/sounds-manager/sounds-manager.service';

import { SettingsModalComponent } from './settings-modal.component';

describe('SettingsModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsModalComponent ],
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        SettingsService,
        SoundsManagerService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
