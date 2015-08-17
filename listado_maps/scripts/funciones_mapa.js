function inicializa() {
    construccionLista();
    var zoomI = 4;
    var latI = 23.84;
    var lngI = -102.18;
    var myOptions = {
        center: new google.maps.LatLng(latI, lngI), zoom: zoomI
    };
    for (var i = 0; i < geeServerDefs.layers.length; i++) {
        geeServerDefs.layers[i].initialState = false;
    }
    // gmap = new GFusionMap("map_canvas", geeServerDefs, myOptions);
    gmap = new google.maps.Map(document.getElementById("map_canvas"), geeServerDefs, myOptions);
}

var codHtml = '';
function construccionLista() {
    codHtml += '<table>';
    crearListado(listadoCapas, 0);
    codHtml += '</table>';
    document.getElementById('divLista').innerHTML = codHtml;
}

function crearListado(lista, num) {
    var tot = 0
    tot += num;
    var isfolder = false;
	var viewIdLayer = '';
    for (var i = 0; i < lista.layers.length; i++) {
        var btn = '<input type="checkBox" onclick="enciendeApagaCapa(\'0-' + lista.layers[i].id + '\');">';
        if (lista.layers[i].isFolder) {
            btn = '<a href="javascript:buscarCapa(null,\'' + lista.layers[i].id + '\');"><img id="img_' + lista.layers[i].id + '" src="img/minus.png"></a>&nbsp;';
            isfolder = true;
        }
		else 
		{
			viewIdLayer = ' ('+lista.layers[i].id+')';
		}
        codHtml += '<tr><td class="' + lista.layers[i].id + '" style="padding-left:' + tot + 'px;">' + btn + lista.layers[i].label + viewIdLayer + '</td></tr>'
        if (isfolder) {
            crearListado(lista.layers[i], tot + 15, lista.layers[i].id);
        }
    }
}

function openCloseLayer(layer, estado) {
    for (var i = 0; i < layer.layers.length; i++) {
        if (layer.layers[i].isFolder) {
            $('.' + layer.layers[i].id).css('display', estado);
            openCloseLayer(layer.layers[i], estado);
            if (estado == '') {
                $('#img_' + layer.layers[i].id).attr('src', 'img/minus.png');
            }
        }
        else {
            $('.' + layer.layers[i].id).css('display', estado);
        }
    }
}

function cambiaEstado(idCapa) {
    var estado = '';
    if ($('#img_' + idCapa).attr('src') == 'img/minus.png') {
        $('#img_' + idCapa).attr('src', 'img/plus.png');
        estado = 'none';
    }
    else {
        $('#img_' + idCapa).attr('src', 'img/minus.png');
    }
    return estado;
}

function enciendeApagaCapa(layerId) {
    if (gmap.isFusionLayerVisible(layerId)) {
        gmap.hideFusionLayer(layerId);
    }
    else {
        gmap.showFusionLayer(layerId);
    }
}

function buscarCapa(listado, idCapa) {
    if (listado == null) { listado = listadoCapas; }
    for (var i = 0; i < listado.layers.length; i++) {
        if (listado.layers[i].id == idCapa) {
            var estado = cambiaEstado(listado.layers[i].id);
            openCloseLayer(listado.layers[i], estado);
        }
        else if (listado.layers[i].isFolder) {
            buscarCapa(listado.layers[i], idCapa);
        }
    }
}

