import { AfterViewInit, Component } from '@angular/core';

declare var Swiper: any;
@Component({
  selector: 'app-favorites-movies-client',
  templateUrl: './favorites-movies-client.component.html',
  styleUrls: ['./favorites-movies-client.component.css'],
})
export class FavoritesMoviesClientComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper', {
      /*     slidesPerView: 3,
      spaceBetween: 10, */
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
    });
  }
}
