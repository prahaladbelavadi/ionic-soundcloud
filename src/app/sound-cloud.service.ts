import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

interface User {
  permalink_url: string;
  username: string;
}

interface Track {
  id: number;
  title: string;
  artwork_url: string;
  permalink_url: string;
  user: User;
}

declare let SC;

@Injectable({
  providedIn: 'root'
})

export class SoundCloudService {

  private clientId: string = 'YOUR_CLIENT_ID';
  private tracks: any[] = [];
  private playTrack: number = 0;
  public currentTrack;

  constructor(private platform: Platform) {

    this.currentTrack = {
        id: 0,
        title: 'Fetching tracks...',
        permalink_url: '',
        artwork_url: '',
        user: {
            permalink_url: '',
            username: ''
        }
    };

    this.platform.ready().then(() => {
        SC.initialize({
            client_id: this.clientId
        });
    });

}

  fetchTracks(bpm: number, genre: string): void {
    SC.get('/tracks', {

      genres: genre,
      bpm: {
        from: bpm - 5,
        to: bpm + 5
      },
      filter: 'public'

    }).then((tracks) => {

      console.log(tracks);

      this.tracks = tracks;

      console.log("Playing " + tracks.length + " tracks");

      this.startStreaming();

    });

  }

  startStreaming() {
    this.currentTrack = this.tracks[this.playTrack];

    console.log("Playing track " + this.playTrack);
    console.log(this.currentTrack);

    SC.stream('/tracks/' + this.currentTrack.id).then((player) => {

      player.play();

      player.on('buffering_start', () => {
        console.log('buffering...');
      });

      player.on('buffering_end', () => {
        console.log('party!');
      });

      player.on('finish', () => {

        if (this.playTrack < this.tracks.length - 1) {
          this.playTrack++;
        } else {
          this.playTrack = 0;
        }

        console.log('time to move on...');
        this.startStreaming();

      });
    });
  }

}
