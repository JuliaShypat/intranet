import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public languages: Array<string>;
  public logoUrl: string;
  constructor(private translateService: TranslateService, private configService: ConfigService) {}

  ngOnInit() {
    this.setAvaliableLanguages();
    this.setFooterLogo();
  }

  public changeLanguage(code: string): void {
    if (code) {
      this.translateService.use(code);
    }
  }

  public getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public setAvaliableLanguages(): void {
    this.languages = this.configService.getProperty<Array<string>>('LANGUAGES');
  }

  public setFooterLogo(): void {
    this.logoUrl = `assets/img/${this.configService.getProperty<string>('LOGO_INVERTED')}`;
  }
}
