  // Opciones para la fuente WMS
  var options = {
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    attribution: 'Municipalidad de Salta'
  };

  // Fuente WMS
  var source_capas = L.WMS.source("https://geocloud.municipalidadsalta.gob.ar/geoserver/wms", options);

  // Función para generar la URL de GetFeatureInfo desde source_capas
  source_capas.getFeatureInfoUrl = function (latlng, zoom, size, params) {
    const point = map.latLngToContainerPoint(latlng, zoom);
    const defaultParams = {
      request: 'GetFeatureInfo',
      service: 'WFS',
      srs: 'EPSG:3857',
      styles: '',
      version: '1.1.1',
      format: 'image/png',
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this._layerParams.layers,
      query_layers: this._layerParams.layers,
      info_format: 'text/plain',
      outputFormat: 'application/json',
      x: point.x,
      y: point.y
    };

    const allParams = Object.assign({}, defaultParams, params);
    return this._url + L.Util.getParamString(allParams, this._url, true);
  };


  // Evento click con fetch y popup formateado
  map.on('click', function (e) {
    const url = source_capas.getFeatureInfoUrl(
      e.latlng,
      map.getZoom(),
      map.getSize(),
      {
        'info_format': 'text/plain',
        'feature_count': 1
      }
    );

    fetch(url)
      .then(response => response.text())
      .then(data => {
        const propiedades = {};
        const lineas = data.split('\n');

        lineas.forEach(linea => {
          const partes = linea.split('=');
          if (partes.length === 2) {
            const key = partes[0].trim();
            const value = partes[1].trim();
            propiedades[key] = value;
          }
        });

        // // Lista de campos a mostrar
        // const camposAMostrar = {
        //   "catastro": "Catastro",
        //   "Tipo": "Tipo",
        //   "COD_LINK": "COD_LINK",
        //   "Distrito": "Distrito",
        //   "Valor_Rang": "Valor rango"
        // };

        // let contenidoPopup = '';
        // for (const key in camposAMostrar) {
        //   if (propiedades[key]) {
        //     contenidoPopup += `<b>${camposAMostrar[key]}:</b> ${propiedades[key]}<br>`;
        //   }
        // }

        // if (!contenidoPopup) {
        //   contenidoPopup = "No hay información disponible para este punto.";
        // }

        L.popup()
          .setLatLng(e.latlng)
          .setContent(contenidoPopup)
          .openOn(map);
      })
      .catch(error => {
        console.error('Error al obtener info:', error);
        L.popup()
          .setLatLng(e.latlng)
          .setContent("Error al obtener la información.")
          .openOn(map);
      });
  });
