function inicializa() {
    construccionLista();
    var zoomI = 14;
    var latI = 19.4304682;
    var lngI = -99.1613719;
    var myOptions = {
        center: new google.maps.LatLng(latI, lngI), zoom: zoomI
    };
    for (var i = 0; i < geeServerDefs.layers.length; i++) {
        geeServerDefs.layers[i].initialState = false;
    }
    gmap = new GFusionMap("map_canvas", geeServerDefs, myOptions);
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
                            "icon": "icons/ico_manzanasU_l.png",
                            "id": 1046,
                            "initialState": false,
                            "isPng": true,
                            "label": "Colonias",
                            "lookAt": "none",
                            "opacity": 1,
                            "requestType": "VectorMapsRaster",
                            "version": 26
                        }
                      ]
                  }
                  
                ]
            }
          ]
      }
     
           
          ]
      }