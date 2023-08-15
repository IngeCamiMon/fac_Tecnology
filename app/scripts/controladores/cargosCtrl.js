app.controller('carCtrl', ($scope, $mdToast, $http) => {
    const url = baseUrl + '/cargos';
    $scope.preload = true;
    $scope.cargos = [];
    $scope.addCargo = addCargo;
    $scope.deleteCargo = deleteCargo;
    $scope.editCargo = editCargo;

    $http.get(url)
      .then((res) => {
          $scope.cargos = res.data;
          $scope.preload = false;
      })
      .catch((err) => {
          console.log(err);
      });

    function addCargo(item) {
        let data = {
            "Nombre": item
        };

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post(url, data, config)
          .then((res) => {
              data.CodCar = $scope.cargos.length + 1;
              $scope.cargos.push(data);
              $scope.nuevoCargo = '';
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function deleteCargo(index, car) {
        $http.delete(url + '/' + car.CodCar)
          .then(() => {
              $scope.cargos.splice(index, 1);
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function editCargo(car) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.put(url + '/' + car.CodCar, car, config)
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
});