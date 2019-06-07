import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortalService } from 'src/app/providers/portal.service';
import { Subscription, Observable } from 'rxjs';
import { Video } from 'src/app/interface/portal';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {
  $actualVideoSub: Subscription;
  $actualVideo: Video;


  constructor( public ps: PortalService ) {
    this.ps.getMoreSeen().finally(
      () => {
      });
  }

  ngOnInit() {
    this.$actualVideoSub = this.ps.actualVideo$.subscribe(
      (res: Video) => {
        this.$actualVideo = undefined;
        setTimeout(() => {
          this.$actualVideo = res;
        }, 100);
      }
    );
    this.ps.loadDefaultVideo();
  }

  ngOnDestroy(): void {
    this.$actualVideoSub.unsubscribe();
  }

  emitVideo(_video: Video) {
    this.ps.emitChange(_video);
  }

}
