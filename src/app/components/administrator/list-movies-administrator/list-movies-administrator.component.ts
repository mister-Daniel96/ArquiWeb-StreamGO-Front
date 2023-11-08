import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-list-movies-administrator',
  templateUrl: './list-movies-administrator.component.html',
  styleUrls: ['./list-movies-administrator.component.css'],
})
export class ListMoviesAdministratorComponent implements OnInit {

  listaContenidos:Contenido[]=[];
  idParent:number=0;
  constructor(private cS: ContenidoService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(data=>{
      this.idParent=data['id']
    })
    this.cS.list().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
    this.cS.getList().subscribe((data) => {
      this.listaContenidos = data; //paso todos los datos a la data
    });
   
  }

  eliminar(id:number){
    this.cS.delete(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data);
      })
    })
  }
}
