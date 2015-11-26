'use strict';

import THREE from 'three';

const loader = new THREE.TextureLoader();

const textures = {};

const texturesUrl = [
	{ name: 'particle1', url: 'textures/particle1.png' },
	{ name: 'particle2', url: 'textures/particle2.png' },
	{ name: 'particle3', url: 'textures/particle3.png' }
];

let nbrOfTexture = texturesUrl.length;

export function loadAllTextures(callback) {
	for (var i = 0; i < texturesUrl.length; i++) {
		var textureElem = texturesUrl[i];
		(function(textureElem) {
			// load a resource
			loader.load(
				textureElem.url,
				// On loaded
				( texture ) => {
					console.info( 'Texture loaded : ' + textureElem.name );
					textures[textureElem.name] = texture;
					nbrOfTexture--;
					if (nbrOfTexture == 0) {
						callback(textures);
					}
				},
				( xhr ) => { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); },
				( xhr ) => {
					nbrOfTexture--;
					console.log( 'Fail to load ' + texture.name );
				}
			);
		})(textureElem);
	}

}

export default textures;
