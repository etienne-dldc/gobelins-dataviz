import THREE from 'three';
import Tools from '../../modules/tools';
import Tree from './Tree';

export default class Forest extends THREE.Object3D {
  constructor() {
    super();

		this.dataParams = {
			hauteur: { multiplier: 0.001, color: 0xffffff, user_multiplier: 1 },
			arbres_align_dist: { multiplier: 1, color: 0x16f1d4, user_multiplier: 1, max: 104025 },
			bancs_dist: { multiplier: 1, color: 0x18f277, user_multiplier: 1, max: 11581 },
			poteaux_bois_dist: { multiplier: 0.5, color: 0x1dacdd, user_multiplier: 1, max: 137 }
		};

    this.allData = [];

		/**
		 * GRID
		 */
		var groundGeo = new THREE.Geometry();
		var length = 15, step = 50, cutAngleRatio = 0.7;
		var size = length * step * 0.5, cutAngle = Math.floor(length * cutAngleRatio * 0.5);
		this.gridSize = size;
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

    this.trees = [];

  }

  setData(data) {
    this.allData = data;
  }

	addTree(treeData) {

		var maxLoop = 50;
		var x, z;
		do {
			let posAngle = Math.random() * Math.PI * 2;
			let posDist = Math.random() * (this.gridSize * 0.9 );
			x =  Math.cos(posAngle) * posDist;
			z = Math.sin(posAngle) * posDist;
			maxLoop--;
			if (maxLoop == 0) { console.log('max'); }
		} while (maxLoop > 0 && this.closestTree(x, z) < 30);

		var pos = [x, z];
		//var pos = Tools.geoCoordsToCanvas(treeData.geom_x_y);


		var newTree = new Tree(treeData, this.dataParams);
		newTree.position.setX(pos[0]);
		newTree.position.setZ(pos[1]);
		this.add(newTree);
		this.trees.push(newTree);
	}

	generateTrees() {
		if (this.allData.length == 0) { console.log('No data :/'); return false; }
		for (var i = 0; i < this.allData.length; i++) {
			this.addTree(this.allData[i], this.dataParams);
		}
	}

	getHitboxList(){
		var result = [];
		for (var i = 0; i < this.trees.length; i++) {
			result.push(this.trees[i].hitboxtrunk);
			result.push(this.trees[i].hitboxleafs);
		}
		return result;
	}

	closestTree(x, z) {
		var minDist = Infinity;
		for (var i = 0; i < this.trees.length; i++) {
			var tx = this.trees[i].position.x;
			var tz = this.trees[i].position.z;
			var dx = tx - x;
			var dz = tz - z;
			var dist = Math.sqrt( (dx * dx) + (dz * dz) );
			if (dist < minDist) { minDist = dist }
		}
		return minDist;
	}

  update() {

  }
}
