


function MovimientosJugador( camara,  objeto,  foward, yaw, lados,subir) {

				let vector = new THREE.Vector3();
				
				
			
				camara.getWorldDirection( vector );

				camara.position.x += vector.x * foward * deltaTime;
				camara.position.z += vector.z * foward * deltaTime;


				objeto.position.x += vector.x * foward * deltaTime;
				objeto.position.z += vector.z * foward * deltaTime;


				camara.getWorldDirection( vector );


				camara.translateX(lados*deltaTime);

				objeto.translateX(lados*deltaTime);	


			

				camara.getWorldDirection( vector );



			const myAxis = new THREE.Vector3(0,1, 0);

			camara.rotateOnWorldAxis(myAxis, yaw * deltaTime);


			var myAxis2 = new THREE.Vector3(0,0, 1);

				
				camara.rotateX(subir * deltaTime);
				objeto.rotateX(-subir * deltaTime);
				camara.getWorldDirection( vector );
				if(vector.y < -0.9 || vector.y >0.9){
				camara.rotateX(-subir * deltaTime);
				objeto.rotateX(subir * deltaTime);
			}

			


}

