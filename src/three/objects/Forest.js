import THREE from 'three';
import Tree from './Tree';

export default class Forest extends THREE.Object3D {
  constructor() {
    super();

		/**
		 * GRID
		 */
		var groundGeo = new THREE.Geometry();
    // var size = 300, step = 50;
		// for ( var i = - size; i <= size; i += step ) {
		// 	groundGeo.vertices.push( new THREE.Vector3( - size, 0, i ) );
		// 	groundGeo.vertices.push( new THREE.Vector3(   size, 0, i ) );
		//
		// 	groundGeo.vertices.push( new THREE.Vector3( i, 0, - size ) );
		// 	groundGeo.vertices.push( new THREE.Vector3( i, 0,   size ) );
		// }
		var length = 15, step = 50, cutAngleRatio = 0.7;
		var size = length * step * 0.5, cutAngle = Math.floor(length * cutAngleRatio * 0.5);
		for ( var i = 0; i < length/2; i++ ) {
			let z = (-size) + (i * step);
			let xSub = (cutAngle-i) * step;
			xSub = xSub < 0 ? 0 : xSub;
			// top
			groundGeo.vertices.push( new THREE.Vector3( - size + xSub, 0, z ) );
			groundGeo.vertices.push( new THREE.Vector3(   size - xSub, 0, z ) );
			// left
			groundGeo.vertices.push( new THREE.Vector3( z, 0, - size + xSub ) );
			groundGeo.vertices.push( new THREE.Vector3( z, 0,   size - xSub ) );
			// bottom
			z = size - (i * step);
			groundGeo.vertices.push( new THREE.Vector3( - size + xSub, 0, z ) );
			groundGeo.vertices.push( new THREE.Vector3(   size - xSub, 0, z ) );
			// right
			groundGeo.vertices.push( new THREE.Vector3( z, 0, - size + xSub ) );
			groundGeo.vertices.push( new THREE.Vector3( z, 0,   size - xSub ) );
		}
		var groundMat = new THREE.LineBasicMaterial( { color: 0xFFFFFF, linewidth: 0.1, opacity: 0.4 } );
    groundMat.transparent = true;
		this.groundLines = new THREE.LineSegments( groundGeo, groundMat );
		this.add( this.groundLines );

		/**
		 * GENERATE THREE
		 */
    this.trees = [];
		var treesPos = [];

		for (var i = 0; i < 97; i++) {
			var maxLoop = 50;
			var x, z;
			do {
				let posAngle = Math.random() * Math.PI * 2;
				let posDist = Math.random() * (size * 0.9 );
				x =  Math.cos(posAngle) * posDist;
				z = Math.sin(posAngle) * posDist;
				maxLoop--;
				if (maxLoop == 0) { console.log('max'); }
			} while (maxLoop > 0 && closestTree(x, z) < 30);
			treesPos.push([x, z]);

			var newTree = new Tree();
			newTree.position.set(x, 0, z );
			this.add(newTree);
			this.trees.push(newTree);
		}

		function closestTree(x, y) {
			var minDist = 1000;
			for (var i = 0; i < treesPos.length; i++) {
				var tx = treesPos[i][0];
				var ty = treesPos[i][1];
				var dx = tx - x;
				var dy = ty - y;
				var dist = Math.sqrt( (dy * dy) + (dx * dx));
				if (dist < minDist) { minDist = dist }
			}
			return minDist;
		}


  }

  update() {

  }
}
