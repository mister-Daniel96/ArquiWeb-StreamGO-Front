import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports-administrator',
  templateUrl: './reports-administrator.component.html',
  styleUrls: ['./reports-administrator.component.css'],
})
export class ReportsAdministratorComponent implements OnInit {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
