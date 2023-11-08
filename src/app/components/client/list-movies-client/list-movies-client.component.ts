import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contenido } from 'src/app/models/contenido';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-list-movies-client',
  templateUrl: './list-movies-client.component.html',
  styleUrls: ['./list-movies-client.component.css']
})
export class ListMoviesClientComponent {
  listaContenidos:Contenido[]=[];
  idParent:number=0;
  constructor(private cS: ContenidoService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    
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
