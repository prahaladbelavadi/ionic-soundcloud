import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from './home/home.page';
import { SoundCloudService } from './sound-cloud.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
rootPage: any = HomePage;

constructor(platform: Platform, soundCloud: SoundCloudService) {
  platform.ready().then(() => {
    soundCloud.fetchTracks(120, 'electronic');
  });
}
}
