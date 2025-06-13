 let capaGeojson = null;



//  async function buscarPorCampo(campo) {
//     const valor = document.getElementById(`input${capitalize(campo)}`).value.trim();
//     if (!valor) {
//       alert(`Ingrese un valor para ${campo}`);
//       return;
//     }

        async function buscarCatastro() {
            const valor = document.getElementById("inputCatastro").value.trim();
            if (!valor) {
                alert("Ingrese un número de catastro.");
                return;
            }

            const url = `https://geocloud.municipalidadsalta.gob.ar/geoserver/public/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=public:0y1_codigolink_masvalorsuelo_ut_v1&outputFormat=application/json&CQL_FILTER=catastro='${valor}'`;

            try {
                const res = await fetch(url);
                const geojson = await res.json();

                if (capaGeojson) map.removeLayer(capaGeojson);

                capaGeojson = L.geoJSON(geojson, {
                    style: {
                        color: "#1F58F3FF",
                        weight: 2,
                        fillOpacity: 0.4
                    },
                    onEachFeature: (feature, layer) => {
                        const props = feature.properties;

                        const contenido = `
            <b>Catastro:</b> ${props.catastro || "-"}<br>
            <b>Cuenta:</b> ${props.cuenta || "-"}<br>
            <b>Tipo:</b> ${props.Tipo || "-"}<br>
            <b>Distrito:</b> ${props.Distrito || "-"}<br>
            <b>Valor suelo:</b> ${props.Valor_Rang || "-"}<br>
            <b>Valor ponderado:</b> ${props.Valorponderado || "-"}
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
                alert("Error al buscar el catastro.");
            }
        }
