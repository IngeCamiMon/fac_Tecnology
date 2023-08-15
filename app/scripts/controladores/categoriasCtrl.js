app.controller('catCtrl', ($scope, $http, $mdToast) => {
    const url = baseUrl + '/categorias';
    $scope.preload = true;
    $scope.categorias = [];
    $scope.addCat = addCat;
    $scope.deleteCat = deleteCat;
    $scope.editCat = editCat;

    $http.get(url)
      .then((res) => {
          $scope.categorias = res.data;
          $scope.preload = false;
      })
      .catch((err) => {
          console.log(err);
      });

    function addCat(item) {
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
              data.CodCat = $scope.categorias.length + 1;
              $scope.categorias.push(data);
              $scope.nuevoCat = '';
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function deleteCat(index, cat) {
        $http.delete(url + '/' + cat.CodCat)
          .then(() => {
              $scope.categorias.splice(index, 1);
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function editCat(cat) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.put(url + '/' + cat.CodCat, cat, config)
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