'use strict';

import THREE from 'three';
import OrbitControlsInit from 'three-orbit-controls';
import Forest from './objects/Forest';

window.THREE = THREE;
const OrbitControls = OrbitControlsInit(THREE);

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.Fog( 0x000000, 300, 1000 );
		this.scene.fog.color.setHSL( 0, 0, 0 );

    /**
     * LIGHTS
     */
    var ambientLight = new THREE.AmbientLight( 0xffffff );
		this.scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		//this.scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		//this.scene.add( directionalLight );

    /**
     * CAMERA
     */
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 600;
    this.camera.position.y = 30;
    this.camera.rotation.x = -0.3;
    this.camera.lookAt(new THREE.Vector3())

    this.controls = new OrbitControls(this.camera);
    //this.controls.minDistance = 100;
    this.controls.maxDistance = 700;
    this.controls.minAzimuthAngle = -Math.PI/2;
    this.controls.maxAzimuthAngle = Math.PI/2;
    this.controls.minPolarAngle = 0; // radians
    this.controls.maxPolarAngle = Math.PI * 0.4; // radians

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);

    this.composer = null;
    this.initPostprocessing();
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    /* Add the effect composer of your choice */
  }

  start() {
    this.forest = new Forest();
    this.forest.position.set(0, 0, 0);
    this.scene.add(this.forest);
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.forest.update();
  }
}
