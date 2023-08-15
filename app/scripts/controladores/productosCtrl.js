app.controller('prodCtrl', ($scope, $http, $state, $stateParams, Galaga, filterFilter, $mdToast) => {
    const url = baseUrl + '/productos';
    $scope.preload = true;
    $scope.selectedIngre = null;
    $scope.searchText = null;
    $scope.categorias = [];
    $scope.productos = [];
    $scope.proIngre = [];
    $scope.ingre = [];
    $scope.addPro = addPro;
    $scope.deletePro = deletePro;
    $scope.editPro = editPro;
    $scope.querySearch = querySearch;
    $scope.addIng = addIng;
    $scope.removeIng = removeIng;
    let id = $stateParams.id;

    if(id) {
        $http.get(url+ '/' + id)
          .then((res) => {
              $scope.producto = res.data[0];
              Galaga.getAll(`/productos/${id}/ingredientes`)
                .then((res) => {
                    $scope.proIngre = res;
                });
          })
          .catch((err) => {
              console.log(err);
          });
    } else {
        $scope.producto = {};
    }

    $http.get(url)
      .then((res) => {
          $scope.productos = res.data;
          $scope.preload = false;
      })
      .catch((err) => {
          console.log(err);
      });

    $http.get(baseUrl +'/categorias')
      .then((res) => {
          $scope.categorias = res.data;
      })
      .catch((err) => {
          console.log(err);
      });

    Galaga.getAll('/ingredientes')
      .then((res) => {
          $scope.ingre = res;
      });

    function addPro(data) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post(url, data, config)
          .then((res) => {
              $state.go('listPro');
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function deletePro(index, pro) {
        $http.delete(url + '/' + pro.CodPro)
          .then(() => {
              $scope.productos.splice(index, 1);
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function editPro(pro) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.put(url + '/' + pro.CodPro, pro, config)
          .then(() => {
              $state.go('listPro');
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function querySearch(query) {
        let results = query ? filterFilter($scope.ingre, query) : [];
        return results
    }

    function removeIng(chip) {
        Galaga.deleteItem(`/productos/${id}/ingredientes`, chip.CodIng)
          .then(() => {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Información eliminada con éxito')
                  .position('top left')
                  .hideDelay(3000)
              );
          });
    }

    function addIng(chip) {
        Galaga.addItem(`/productos/${id}/ingredientes/${chip.CodIng}`, {})
          .then(() => {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Información guardada con éxito')
                  .position('top left')
                  .hideDelay(3000)
              );
          });
    }
});