var listadoCapas = {
    "version": "03s12i20u14l",
    "layers": [
      {
          "id": "01",
          "label": "Imágenes del territorio",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "icon": "icons/773_l.png",
                "id": 1008,
                "initialState": true,
                "isPng": false,
                "label": "Imagery",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "ImageryMaps",
                "version": 4
            }
          ]
      },
      {
          "id": "02",
          "label": "División geográfica",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "id": "03",
                "label": "División geoestadística",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/ico_divEstatal_l.png",
                      "id": 1009,
                      "initialState": true,
                      "isPng": true,
                      "label": "Estatal",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 29
                  },
                  {
                      "icon": "icons/ico_divMunicipal_l.png",
                      "id": 1015,
                      "initialState": true,
                      "isPng": true,
                      "label": "Municipal",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 28
                  }
                ]
            },
            {
                "id": "04",
                "label": "Localidades",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "id": "05",
                      "label": "Urbanas",
                      "isFolder": true,
                      "state": false,
                      "layers": [
                        {
                            "icon": "icons/ico_areasU_l.png",
                            "id": 1014,
                            "initialState": true,
                            "isPng": true,
                            "label": "áreas urbanas",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 28
                        },
                        {
                            "icon": "icons/ico_ageb_l.png",
                            "id": 1045,
                            "initialState": false,
                            "isPng": true,
                            "label": "AGEB",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 26
                        },
                        {
                            "icon": "icons/ico_manzanasU_l.png",
                            "id": 1046,
                            "initialState": false,
                            "isPng": true,
                            "label": "Colonias",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 26
                        },
                        {
                            "icon": "icons/ico_colonias_l.png",
                            "id": 1013,
                            "initialState": false,
                            "isPng": true,
                            "label": "Manzanas",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/ico_vialidades_l.png",
                            "id": 1010,
                            "initialState": true,
                            "isPng": true,
                            "label": "Vialidades",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 26
                        },
                        {
                            "icon": "icons/ico_numExterior_l.png",
                            "id": 1047,
                            "initialState": false,
                            "isPng": true,
                            "label": "Números exteriores",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 23
                        },
                        {
                            "icon": "icons/ico_agebR_l.png",
                            "id": 1022,
                            "initialState": false,
                            "isPng": true,
                            "label": "áreas verdes / Parques",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/773_l.png",
                            "id": 1021,
                            "initialState": false,
                            "isPng": true,
                            "label": "Servicios",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        }
                      ]
                  },
                  {
                      "id": "06",
                      "label": "Rurales",
                      "isFolder": true,
                      "state": false,
                      "layers": [
                        {
                            "icon": "icons/ico_areasR_l.png",
                            "id": 1048,
                            "initialState": false,
                            "isPng": true,
                            "label": "áreas rurales",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/ico_colonias_l.png",
                            "id": 1050,
                            "initialState": false,
                            "isPng": true,
                            "label": "Manzanas.",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/ico_vialidades_l.png",
                            "id": 1049,
                            "initialState": false,
                            "isPng": true,
                            "label": "Vialidades.",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/ico_numExterior_l.png",
                            "id": 1051,
                            "initialState": false,
                            "isPng": true,
                            "label": "Números exteriores.",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 23
                        },
                        {
                            "icon": "icons/773_l.png",
                            "id": 1052,
                            "initialState": false,
                            "isPng": true,
                            "label": "Servicios.",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 25
                        },
                        {
                            "icon": "icons/773_l.png",
                            "id": 1053,
                            "initialState": false,
                            "isPng": true,
                            "label": "áreas rurales no amanzanadas",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 28
                        }
                      ]
                  }
                ]
            }
          ]
      },
      {
          "id": "07",
          "label": "Topografía",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "id": "08",
                "label": "Hidrografía",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/gpo_rios_l.png",
                      "id": 1055,
                      "initialState": false,
                      "isPng": true,
                      "label": "Corrientes de agua",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 28
                  },
                  {
                      "icon": "icons/gpo_cuerposAgua_l.png",
                      "id": 1056,
                      "initialState": false,
                      "isPng": true,
                      "label": "Cuerpos de agua",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  },
                  {
                      "icon": "icons/gpo_presas_l.png",
                      "id": 1054,
                      "initialState": false,
                      "isPng": true,
                      "label": "Presas",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  }
                ]
            },
            {
                "id": "09",
                "label": "Vías de comunicación",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/airports_new_l.png",
                      "id": 1057,
                      "initialState": false,
                      "isPng": true,
                      "label": "Aeropuertos",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  },
                  {
                      "icon": "icons/ico_carrCuota_l.png",
                      "id": 1019,
                      "initialState": true,
                      "isPng": true,
                      "label": "Carreteras",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 23
                  },
                  {
                      "icon": "icons/ico_terraceria_l.png",
                      "id": 1058,
                      "initialState": true,
                      "isPng": true,
                      "label": "Terracerías",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 23
                  },
                  {
                      "icon": "icons/ico_caminos_l.png",
                      "id": 1059,
                      "initialState": true,
                      "isPng": true,
                      "label": "Caminos rurales",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 26
                  },
                  {
                      "icon": "icons/INEGI_viaferrea_l.png",
                      "id": 1061,
                      "initialState": true,
                      "isPng": true,
                      "label": "Vías férreas",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 29
                  }
                ]
            },
            {
                "id": "10",
                "label": "Datos de relieve",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/ico_curvasnivel_l.png",
                      "id": 1060,
                      "initialState": false,
                      "isPng": true,
                      "label": "Curvas de nivel",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  }
                ]
            }
          ]
      },
      {
          "id": "11",
          "label": "Nombres geográficos",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "icon": "icons/773_l.png",
                "id": 1062,
                "initialState": false,
                "isPng": true,
                "label": "Orografía",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 25
            },
            {
                "icon": "icons/773_l.png",
                "id": 1063,
                "initialState": false,
                "isPng": true,
                "label": "Formas litorales",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 23
            },
            {
                "icon": "icons/773_l.png",
                "id": 1064,
                "initialState": false,
                "isPng": true,
                "label": "áreas naturales y culturales",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 25
            }
          ]
      },
      {
          "id": "12",
          "label": "Sitios de interés",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "icon": "icons/773_l.png",
                "id": 1065,
                "initialState": false,
                "isPng": true,
                "label": "Zonas arqueológicas",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 23
            },
            {
                "icon": "icons/ico_rasgosculturales2_l.png",
                "id": 1066,
                "initialState": false,
                "isPng": true,
                "label": "Zonas culturales",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 23
            },
            {
                "icon": "icons/ico_zonasprotegidas_l.png",
                "id": 1067,
                "initialState": false,
                "isPng": true,
                "label": "Zonas protegidas",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 23
            },
            {
                "icon": "icons/INEGI_volcan_2_l.png",
                "id": 1068,
                "initialState": false,
                "isPng": true,
                "label": "Volcanes",
                "lookAt": "none",
                "opacity": 1,
                "requestType": "VectorMapsRaster",
                "version": 23
            }
          ]
      },
      {
          "id": "13",
          "label": "Recursos naturales",
          "isFolder": true,
          "state": false,
          "layers": [
            {
                "id": "14",
                "label": "Uso de suelo y vegetación",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/773_l.png",
                      "id": 1069,
                      "initialState": false,
                      "isPng": true,
                      "label": "Uso del suelo y vegetación",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  }
                ]
            },
            {
                "id": "15",
                "label": "Clima",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/ico_precip_l.png",
                      "id": 1070,
                      "initialState": false,
                      "isPng": true,
                      "label": "Precipitación media anual",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  },
                  {
                      "icon": "icons/ico_temp_l.png",
                      "id": 1071,
                      "initialState": false,
                      "isPng": true,
                      "label": "Temperatura media anual",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  },
                  {
                      "icon": "icons/ico_clima_l.png",
                      "id": 1072,
                      "initialState": false,
                      "isPng": true,
                      "label": "Unidades climáticas",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 13
                  }
                ]
            },
            {
                "id": "16",
                "label": "Geología",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/ico_fallasfract_l.png",
                      "id": 1073,
                      "initialState": false,
                      "isPng": true,
                      "label": "Fallas y fracturas",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 24
                  }
                ]
            },
            {
                "id": "17",
                "label": "Hidrología",
                "isFolder": true,
                "state": false,
                "layers": [
                  {
                      "icon": "icons/ico_cuenca_l.png",
                      "id": 1074,
                      "initialState": false,
                      "isPng": true,
                      "label": "División hidrológica",
                      "lookAt": "none",
                      "opacity": 1,
                      "requestType": "VectorMapsRaster",
                      "version": 25
                  }
                ]
            }
          ]
      }
    ]
}