'use strict';

const fs = require('fs');
const _ = require('lodash');

function distance(coord1, coord2) {
  let dx = coord2[0] - coord1[0];
  let dy = coord2[1] - coord1[1];
  return Math.sqrt( (dx * dx) + (dy * dy) );
}

var arbres = fs.readFileSync('./arbresremarquablesparis2011.json');
arbres = JSON.parse(arbres);

var arbres_align = fs.readFileSync('./arbresalignementparis2010.json');
arbres_align = JSON.parse(arbres_align);

console.log('arbres_align : ' + arbres_align.length);

var poteaux = fs.readFileSync('./poteaux_divers_sur_voie_publique.json');
poteaux = JSON.parse(poteaux);

var poteauxBois = _.filter(poteaux, function (elem) {
  return elem.fields.info == 'PEP';
});

console.log('poteauxBois : ' + poteauxBois.length);

var mobilier = fs.readFileSync('./mobilierenvironnementparis2011.json');
mobilier = JSON.parse(mobilier);

var poubelles = _.filter(mobilier, function (elem) {
  return ( ['POU', 'POUP', 'PRE'].indexOf(elem.fields.info) !== -1 );
});

console.log('poubelles : ' + poubelles.length);

var bancs = _.filter(mobilier, function (elem) {
  return ( ['BA2', 'BA1', 'BA1S', 'BA1F', 'BA2C'].indexOf(elem.fields.info) !== -1 );
});

console.log('bancs : ' + bancs.length);

var result = [];

console.time("Build Data");
// Add poteaux distances Array
for (var i = 0; i < arbres.length; i++) {
  var arbre = arbres[i];
  let newArbre = {
    id: arbre.fields.objectid,
    annee_pla: arbre.fields.annee_pla,
    adresse: arbre.fields.adresse,
    espece: arbre.fields.espece,
    arrondisse: arbre.fields.arrondisse,
    hauteur: arbre.fields.hauteur || 10,
    geom_x_y: arbre.fields.geom_x_y,
    genre: arbre.fields.genre,
    nom_commun: arbre.fields.nom_commun,
    nom_ev: arbre.fields.nom_ev,
    famille: arbre.fields.famille,

    poteaux_bois_dist: [],
    arbres_align_dist: [],
    bancs_dist: []
  }
  // Poteaux
    let poteaux_bois_dist = [];
    for (var j = 0; j < poteauxBois.length; j++) {
      let poteau = poteauxBois[j];
      let dist = distance(poteau.fields.geom_x_y, newArbre.geom_x_y);
      poteaux_bois_dist.push(dist);
    }
    poteaux_bois_dist = _.groupBy(poteaux_bois_dist, function (elem) {
      return Math.floor(elem * 1000);
    });
    poteaux_bois_dist = _.sortBy(poteaux_bois_dist, 'distance');
    _.each(poteaux_bois_dist, function(elem, index) {
      newArbre.poteaux_bois_dist.push({
        distance: parseInt(index) / 1000,
        count: elem.length
      });
    });
  // Arbre align
    let arbres_align_dist = [];
    for (var j = 0; j < arbres_align.length; j++) {
      let align = arbres_align[j];
      let dist = distance(align.fields.geom_x_y, newArbre.geom_x_y);
      arbres_align_dist.push(dist);
    }
    arbres_align_dist = _.groupBy(arbres_align_dist, function (elem) {
      return Math.floor(elem * 1000)
    });
    arbres_align_dist = _.sortBy(arbres_align_dist, 'distance');
    _.each(arbres_align_dist, function(elem, index) {
      newArbre.arbres_align_dist.push({
        distance: parseInt(index) / 1000,
        count: elem.length
      });
    });
  // Bancs
    let bancs_dist = [];
    for (var j = 0; j < bancs.length; j++) {
      let banc = bancs[j];
      let dist = distance(banc.fields.geom_x_y, newArbre.geom_x_y);
      bancs_dist.push(dist);
    }
    bancs_dist = _.groupBy(bancs_dist, function (elem) {
      return Math.floor(elem * 1000)
    });
    bancs_dist = _.sortBy(bancs_dist, 'distance');
    _.each(bancs_dist, function(elem, index) {
      newArbre.bancs_dist.push({
        distance: parseInt(index) / 1000,
        count: elem.length
      });
    });
  // Add arbre
  result.push(newArbre);
}
console.timeEnd("Build Data");


console.time("Write file");
fs.writeFileSync('data.json', JSON.stringify(result));
console.timeEnd("Write file");
