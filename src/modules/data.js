'use strict';

import $ from 'jquery';

var allData = {};

export function loadData(callback) {
  $.getJSON( "data.json", ( theData ) => {
    allData = theData;
    callback(theData);
  });
}

export default allData;
