import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Support } from 'src/app/models/support';

@Component({
  selector: 'app-supports-administrator',
  templateUrl: './supports-administrator.component.html',
  styleUrls: ['./supports-administrator.component.css']
})
export class SupportsAdministratorComponent {

   dataSource:MatTableDataSource<Support> =new MatTableDataSource();
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
     constructor(){
 
   }
}
