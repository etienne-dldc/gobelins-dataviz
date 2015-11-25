import THREE from 'three';

export default class Leaf extends THREE.Object3D {
  constructor(color) {
    super();

    this.geom = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
    this.mat = new THREE.MeshBasicMaterial({
      color: color
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);
  }



  update() {
    this.rotation.y += 0.01;
  }
}
