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
    this.allData = [];
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.treesHitbox = [];
    this.hoverTree = null;

    /**
     * SCENE
     */
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x000000, 300, 1000 );
		this.scene.fog.color.setHSL( 0, 0, 0 );

    /**
     * LIGHTS
     */
    var ambientLight = new THREE.AmbientLight( 0xffffff );
		this.scene.add( ambientLight );

    /**
     * CAMERA
     */
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 600;
    this.camera.position.y = 30;
    this.camera.rotation.x = -0.3;
    this.camera.lookAt(new THREE.Vector3())

    /**
     * CONTROL
     */
    this.controls = new OrbitControls(this.camera);
    //this.controls.minDistance = 100;
    this.controls.maxDistance = 700;
    this.controls.minAzimuthAngle = -Math.PI/2;
    this.controls.maxAzimuthAngle = Math.PI/2;
    this.controls.minPolarAngle = 0; // radians
    this.controls.maxPolarAngle = Math.PI * 0.4; // radians

    /**
     * RENDERER
     */
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);

    this.composer = null;
    this.initPostprocessing();
  }

  setData(data) {
    this.allData = data;
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    /* Add the effect composer of your choice */
  }

  start() {
    this.forest = new Forest();
    this.forest.position.set(0, 0, 0);
    this.forest.setData(this.allData);
    this.forest.generateTrees();
    this.treesHitbox = this.forest.getHitboxList();
    this.scene.add(this.forest);

    // handle mousemove
    this.renderer.domElement.addEventListener( 'mousemove', this.onMouseMove.bind(this) );
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  onMouseMove(event) {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  findHoverElem() {
    this.raycaster.setFromCamera( this.mouse, this.camera );
    //console.log(this.scene.children);
  	var intersects = this.raycaster.intersectObjects( this.treesHitbox );
    if (intersects.length == 0) {
      if (this.hoverTree !== null) {
        this.hoverTree.hoverOff();
        this.hoverTree = null;
      }
      return;
    }
    var tree = intersects[0].object.treeObject;
    if (tree !== undefined && this.hoverTree !== tree) {
      if (this.hoverTree !== null) {
        this.hoverTree.hoverOff();
        this.hoverTree = null;
      }
      this.hoverTree = tree;
      tree.hoverOn();
    }
  }

  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.findHoverElem();

    this.forest.update();
  }
}
