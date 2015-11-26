import THREE from 'three';

import Leaf from './Leaf';
import textures from '../textures';
import _ from 'lodash';
import Tools from '../../modules/tools';
import 'gsap';

export default class Tree extends THREE.Object3D {
  constructor(treeData, dataParams) {
    super();

    this.data = treeData;

    this.leafsSphereSize = 13;
    this.trunkHeight = this.leafsSphereSize/2 + this.data.hauteur;
    this.trunkWidth = 0.5;
    this.maxParticles = 1000;
    this.rayonHeight = 1;
    this.rayonBase = 0.01;

    this.tweens = {
      hover : null
    };

    // param_name : { multiplier: 0.01, user_multiplier: 0.5, color: 0xFFFFFF }
    this.params = {};
    this.computedData = {};

    this.setParams(dataParams);

    this.createLeafs(['arbres_align_dist', 'bancs_dist', 'poteaux_bois_dist']);
    this.createTrunk();
    this.createHitbox();
    this.createRayon();
  }

  createHitbox() {
    // Hit Box
    let hitboxHeight = this.leafsSphereSize + this.trunkHeight;
    let hitboxWidth = this.leafsSphereSize*2;
    let hitboxGeom = new THREE.BoxGeometry(hitboxWidth, hitboxHeight, hitboxWidth);
    let hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    this.hitbox = new THREE.Mesh( hitboxGeom, hitboxMat );
    this.hitbox.position.y = hitboxHeight/2;
    this.hitbox.treeObject = this;
    this.add(this.hitbox);
  }

  createTrunk() {
    let trunkGeom = new THREE.BoxGeometry(this.trunkWidth, this.trunkHeight, this.trunkWidth);
    let trunkMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      specular: 0xffffff,
      shininess: 1,
      transparent: true,
      opacity: 1
    });
    this.trunk = new THREE.Mesh( trunkGeom, trunkMat);
    this.trunk.position.y = this.trunkHeight/2;
    this.add(this.trunk);
  }

  createRayon() {
    let rayonWidth = Tools.geoDistToCanvas(this.computedData.rayon);
    let rayonGeom = new THREE.CylinderGeometry(rayonWidth, rayonWidth, this.rayonHeight, 32);
    this.rayonMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      specular: 0xffffff,
      shininess: 1,
      transparent: true,
      opacity: 0.01,
      depthTest: false
    });
    this.rayon = new THREE.Mesh( rayonGeom, this.rayonMat);
    this.rayon.position.y = this.rayonHeight/2;
    this.add(this.rayon);
  }

  createLeafs(list) {
    this.leafs = {};
    for (var i = 0; i < list.length; i++) {
      let elemName = list[i]
      this.createLeaf(elemName);
    }
  }

  createLeaf(name) {
    //console.log(this.computedData, name);
    var nbrOfParticle = this.computedData[name];
    var volumeMax = Tools.sphereVolumeFromRayon(this.leafsSphereSize);
    var volume = Tools.map(nbrOfParticle, 0, this.maxParticles, 0, volumeMax);
    var rayon = Tools.sphereRayonFromVolume(volume);

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array( nbrOfParticle * 3 );
    var colors = new Float32Array( nbrOfParticle * 3 );
    var color = new THREE.Color( this.params[name].color );
    for ( let i = 0; i < positions.length; i += 3 ) {
      // positions
      var x = Math.random() - 0.5;
      var y = Math.random() - 0.5;
      var z = Math.random() - 0.5;
      var pos = new THREE.Vector3(x, y, z);
      pos.normalize();
      pos.multiplyScalar( Math.random() * rayon );

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
    this.leafs[name] = particleSystem;
    this.add( particleSystem );
  }

  setParams(params) {
    let updateAll = false;
    if (params.hauteur !== this.params.hauteur) {
      this.updateRayon(params);
      updateAll = true;
    }
    _.each(params, (elem, index) => {
      if (index == 'hauteur') { return; }
      if (updateAll) {
        this.computeData(index, params);
        return;
      }
      if (elem !== this.params[index]) {
        this.computeData(index, params);
      }
    });
    this.params = params;
  }

  updateRayon(params) {
    this.computedData.rayon = this.rayonBase + this.data.hauteur * params.hauteur.multiplier * params.hauteur.user_multiplier;
  }

  computeData(elemName, params) {
    let result = this.elemsInRayon(elemName) * params[elemName].multiplier;
    let maxParticles = this.maxParticles * params[elemName].user_multiplier;
    result = Tools.map(result, 0, params[elemName].max, 0, maxParticles);
    this.computedData[elemName] = Math.floor(result);
  }

  elemsInRayon(elemName) {
    let r = this.computedData.rayon;
    let result = 0;
    if (this.data[elemName] == undefined) {
      console.log('Can\'t find ' + elemName);
      console.log(this.data);
      return 0;
    }
    for (var i = 0; i < this.data[elemName].length; i++) {
      if (this.data[elemName][i].distance <= r) {
        result += this.data[elemName][i].count;
      }
    }
    return result;
  }

  hoverOn() {
    if (this.tweens.hover !== null) { this.tweens.hover.kill(null, this.rayonMat); }
    this.tweens.hover = TweenMax.to(this.rayonMat, 0.3, {
      opacity: 0.08
    });
  }

  hoverOff() {
    if (this.tweens.hover !== null) { this.tweens.hover.kill(null, this.rayonMat); }
    this.tweens.hover = TweenMax.to(this.rayonMat, 0.3, {
      opacity: 0.01
    });
  }

  update() {
  }
}
