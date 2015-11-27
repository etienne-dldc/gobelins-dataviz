import THREE from 'three';

import textures from '../textures';
import _ from 'lodash';
import Tools from '../../modules/tools';
import 'gsap';

export default class Tree extends THREE.Object3D {
  constructor(treeData, paramsData) {
    super();

    this.data = treeData;
    this.params = {
      rayon: null,
      leafs: {}
    };
    this.paramsData = paramsData;
    this.leafsToUpdate = [];
    this.leafsSphereSize = 13;
    this.trunkHeight = this.leafsSphereSize/2 + this.data.hauteur;
    this.trunkWidth = 0.5;
    this.maxParticles = 1000;
    this.rayonHeight = 1;
    this.rayonBase = 0.01;

    this.tweens = {
      hover : null,
      in: null
    };

    this.updateParams();

    this.createHitbox();
    this.createTrunk();
    this.createRayon();
    this.createLeafs();
    this.updateLeafs();

    this.animIn();
  }

  createHitbox() {
    let hitboxMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });

    // Hit Box Trunk
    let hitboxtrunkGeom = new THREE.BoxGeometry(this.trunkWidth + 1, this.trunkHeight, this.trunkWidth + 1);
    this.hitboxtrunk = new THREE.Mesh( hitboxtrunkGeom, hitboxMat );
    this.hitboxtrunk.position.y = this.trunkHeight/2;
    this.hitboxtrunk.treeObject = this;
    this.add(this.hitboxtrunk);
    // Hit Box Leafs
    let hitboxleafsGeom = new THREE.SphereGeometry(this.leafsSphereSize, 12, 12);
    this.hitboxleafs = new THREE.Mesh( hitboxleafsGeom, hitboxMat );
    this.hitboxleafs.position.y = this.trunkHeight;
    this.hitboxleafs.treeObject = this;
    this.add(this.hitboxleafs);
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
    let rayonWidth = Tools.geoDistToCanvas(this.params.rayon);
    this.rayonGeom = new THREE.CylinderGeometry(rayonWidth, rayonWidth, this.rayonHeight, 32);
    this.rayonMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      specular: 0xffffff,
      shininess: 1,
      transparent: true,
      opacity: 0.01,
      depthTest: false
    });
    this.rayon = new THREE.Mesh( this.rayonGeom, this.rayonMat);
    this.rayon.position.y = this.rayonHeight/2;
    this.add(this.rayon);
  }

  updateRayonGeom() {
    let rayonWidth = Tools.geoDistToCanvas(this.params.rayon);
    this.rayonGeom = new THREE.CylinderGeometry(rayonWidth, rayonWidth, this.rayonHeight, 32);
    this.rayon.geometry = this.rayonGeom;
  }

  createLeafs() {
    this.leafs = {};
    _.each(this.params.leafs, (elem, key) => {
      this.createLeaf(key);
    })
  }

  createLeaf(name) {
    //console.log(this.params, name);
    var nbrOfParticle = this.params.leafs[name];
    var volumeMax = Tools.sphereVolumeFromRayon(this.leafsSphereSize);
    var volume = Tools.map(nbrOfParticle, 0, this.maxParticles, 0, volumeMax);
    var rayon = Tools.sphereRayonFromVolume(volume);

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array(), 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array(), 3 ) );
    geometry.computeBoundingSphere();
    var material = new THREE.PointsMaterial({
      size: 1.7,
      vertexColors: THREE.VertexColors,
      map: textures.particle3,
      transparent : true,
      //blending: THREE.AdditiveBlending,
      opacity: 0.9,
      depthTest: true,
      alphaTest: 0.2
    });
    var particleSystem = new THREE.Points( geometry, material );
    particleSystem.position.y = this.trunkHeight;
    particleSystem.sortParticles = true
    particleSystem.rayon = rayon;
    this.leafs[name] = particleSystem;
    this.add( particleSystem );
  }

  updateLeafs() {
    for (var i = 0; i < this.leafsToUpdate.length; i++) {
      var leafName = this.leafsToUpdate[i];
      if (this.params.leafs[leafName].display == false) {
        this.hideLeaf(leafName)
      } else {
        this.showLeaf(leafName);
        this.updateLeaf(leafName);
      }
    }
    this.leafsToUpdate = [];
    this.resizeHitbox();
  }

  hideLeaf(name) {
    var leaf = this.leafs[name];
    leaf.visible = false;
  }

  showLeaf(name) {
    var leaf = this.leafs[name];
    leaf.visible = true;
  }

  updateLeaf(name) {
    //console.log('updateLeaf ' + name);

    var leaf = this.leafs[name];
    var nbrOfParticle = this.params.leafs[name].particles;
    var volumeMax = Tools.sphereVolumeFromRayon(this.leafsSphereSize);
    var volume = Tools.map(nbrOfParticle, 0, this.maxParticles, 0, volumeMax);
    var rayon = Tools.sphereRayonFromVolume(volume);

    leaf.rayon = rayon;

    var positions = new Float32Array( nbrOfParticle * 3 );
    var colors = new Float32Array( nbrOfParticle * 3 );

    var color = new THREE.Color( this.paramsData.leafs[name].color );

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

    leaf.geometry.removeAttribute('position');
    leaf.geometry.removeAttribute('color');
    leaf.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    leaf.geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    leaf.geometry.computeBoundingSphere();
  }

  resizeHitbox() {
    let maxRayon = 0;
    _.each(this.leafs, (elem, index) => {
      if (elem.rayon > maxRayon) {
        maxRayon = elem.rayon;
      }
    });
    var scaleValue = maxRayon / this.leafsSphereSize;
    if (scaleValue < 0.1) {
      scaleValue = 0.1;
    }
    this.hitboxleafs.scale.set(scaleValue, scaleValue, scaleValue);
  }

  updateParams() {
    let params = this.paramsData;
    let oldParams = _.cloneDeep(this.params);
    this.caclParams();
    _.each(params.leafs, (elem, key) => {
      let leafParams = this.params.leafs[key];
      if (oldParams.leafs[key] == undefined) { oldParams.leafs[key] = {} }
      let displayHasChange = oldParams.leafs[key].display !== leafParams.display;
      let particlesHasChange = oldParams.leafs[key].particles !== leafParams.particles;
      if (displayHasChange || ( leafParams.display && particlesHasChange ) ) {
        this.leafsToUpdate.push(key);
      }
    });
  }

  updateRayon() {
    this.params.rayon = this.rayonBase + this.data.hauteur * this.paramsData.hauteur.multiplier * this.paramsData.hauteur.user_multiplier;
  }

  caclParams() {
    this.updateRayon(this.paramsData.hauteur);
    _.each(this.paramsData.leafs, (elem, key) => {
      if (this.params.leafs[key] == undefined) { this.params.leafs[key] = {} }
      if (elem.display == false) {
        this.params.leafs[key] = {
          display: false,
          particles: null
        };
        return;
      } else {
        let result = this.elemsInRayon(key) * elem.multiplier;
        let maxParticles = this.maxParticles * elem.user_multiplier;
        result = Tools.map(result, 0, elem.max, 1, maxParticles);
        this.params.leafs[key] = {
          display: true,
          particles: Math.floor(result)
        };
      }
    });
  }

  elemsInRayon(elemName) {
    let r = this.params.rayon;
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
    TweenMax.from(this.rayon.scale, 0.2, {
      z: 0.1,
      x: 0.1
    });
  }

  hoverOff() {
    if (this.tweens.hover) { this.tweens.hover.kill(null, this.rayonMat); }
    this.tweens.hover = TweenMax.to(this.rayonMat, 0.3, {
      opacity: 0.01
    });
  }

  animIn() {
    this.position.y = 1000;
    this.tweens.in = TweenMax.to(this.position, 0.5, {
      y: 0,
      delay: Math.random() * 1
    });
  }

  update() {
  }
}
