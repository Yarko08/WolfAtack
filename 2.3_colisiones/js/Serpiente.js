const Directions = {
    LEFT    :new THREE.Vector3(-1,0,0),
    RIGHT   :new THREE.Vector3( 1,0,0),
    FRONT   :new THREE.Vector3(0,0,-1),
    BACK    :new THREE.Vector3(0,0, 1),
    UP      :new THREE.Vector3(0, 1,0),
    DOWN    :new THREE.Vector3(0,-1,0),
}

class CuerpoSerpiente{
    /**@type {THREE.Vector3} */
    m_movedir;
    m_name;
    //Inicializa nuevo BloqueSerpiente
    constructor(movedir = new THREE.Vector3(0,0,-1),nombre){
        this.m_movedir = movedir;
        this.m_name = nombre;
        //scene.add(this.m_mesh)
    }
    //actuliza las posiciones
    updatePosition(speed){
        this.m_mesh.position.add(this.m_movedir.clone().multiplyScalar(speed));
    }
}
class Serpiente{
    m_size;
    m_speed;
    m_scene;
    m_cabeza;
    m_cuerpo = new Array();
    m_nombre;
    m_modelocuerpo;
    m_clockcounter;
    m_clockcd;
    constructor(size, speed, scene){
        this.m_size         = size;
        this.m_speed       = speed;
        this.m_scene = scene;
        this.m_clockcounter = 0;
        this.m_clockcd      = 0.8;
    }
    iniciarcabeza(){
        var nombre = this.m_nombre.concat("0");
        this.m_cuerpo.push(new CuerpoSerpiente(Directions.FRONT,nombre));
    }
    getcuerpo(cuerpo){
        this.m_modelocuerpo = cuerpo;
    }
    cambiarDireccionDerecha(dir){
    
        this.m_cuerpo[0].m_movedir.applyAxisAngle(Directions.UP, dir*Math.PI/2);
        if (this.m_cuerpo[0].m_movedir.z != -1 && this.m_cuerpo[0].m_movedir.z !=1)
        this.m_cuerpo[0].m_movedir.z=0;
        if (this.m_cuerpo[0].m_movedir.x != -1 && this.m_cuerpo[0].m_movedir.x != 1)
        this.m_cuerpo[0].m_movedir.x=0;
    }

    putnombre(nombre){
        this.m_nombre=nombre;
    }
    actualizar(deltaTime){

       var deltaTime2 = this.m_speed * deltaTime;
        for(var i = 0;i<this.m_cuerpo.length;i++){
            var Objeto= this.m_scene.getObjectByName(this.m_nombre.concat(i));
            Objeto.position.x += this.m_cuerpo[i].m_movedir.x * deltaTime2;
            Objeto.position.y += this.m_cuerpo[i].m_movedir.y * deltaTime2;
            Objeto.position.z += this.m_cuerpo[i].m_movedir.z * deltaTime2;
            if(this.m_cuerpo[i].m_movedir.x==-1 && this.m_cuerpo[i].m_movedir.y==0 && this.m_cuerpo[i].m_movedir.z==0)
            Objeto.rotation.z = THREE.Math.degToRad(270);
            if(this.m_cuerpo[i].m_movedir.x==1 && this.m_cuerpo[i].m_movedir.y==0 && this.m_cuerpo[i].m_movedir.z==0)
            Objeto.rotation.z = THREE.Math.degToRad(90);
            if(this.m_cuerpo[i].m_movedir.x==0 && this.m_cuerpo[i].m_movedir.y==0 && this.m_cuerpo[i].m_movedir.z==-1)
            Objeto.rotation.z = THREE.Math.degToRad(180);
            if(this.m_cuerpo[i].m_movedir.x==0 && this.m_cuerpo[i].m_movedir.y==0 && this.m_cuerpo[i].m_movedir.z==1)
            Objeto.rotation.z = THREE.Math.degToRad(0);
        }

        this.m_clockcounter+=deltaTime;
      
        if(this.m_clockcounter >= this.m_clockcd){

        for(var i = this.m_cuerpo.length-1;i>0;i--){
            this.m_cuerpo[i].m_movedir.x =this.m_cuerpo[i-1].m_movedir.x;
            this.m_cuerpo[i].m_movedir.y =this.m_cuerpo[i-1].m_movedir.y;
            this.m_cuerpo[i].m_movedir.z =this.m_cuerpo[i-1].m_movedir.z;
        }
        console.log("Fin de ciclo");
        this.m_clockcounter-=  this.m_clockcd;
    }

    }

    loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath(path);
		mtlLoader.load(mtlFile, (materials) => {
			
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(path);
			objLoader.load(objFile, (object) => {
				onLoadCallback(object);
            });
		});
    }
    
    nuevoElemento(){
        let numero = this.m_cuerpo.length;
        let ultimoRef = this.m_cuerpo[numero - 1 ];
        let nuevocuerpo
        let ultimocuerpo = scene.getObjectByName(ultimoRef.m_name);
        var modelo = this.m_modelocuerpo.clone();
        if(ultimoRef.m_movedir.x==-1 && ultimoRef.m_movedir.y==0 && ultimoRef.m_movedir.z==0){
            nuevocuerpo = new CuerpoSerpiente(Directions.LEFT,this.m_nombre.concat(numero));
            modelo.position.x=ultimocuerpo.position.x+5;
            modelo.position.z=ultimocuerpo.position.z;
            modelo.position.y=ultimocuerpo.position.y;

        }
        if(ultimoRef.m_movedir.x==1 && ultimoRef.m_movedir.y==0 && ultimoRef.m_movedir.z==0)
        {
            nuevocuerpo = new CuerpoSerpiente(Directions.RIGHT,this.m_nombre.concat(numero));
            modelo.position.x=ultimocuerpo.position.x-5;
            modelo.position.z=ultimocuerpo.position.z;
            modelo.position.y=ultimocuerpo.position.y;
         }
        if(ultimoRef.m_movedir.x==0 && ultimoRef.m_movedir.y==0 && ultimoRef.m_movedir.z==-1){
            nuevocuerpo = new CuerpoSerpiente(Directions.FRONT,this.m_nombre.concat(numero));
            modelo.position.x=ultimocuerpo.position.x;
            modelo.position.z=ultimocuerpo.position.z+5;
            modelo.position.y=ultimocuerpo.position.y;
        }
        if(ultimoRef.m_movedir.x==0 && ultimoRef.m_movedir.y==0 && ultimoRef.m_movedir.z==1)
         {
            nuevocuerpo = new CuerpoSerpiente(Directions.BACK,this.m_nombre.concat(numero));
            modelo.position.x=ultimocuerpo.position.x;
            modelo.position.z=ultimocuerpo.position.z-5;
            modelo.position.y=ultimocuerpo.position.y;
        }
       modelo.name=this.m_nombre.concat(numero);
       this.m_scene.add(modelo);

        this.m_cuerpo.push(nuevocuerpo);
    }

}