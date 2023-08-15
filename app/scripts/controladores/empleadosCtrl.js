/**
 * Created by Jhoy on 23/04/2017.
 */
app.controller('emplCtrl', ($scope, $http, Upload, $state, $stateParams, Galaga) => {
    const url = `${baseUrl}/empleados`;
    $scope.id = $stateParams.id;
    $scope.tempCargo = '';
    $scope.tempSuc = '';
    $scope.cargos = [];
    $scope.tiendas = [];
    $scope.empleados = [];
    $scope.upload = false;
    $scope.progressUpload = 0;
    $scope.addEmpleado = addEmpleado;
    $scope.parseDate = parseDate;
    $scope.setCargo = setCargo;
    $scope.setSuc = setSuc;
    $scope.deleteEmp = deleteEmp;
    $scope.editEmpleado = editEmpleado;
    $scope.empleado = {
        Fecha_ingreso: null
    };

    Galaga.getAll('/cargos')
      .then((res) => {
          $scope.cargos = res;
      });

    Galaga.getAll('/tiendas')
      .then((res) => {
          $scope.tiendas = res;
      });

    if ($scope.id) {
        $http.get(`${url}/${$scope.id}`)
          .then((res) => {
              $scope.empleado = res.data[0];
              $scope.preload = false;
              setCargo($scope.empleado.CodCar);
              setSuc($scope.empleado.CodSuc);
              $scope.empleado.Fecha_ingreso = moment($scope.empleado.Fecha_ingreso).format('YYYY-MM-DD');
              if($scope.empleado.PhotoUrl == 'null'){
                  $scope.empleado.PhotoUrl = null;
              }
          })
          .catch((err) => {
              console.log(err);
          });
    } else {
        Galaga.getAll('/empleados')
          .then((res) => {
            $scope.empleados = res;
          });
    }

    function addEmpleado(data, file) {
        $scope.upload = true;
        Upload.upload({
            url: url,
            file: file,
            data: data
        })
          .then((res) => {
              $scope.upload = false;
              $scope.progressUpload = 0;
              $state.go('listEmp');
          }, (err) => {
              console.log(err);
          }, (evt) => {
              $scope.progressUpload = parseInt(100.0 * evt.loaded / evt.total);
          });
    }

    function editEmpleado(data, file) {
        $scope.upload = true;

        Upload.upload({
            url: `${url}/${$scope.id}`,
            file: file,
            data: data,
            method: 'PUT'
        })
          .then((res) => {
              $scope.upload = false;
              $scope.progressUpload = 0;
              $state.go('listEmp');
          }, (err) => {
              console.log(err);
          }, (evt) => {
              $scope.progressUpload = parseInt(100.0 * evt.loaded / evt.total);
          });
    }

    function deleteEmp(index, id){
        $http.delete(`${url}/${id}`)
          .then(() => {
              $scope.empleados.splice(index, 1);
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function setCargo(cargo) {
        angular.forEach($scope.cargos, (val, key) => {
            if (cargo == val.CodCar) {
                $scope.tempCargo = val.Nombre;
            }
        });
    }

    function setSuc(suc) {
        angular.forEach($scope.tiendas, (val, key) => {
            if (suc == val.CodSuc) {
                $scope.tempSuc = val.Direccion;
            }
        });
    }

    function parseDate(date) {
        $scope.empleado.Fecha_ingreso = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
});