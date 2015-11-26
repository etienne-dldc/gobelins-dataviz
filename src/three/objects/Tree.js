import THREE from 'three';

import Leaf from './Leaf';
import textures from '../textures';

export default class Tree extends THREE.Object3D {
  constructor(treeData) {
    super();

    this.data = treeData;

    this.trunkHeight = treeData.hauteur;
    this.trunkWidth = 0.5;
    this.leafsSphereSize = 13;

    // Trunk
    var trunkGeom = new THREE.BoxGeometry(this.trunkWidth, this.trunkHeight, this.trunkWidth);
    var trunkMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      specular: 0xffffff,
      shininess: 1,
      transparent: true,
      opacity: 1
    });
    this.trunk = new THREE.Mesh( trunkGeom, trunkMat);
    this.trunk.position.y = this.trunkHeight/2;
    this.add(this.trunk);

    // Hit Box
    var hitboxHeight = this.leafsSphereSize + this.trunkHeight;
    var hitboxWidth = this.leafsSphereSize*2;
    var hitboxGeom = new THREE.BoxGeometry(hitboxWidth, hitboxHeight, hitboxWidth);
    var hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    this.hitbox = new THREE.Mesh( hitboxGeom, hitboxMat );
    this.hitbox.position.y = hitboxHeight/2;
    this.hitbox.treeObject = this;
    this.add(this.hitbox);

    this.leafs = [];

    var colorList = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0xFFFFFF ];

    for (let j = 0; j < 5; j++) {
      var nbrOfParticle = Math.floor(Math.random() * 500);
      var geometry = new THREE.BufferGeometry();
  		var positions = new Float32Array( nbrOfParticle * 3 );
  		var colors = new Float32Array( nbrOfParticle * 3 );
  		var color = new THREE.Color( colorList[j] );
  		for ( let i = 0; i < positions.length; i += 3 ) {
  			// positions
  			var x = Math.random() - 0.5;
  			var y = Math.random() - 0.5;
  			var z = Math.random() - 0.5;
        var pos = new THREE.Vector3(x, y, z);
        pos.normalize();
        pos.multiplyScalar( Math.random() * this.leafsSphereSize );

  			positions[ i ]     = pos.x;
  			positions[ i + 1 ] = pos.y;
  			positions[ i + 2 ] = pos.z;
  			// colors
  			colors[ i ]     = color.r;
  			colors[ i + 1 ] = color.g;
  			colors[ i + 2 ] = color.b;
  		}
  		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
  		geometry.computeBoundingSphere();
  		var material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: THREE.VertexColors,
        map: textures.particle2,
        transparent : true,
        //blending: THREE.AdditiveBlending,
        opacity: 0.4,
        depthTest: false,
      });
  		var particleSystem = new THREE.Points( geometry, material );
      particleSystem.position.y = this.trunkHeight;
      this.leafs.push(particleSystem);
      this.add( particleSystem );
    }
  }

  hoverOn() {
    for (var i = 0; i < this.leafs.length; i++) {
      this.leafs[i].position.y = this.trunkHeight + (i*this.leafsSphereSize);
    }
  }

  hoverOff() {
    for (var i = 0; i < this.leafs.length; i++) {
      this.leafs[i].position.y = this.trunkHeight;
    }
  }

  update() {
  }
}
