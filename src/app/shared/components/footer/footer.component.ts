import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  public changeLanguage(code: string): void {
    if (code) {
      this.translateService.use(code);
    }
  }
}
