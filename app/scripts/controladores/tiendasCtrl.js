app.controller('tiendaCtrl', ($rootScope, $scope, $mdToast, $http, $stateParams, $state) => {
    const url = baseUrl + '/tiendas';
    const id = $stateParams.id;
    let infowindow = new google.maps.InfoWindow();
    let markers = [];
    $scope.tiendas = [];
    $scope.tiendaExist = false;
    $scope.preload = true;
    $scope.addTienda = addTienda;
    $scope.deleteTienda = deleteTienda;
    $scope.editarTienda = editarTienda;

    if (id) {
        $http.get(`${url}/${id}`)
            .then((res) => {
                $scope.tienda = res.data[0];
                $scope.tiendaExist = true;
                $scope.preload = false;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        $scope.tienda = {
            Direccion: null,
            Latitud: null,
            Longitud: null
        };
    }

    $http.get(url)
        .then((res) => {
            $scope.tiendas = res.data;
            $scope.preload = false;
        })
        .catch((err) => {
            console.log(err);
        });

    function addTienda(tienda) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post(url, tienda, config)
            .then((res) => {
                tienda.CodSuc = res.data.insertId;
                $scope.tiendas.push(tienda);
                $state.go('listStore');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteTienda(index, id) {
        $http.delete(`${url}/${id}`)
            .then(() => {
                let idStore = $scope.tiendas[index].CodSuc;
                $scope.tiendas.splice(index, 1);
                removeMarker(idStore);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function editarTienda(tienda) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.put(`${url}/${tienda.CodSuc}`, tienda, config)
            .then(() => {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Información guardada con éxito')
                        .position('top left')
                        .hideDelay(3000)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function removeMarker(id) {
        angular.forEach(markers, (val, key) => {
            if (markers[key].id == id) {
                markers[key].setMap(null);
                markers.splice(key, 1);
            }
        });
    }

    $rootScope.$watch('mapa', () => {
        if ($rootScope.mapa) {
            if ($scope.tiendas.length) {
                markers = [];
                angular.forEach($scope.tiendas, (value) => {
                    let pos = {
                        lat: value.Latitud,
                        lng: value.Longitud
                    };
                    let marker = new google.maps.Marker({
                        position: pos,
                        map: $rootScope.mapa,
                        title: value.Direccion,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                    });

                    marker.id = value.CodSuc;

                    marker.addListener('click', function () {
                        infowindow.close();
                        infowindow.setContent(`Dirección: ${value.Direccion}`);
                        infowindow.open($rootScope.mapa, this);
                        $rootScope.mapa.setCenter(this.getPosition());
                    });
                    markers.push(marker);
                });
            }
        }
    });
});
