import THREE from 'three';
import Tools from '../../modules/tools';
import Tree from './Tree';
import _ from 'lodash';

export default class Forest extends THREE.Object3D {
  constructor() {
    super();

    this.allData = [];
		this.paramsData = [];
    this.trees = [];

		this.createGrid();

  }

  setData(data) {
    this.allData = data;
  }

	setParams(params) {
		this.paramsData = params;
	}

	createGrid() {
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
	}

	generateTrees() {
		if (this.allData.length == 0) { console.log('No data :/'); return false; }
		for (var i = 0; i < this.allData.length; i++) {
  		this.addTree(this.allData[i], this.paramsData);
		}
	}

	updateTreesParams() {
		for (var i = 0; i < this.trees.length; i++) {
			this.trees[i].updateParams();
			this.trees[i].updateLeafs();
			this.trees[i].updateRayonGeom();
		}
	}

	addTree(treeData, params) {
		// Position
		var pos = [0, 0];
		if (params.realGeoloc) {
			pos = Tools.geoCoordsToCanvas(treeData.geom_x_y);
		} else {
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
			pos = [x, z];
		}

		var newTree = new Tree(treeData, params);
		newTree.position.setX(pos[0]);
		newTree.position.setZ(pos[1]);
		this.add(newTree);
		this.trees.push(newTree);
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
