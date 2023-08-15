/**
 * Created by Jhoy on 24/04/2017.
 */
app.controller('ingCtrl', ($scope, Galaga, $mdToast) => {
    const url = '/ingredientes';
    $scope.addIng = addIng;
    $scope.deleteIng = deleteIng;
    $scope.editIng = editIng;

    Galaga.getAll(url)
      .then((res) => {
          $scope.ingre = res;
      });

    function addIng(i) {
        let data = {
            "Nombre": i
        };
        Galaga.addItem(url, data)
          .then(() => {
              $scope.ingre.push(data);
              $scope.nuevoIng = '';
          });
    }

    function deleteIng(index, id) {
        Galaga.deleteItem(url, id)
          .then(()=> {
              $scope.ingre.splice(index, 1);
          });
    }

    function editIng(i){
        Galaga.updateItem(url, i, i.CodIng)
          .then(()=> {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Información guardada con éxito')
                  .position('top left')
                  .hideDelay(3000)
              );
          });
    }
});