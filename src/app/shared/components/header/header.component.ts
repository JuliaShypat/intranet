import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  public navLinks: Array<string>;
  public logoUrl: string;

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.getNavigationLinks();
    this.getLogoUrl();
  }

  public getNavigationLinks(): void {
    this.navLinks = this.configService.getProperty<Array<string>>('HEADER_NAV');
  }

  public getLogoUrl(): void {
    this.logoUrl = `assets/img/${this.configService.getProperty<string>('LOGO')}`;
  }
}
