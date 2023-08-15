/**
 * Created by Jhoy on 25/04/2017.
 */
app.controller('provCtrl', ($scope, Galaga, $mdToast, $stateParams, $state, filterFilter) => {
    const url = '/proveedores';
    $scope.id = $stateParams.id;
    $scope.proveedor = {};
    $scope.ingre = [];
    $scope.provIngre = [];
    $scope.selectedIngre = null;
    $scope.searchText = null;
    $scope.addProv = addProv;
    $scope.deleteProv = deleteProv;
    $scope.editProv = editProv;
    $scope.querySearch = querySearch;
    $scope.removeIng = removeIng;
    $scope.addIng = addIng;
    $scope.transformChip = transformChip;

    if ($scope.id) {
        Galaga.getItemId(url, $scope.id)
          .then((res) => {
              $scope.proveedor = res[0];
              Galaga.getAll(`${url}/${$scope.id}/ingredientes`)
                .then((res) => {
                    $scope.provIngre = res;
                });
          });
    } else {
        Galaga.getAll(url)
          .then((res) => {
              $scope.proveedores = res;
              angular.forEach($scope.proveedores, (val, key) => {
                 Galaga.getAll(`${url}/${val.CodProv}/ingredientes`)
                   .then((res) => {
                     $scope.proveedores[key].ingredientes = res;
                   });
              });
          });
    }

    Galaga.getAll('/ingredientes')
      .then((res) => {
          $scope.ingre = res;
      });

    function addProv(p) {
        Galaga.addItem(url, p)
          .then((res) => {
              $state.go('editProv', {id: res.data.insertId});
          })
    }

    function deleteProv(index, id) {
        Galaga.deleteItem(url, id)
          .then(() => {
              $scope.proveedores.splice(index, 1);
          });
    }

    function editProv(p) {
        Galaga.updateItem(url, p, p.CodProv)
          .then(() => {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Información guardada con éxito')
                  .position('top left')
                  .hideDelay(3000)
              );
          });
    }

    function querySearch(query) {
        let results = query ? filterFilter($scope.ingre, query) : [];
        return results
    }

    function removeIng(chip) {
        Galaga.deleteItem(`${url}/${$scope.id}/ingredientes`, chip.CodIng)
          .then(() => {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Información eliminada con éxito')
                  .position('top left')
                  .hideDelay(3000)
              );
          });
    }

    function transformChip(chip) {
        if (angular.isObject(chip)) {
            return chip;
        }
        return {Nombre: chip};
    }

    function addIng(chip) {
        if (chip.CodIng) {
            postRel(chip.CodIng);
        } else {
            Galaga.addItem('/ingredientes', chip)
              .then((res) => {
                postRel(res.data.insertId);
              })
        }

        function postRel(idIng) {
            Galaga.addItem(`${url}/${$scope.id}/ingredientes/${idIng}`, {})
              .then(() => {
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Información guardada con éxito')
                      .position('top left')
                      .hideDelay(3000)
                  );
              });
        }
    }
});