import { MenuController } from '@ionic/angular';
import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import data from '../../assets/data/feed.json';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  feed = data;
  @ViewChildren('player') videoPlayers: QueryList<any>;
  currentPlaying = null;

  stickyVideo: HTMLVideoElement = null;
  stickyPlaying = false;
  @ViewChild('stickyplayer', { static: false }) stickyPlayer: ElementRef;
 
  constructor(private renderer: Renderer2, private menuCtrl:MenuController) { }

  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }


  didScroll() {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) {
      return;
    } else if (this.currentPlaying && !this.isElementInViewport(this.currentPlaying)) {
      this.currentPlaying.pause();
      this.currentPlaying = null;
    }
    this.videoPlayers.forEach(player => {
      //console.log('player:', player);

      if (this.currentPlaying) {
        return;
      }
      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if(this.stickyVideo && this.stickyVideo.src == nativeElement.src){
        return;
      }

      if (inView) {
        this.currentPlaying = nativeElement;
        this.currentPlaying.muted = true;
        this.currentPlaying.play();
      }
    });

  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();

    } else if (elem.webkitEnterFullscreen) {
      elem.webkitEnterFullscreen();
      elem.enterFullscreen();
    }

  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

  }

  playOnSide(elem) {
    if (this.stickyVideo) {
      this.renderer.removeChild(this.stickyPlayer.nativeElement, this.stickyVideo);
    }
    this.stickyVideo = elem.cloneNode(true);
    this.renderer.appendChild(this.stickyPlayer.nativeElement, this.stickyVideo);

    if (this.currentPlaying) {
      const playPosition = this.currentPlaying.currentTime;
      this.currentPlaying.pause();
      this.currentPlaying = null;
      this.stickyVideo.currentTime = playPosition;
    }
    this.stickyVideo.muted = false;
    this.stickyVideo.play();
    this.stickyPlaying = true;
  }

  closeSticky() {
    if (this.stickyVideo) {
      this.renderer.removeChild(this.stickyPlayer.nativeElement, this.stickyVideo);
      this.stickyVideo = null;
      this.stickyPlaying = false;
    }
  }

  playOrPauseSticky() {
    if (this.stickyPlaying) {
      this.stickyVideo.pause();
      this.stickyPlaying = false;
    } else {
      this.stickyVideo.play();
      this.stickyPlaying = true;
    }
  }
}
