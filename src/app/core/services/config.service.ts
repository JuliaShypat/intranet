import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private loaded = false;
  private configuration: any;

  constructor(private http: HttpClient) {}

  getProperty<T>(name: string): T {
    return this.configuration[name];
  }

  public load(): Promise<any> {
    if (this.loaded) {
      return of(this, this.configuration).toPromise();
    } else {
      const configurationObservable = this.http.get(`environments/app-config.json`);
      configurationObservable.subscribe(
        config => {
          this.configuration = config;
          this.loaded = true;
        },
        error => console.error(`error loading configuration: ${JSON.stringify(error)}`)
      );
      return configurationObservable.toPromise();
    }
  }
}
