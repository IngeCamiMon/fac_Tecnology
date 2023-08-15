app.directive('jhoyMaps', ($rootScope) => {
    let id = 'map-' + Math.floor(Math.random() * 8) + 1;

    function link(scope) {
        let pos = {};
        let map, marker;

        let img = {
            url: location.origin + '/img/002-restaurant.svg',
            size: new google.maps.Size(40, 40)
        };

        navigator.geolocation.getCurrentPosition((position) => {
            if (scope.tiendaExist) {
                pos = {
                    lat: scope.tienda.Latitud,
                    lng: scope.tienda.Longitud
                }
            } else {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }

            updateTienda(pos);
            initMap(pos);
        });

        function newPosition(e) {
            pos = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };

            updateTienda(pos);

            marker.setPosition(pos);
            map.panTo(pos);
        }

        if (scope.button) {
            document.getElementById(scope.button).addEventListener('click', () => {
                navigator.geolocation.getCurrentPosition((position) => {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    updateTienda(pos);

                    marker.setPosition(pos);
                    map.setCenter(pos);
                    map.setZoom(15);
                });
            });
        }

        function initMap(pos) {
            map = new google.maps.Map(document.getElementById(id), {
                zoom: 15,
                center: pos,
                streetViewControl: false,
                fullscreenControl: true
            });

            marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Usted esta aquí',
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            if (scope.newPos) {
                map.addListener('click', newPosition);
            }

            $rootScope.$apply(() => {
                $rootScope.mapa = map;
            });
        }

        function updateTienda(pos) {
            scope.$apply(() => {
                scope.tienda.Latitud = pos.lat;
                scope.tienda.Longitud = pos.lng;
            });
        }
    }

    return {
        restrict: 'EA',
        template: `<div id="${id}" class="jh-map"></div>`,
        scope: {
            button: '@myPos',
            tienda: '=jhModel',
            newPos: '=findPos',
            tiendaExist: '=tiendaExist'
        },
        link
    };
});
