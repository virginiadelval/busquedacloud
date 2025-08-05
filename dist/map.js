var barrio = L.geoJson(barrio, {
    style: {
        fillColor: '#11101007',
        weight: 1,
        opacity: 0.7,
        color: 'black',
        dashArray: '0.5',
        fillOpacity: 0.7,
    },
    // onEachFeature: barrios_pop,
    attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>'
});


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>',

});
var google = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: '&copy;<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Google</a>', attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>',

});

var argenmap = L.tileLayer(
    'https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
    opacity: 1.0,
    attribution: '<a href="https://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2"  target="_blank"> ArgenMap </a>',
    attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>',

});

// var catastros = L.tileLayer (
// 'https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&styles=&format=image%2Fpng',{
//     opacity: 0.9,
//     attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>',
// }
// );
  
// var Catastros = L.geoJson(catastros, {
//     style: {
//         fillColor: '#3e3bfc07',
//         weight: 1,
//         opacity: 0.7,
//         color: 'black',
//         dashArray: '0.5',
//         fillOpacity: 0.7,
//     },
//     // onEachFeature: barrios_pop,
//     attribution: '<a href="https://idemsa.municipalidadsalta.gob.ar/">IDEMSa</a>'
// });
