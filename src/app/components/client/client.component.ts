import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  /*   showFiller = false;
   */
  id: number = 0;
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
}
