import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

declare var $: any; // jQuery kullanacağımız için jQuery'nin TypeScript tanımını ekliyoruz

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // StickyNavigation sınıfını oluşturma
    new StickyNavigation(this.elementRef.nativeElement, this.storageService, this.router);
  }

  login() {
    // Burada login işlevselliği tanımlanabilir
  }

  logout() {
    this.storageService.removeFromLocalStorage("jwt");
    this.router.navigate(['auth']);
  }

  visitHotels() {
    this.router.navigate(['products/hotels']);
  }

  visitRental() {
    this.router.navigate(['products/rental']);
  }

  visitFlights() {
    this.router.navigate(['products/flights']);
  }

  visitHome() {
    this.router.navigate(['products/home']);
  }

  visitDiscover() {
    this.router.navigate(['products/discover']);
  }

  visitProfile() {
    this.router.navigate(['products/profile']);
  }

}

class StickyNavigation {
  
  private currentId: string | null;
  private currentTab: any; // Değişken tipini buraya göre belirlemeniz gerekebilir
  private tabContainerHeight = 70;

  constructor(
    private nativeElement: any,
    private storageService: StorageService,
    private router: Router
  ) {
    this.currentId = null;
    this.currentTab = null;

    $(this.nativeElement).find('.et-hero-tab').click((event: any) => {
      this.onTabClick(event, $(event.target));
    });

    $(window).scroll(() => { this.onScroll(); });
    $(window).resize(() => { this.onResize(); });
  }

  onTabClick(event: any, element: any) {
    event.preventDefault();
    let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    $('html, body').animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    if(this.currentId) {
      this.setSliderCss();
    }
  }

  checkTabContainerPosition() {
    let offset = $(this.nativeElement).find('.et-hero-tabs').offset().top + $(this.nativeElement).find('.et-hero-tabs').height() - this.tabContainerHeight;
    if($(window).scrollTop() > offset) {
      $(this.nativeElement).find('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
    } 
    else {
      $(this.nativeElement).find('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
    }
  }

  findCurrentTabSelector() {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(this.nativeElement).find('.et-hero-tab').each(function() {
      let id = $(this).attr('href');
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if(this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if(this.currentTab) {
      width = this.currentTab.css('width');
      left = this.currentTab.offset().left;
    }
    $(this.nativeElement).find('.et-hero-tab-slider').css('width', width);
    $(this.nativeElement).find('.et-hero-tab-slider').css('left', left);
  }
}
