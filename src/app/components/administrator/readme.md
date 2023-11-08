## CONFIGURACION DE RUTAS

lo que hago es que  cuando se ingresa a administrador este recibira una ruta 
como  "administrator/2" entonces lo que pasa es que su ruta recibe administrator:/id
es decir que tiene la ruta definida y aqui se aprovechara el id para usarlo en el ts

si nosotros queremos usar el id en los hijos no podremos 
this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.active = data['id'] !== null;
    });

PEROOOOOOOOO
si soy hijo y quiero acceder a las variables de las rutas de los padres debo usar otra cosa
  this.route.parent?.params.subscribe((data) => {
      this.id = data['id'];
      this.active = data['id'] !== null;
      // Usa this.parentId según sea necesario
      this.init();
    });

    le digo ingresa a la rutas los parametros del padre


    MODIFICAMOS
        RUTAS
        MENU 
        TS PADRE ADMINISTRADOR