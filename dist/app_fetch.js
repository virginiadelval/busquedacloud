
// const api_url =
//   "https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&maxFeatures=50000&outputFormat=application%2Fjson"; // crea una variable con la url de la api
// // let api_url = 'https://apiwms.onrender.com/api/arbolado'; // desde tu backend local
// fetch(api_url)
//   .then(response => response.json())
//  // .then(data => mostrarData1(data))
//   .catch(error => console.log(error));

// async function getData() {
//   const response = await fetch(api_url); //fetch se conecta a la url
//   const data = await response.json(); // trae el dato en formato json para ser leido
//   const features = data.features;
//   const points = []; // genera la variable un layer con todos los puntos

//   for (let i = 0; i < features.length; i++) {   //genera una iteraccion por cada elemento que lee y genera una const para cada uno de los dato que quiero traer
//     const feature = features[i];
//     const catastro = feature.properties.catastro;
//     const tipo = feature.properties.Tipo;
//     const COD_LINK = feature.properties.COD_LINK;
//     const valorsuelo = feature.properties.Valor_Rang;
//     const valorut = feature.properties.Valorponderado;


//     // //muestro por consola los datos
//     // console.log( geometry, lat1, long, nombre,
//     //     //  point
//     //      );

//     // Crea un objeto point con las propiedades de longitud y latitud para que se vea en el mapa y luego las caracteristicas que quiero nombre
//     const point = {
//       Catastro: catastro,
//       Tipo: tipo,
//       COD_LINK: COD_LINK,
//       'Valor del suelo': valorsuelo,
//       'Categoria UT': valorut

//     };
//     console.log(point);
//     // Agrega el punto al array points
//     points.push(point);
//   }

//   console.log(points);
//   // Llamar a la función addMarkers() para agregar marcadores al mapa
//   addMarkers(points);
// }

// const addMarkers = (points) => {
//   points.forEach((point) => {
//     //creo la variable marker (punto) con los datos de lat/long traido anterioremente
//     const marker = L.marker([point.longitud, point.latitud]); /// al marker le asigno la porpoiedad de lat y long porque sino no aparece en el mapa. Luego le agrego las demas caracteristicas que
//     marker
//       .bindPopup(
//         `<div id='Estilo1'><h3><i>Datos del Arbolado Urbano</i></h3></div>
//         <hr class='hrx' style='color: #ef7d26;' align='left' noshade='noshade' size='2' width='100%' />
//         <div id='Estilo3a'>
//         <b>ID:</b> ${point.catastro}<br>
//         <b>Nombre:</b> ${point.Tipoipo}<br>
//         <b>Tipo :</b> ${point.COD_LINK}<br>
//         <div align='center'>  <b> Imagen : <i>(se inserta img alineada) </i>  <img src=dist/images/logo_inspeccion_min.png height=70px width=auto opacity: 0.5/> </div> <br>
//         <b> Imagen : <i>(se inserta img sin alinear) </i>   <figure><img class='imgpop' src=feature.properties.data_foto></figure>
//         </div>
//       `
//       )
//       .addTo(map);
//   });
// };
// getData();

const api_url =
  "https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&maxFeatures=50&outputFormat=application%2Fjson";

// Función principal
async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();

  const capaPoligonos = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      // Datos que querés mostrar en el popup
      const props = feature.properties;

      const contenido = `
        <div id='Estilo1'><h3><i>Valor del Suelo</i></h3></div>
        <hr class='hrx' style='color: #ef7d26;' align='left' noshade='noshade' size='2' width='100%' />
        <div id='Estilo3a'>
          <b>Catastro:</b> ${props.catastro || '-'}<br>
          <b>Tipo:</b> ${props.Tipo || '-'}<br>
          <b>COD_LINK:</b> ${props.COD_LINK || '-'}<br>
          <b>Distrito:</b> ${props.Distrito || '-'}<br>
          <b>Valor rango:</b> ${props.Valor_Rang || '-'}<br>
        </div>`;

      layer.bindPopup(contenido);
    },
    style: {
      color: "#ef7d26",
      weight: 1,
      fillOpacity: 0.4
    }
  });

  capaPoligonos.addTo(map);
}

getData();
