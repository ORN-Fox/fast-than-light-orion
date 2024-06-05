import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { ShedComponent } from './shed.component';

describe('ShedComponent', () => {
  let component: ShedComponent;
  let fixture: ComponentFixture<ShedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedComponent ],
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        SettingsService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
