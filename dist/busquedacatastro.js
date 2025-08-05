let capaGeojson = null;

// Diccionario de códigos
const codigos = {
    Calle: {
        "10": "Asfalto/Hormigón/Bituminoso/Adoquín",
        "11": "Tierra con Cordón Cuneta",
        "12": "Tierra sin Cordón Cuneta / Sin Dato"
    },
    Recoleccion: {
        "20": "Especial (centro/gastronómico)",
        "21": "Servicio matutino y nocturno",
        "22": "Contenedores (6 barrios)",
        "23": "Sin servicio"
    },
    Barrido: {
        "30": "Especial (centro/gastronómico)",
        "31": "6 veces por semana",
        "32": "3 veces por semana",
        "33": "1–2 veces por semana",
        "34": "Sin servicio"
    },
    LUSAL: {
        "40": "Lámpara LED",
        "41": "Otro tipo de lámpara",
        "42": "Sin servicio"
    },
    SEV: {
        "50": "Con servicio",
        "51": "Sin servicio"
    },
    Semaforo: {
        "60": "Con semáforo",
        "61": "Sin semáforo"
    }
};

// Función para desagregar el COD_LINK
function descomponerCODLINK(codlink) {
    const partes = codlink.match(/.{1,2}/g); // divide de a 2 dígitos
    const categorias = ["Calle", "Recoleccion", "Barrido", "LUSAL", "SEV", "Semaforo"];
    const resultados = [];

    for (let i = 0; i < categorias.length; i++) {
        const cat = categorias[i];
        const valor = partes[i];
        const descripcion = codigos[cat][valor] || "Descripción no encontrada";
        resultados.push(`<b>${cat}:</b> ${valor} - ${descripcion}`);
    }

    return resultados.join("<br>");
}

// Función principal de búsqueda
// async function buscarCatastro() {
//   const valor = document.getElementById("inputCatastro").value.trim();
//   if (!valor) {
//     alert("Ingrese un número de catastro.");
//     return;
//   }

//   const url = `https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&outputFormat=application/json&CQL_FILTER=catastro='${valor}'`;

//   try {
//     const res = await fetch(url);
//     const geojson = await res.json();

//     if (capaGeojson) map.removeLayer(capaGeojson);

//     capaGeojson = L.geoJSON(geojson, {
//       style: {
//         color: "#1F58F3FF",
//         weight: 2,
//         fillOpacity: 0.4
//       },
//       onEachFeature: (feature, layer) => {
//         const props = feature.properties;

//         const codLinkDesglosado = descomponerCODLINK(props.COD_LINK || "");

//         const contenido = `
//           <h4>Descripción </h4>
//           <b>Catastro:</b> ${props.catastro || "-"}<br>
//           <b>COD_LINK:</b> ${props.COD_LINK || "-"}<br>
//           <b>Detalle de Servicios:</b><br>
//           ${codLinkDesglosado}
//         `;

//         // Mostrar en el panel lateral
//         document.getElementById("catastroInfo").innerHTML = contenido;

//         // También se puede vincular al popup si se desea
//         layer.bindPopup(contenido);
//       }
//     }).addTo(map);

//     const bounds = capaGeojson.getBounds();
//     if (bounds.isValid()) {
//       map.fitBounds(bounds);
//     }

//   } catch (err) {
//     console.error(err);
//     alert("Error al buscar el catastro.");
//   }
// }

/// 
// Función principal de búsquuda para Catastros y Numero de cuentas
async function buscarGeneral() {
    const tipo = document.getElementById("tipoBusqueda").value;
    const valor = document.getElementById("inputValor").value.trim();
    const mensajeDiv = document.getElementById("mensajeBusqueda");

      // Limpio mensaje previo
  mensajeDiv.innerHTML = "";

  if (!valor) {
    mensajeDiv.innerHTML = "Ingrese un número.";
    return;
  }

    const campo = tipo === "catastro" ? "catastro" : "cuenta";
    const url = `https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&outputFormat=application/json&CQL_FILTER=${campo}='${valor}'`;

    try {
        const res = await fetch(url);
        const geojson = await res.json();


    if (!geojson.features || geojson.features.length === 0) {
      mensajeDiv.innerHTML = "No se encontró ningún caso que coincida con la búsqueda.";
      if (capaGeojson) {
        map.removeLayer(capaGeojson);
      }
      document.getElementById("catastroInfo").innerHTML = ""; // Limpio info previa
      return;
    }



        if (capaGeojson) map.removeLayer(capaGeojson);

        capaGeojson = L.geoJSON(geojson, {
            style: {
                color: tipo === "catastro" ? "#1F58F3FF" : "#F54291",
                weight: 2,
                fillOpacity: 0.4
            },
            onEachFeature: (feature, layer) => {
                const props = feature.properties;

                const contenido = `
          <h4>Descripción </h4>
          <b>Catastro:</b> ${props.catastro || "-"}<br>
          <b>Cuenta:</b> ${props.cuenta || "-"}<br>
          <b>Tipo:</b> ${props.Tipo || "-"}<br>
          <hr>
          <b>COD_LINK:</b> ${props.COD_LINK || '-'}<br>
          <h5>Detalle de Servicios:</b></h5><br>
          ${descomponerCODLINK(props.COD_LINK)}
        `;

                document.getElementById("catastroInfo").innerHTML = contenido;
                layer.bindPopup(contenido).openPopup();
            }
        }).addTo(map);

        const bounds = capaGeojson.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        }
    } catch (err) {
        console.error(err);
        alert("Error al realizar la búsqueda.");
    }
}
