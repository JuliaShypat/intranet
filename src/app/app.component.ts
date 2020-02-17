import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translateService: TranslateService, configService: ConfigService) {
    const lang = configService.getProperty<string>('DEFAULT_LANGUAGE');
    translateService.setDefaultLang(lang ? lang : 'pl');
    translateService.use(lang ? lang : 'pl');
  }
}
