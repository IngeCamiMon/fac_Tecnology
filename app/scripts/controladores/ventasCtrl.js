app.controller('ventasCtrl', ($scope, Galaga, filterFilter, $filter, $mdDialog, $stateParams, $state) => {
    let date = new Date();
    $scope.ventas = [];
    $scope.empleados = [];
    $scope.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    $scope.querySearch = querySearch;
    $scope.queryPro = queryPro;
    $scope.addPro = addPro;
    $scope.remPro = remPro;
    $scope.addVenta = addVenta;
    $scope.calc = calc;
    $scope.categorias = [];
    $scope.venta = {
        productos: []
    };
    $scope.id = $stateParams.id;

    if (!$scope.id) {
        Galaga.getAll('/ventas')
            .then((res) => {
                $scope.ventas = res;
                angular.forEach($scope.ventas, (val, key) => {
                    let model = $scope.ventas[key];
                    model.Fecha = moment($scope.ventas[key].Fecha).format('YYYY-MM-DD');
                    model.total = 0;
                    Galaga.getAll(`/ventas/${$scope.ventas[key].CodVen}/productos`)
                        .then((res) => {
                            model.productos = res;
                            angular.forEach(model.productos, (val, key) => {
                                let modelPro = model.productos[key];
                                if (modelPro.Tipo.data[0] == 0) {
                                    modelPro.precio = modelPro.PrecioEst;
                                } else {
                                    modelPro.precio = modelPro.PrecioAlar;
                                }

                                model.total = model.total + (modelPro.precio * modelPro.Cantidad);
                            });
                            model.consumo = model.total * .08;
                            model.total = model.total - model.consumo;
                        });
                });
            });
    } else {
        Galaga.getItemId(`/ventas`, $scope.id)
            .then((res) => {
                $scope.venta = res[0];
                $scope.venta.Fecha = moment($scope.venta.Fecha).format('YYYY-MM-DD');
                Galaga.getAll(`/ventas/${$scope.venta.CodVen}/productos`)
                    .then((res) => {
                        $scope.venta.productos = res;
                        let model = $scope.venta.productos;
                        $scope.total = 0;
                        angular.forEach(model, (val, key) => {
                            model[key].precio = model[key].Precio;

                            $scope.total = $scope.total + (model[key].precio * model[key].Cantidad);
                        });

                        $scope.consumo = $scope.total * .08;
                        $scope.subtotal = $scope.total - $scope.consumo;
                    });
            });
    }

    Galaga.getAll('/categorias')
        .then((res) => {
            $scope.categorias = res;
        });

    Galaga.getAll('/empleados')
        .then((res) => {
            $scope.empleados = res;
        });
    Galaga.getAll('/productos')
        .then((res) => {
            $scope.productos = res;
        });

    function queryPro(query, cat) {
        let results = query ? filterPro(query, cat) : [];
        return results
    }

    function filterPro(query, cat){
        let n;
        if(cat) {
            n = $filter('filter')($scope.productos, {
                Nombre: query,
                CodCat: cat
            });
        } else {
            n = $filter('filter')($scope.productos, {
                Nombre: query
            });
        }
        return n;
    }

    function querySearch(query) {
        let results = query ? filterText(query) : [];
        return results
    }

    function addVenta(ev) {
        let confirm = $mdDialog.confirm()
            .title('Esta seguro de efectuar la venta?')
            .textContent('Esta acción no puede deshacerse')
            .targetEvent(ev)
            .ok('Efectuar venta')
            .cancel('volver');

        $mdDialog.show(confirm).then(() => {
            buildVenta();
        }, () => {
            return false;
        });
    }

    function buildVenta() {
        let data = {
            Fecha: $scope.date,
            CodEmp: $scope.temp.empleado.CodEmp
        };

        Galaga.addItem('/ventas', data)
            .then((res) => {
                let CodVent = res.data.insertId;
                angular.forEach($scope.venta.productos, (val, key) => {
                    let data = {
                        Cantidad: val.cantidad,
                        CodVen: CodVent,
                        CodPro: val.codpro
                    };

                    Galaga.addItem(`/ventas/${CodVent}/productos`, data)
                        .then((res) => {
                            return true;
                        });
                });
                $state.go('detalleVent', {id: CodVent});
            });
    }

    function filterText(text) {
        let n = $filter('filter')($scope.empleados, {
            Nombres: text
        });
        let a = $filter('filter')($scope.empleados, {
            Apellidos: text
        });
        return n.concat(a);
    }

    function addPro(temp) {
        let data = {
            cantidad: temp.cantidad,
            codpro: temp.producto.CodPro,
            nombre: temp.producto.Nombre,
            precio: temp.producto.Precio
        };

        $scope.venta.productos.push(data);
        calc();
    }

    function remPro(index) {
        $scope.venta.productos.splice(index, 1);
        calc();
    }

    function calc() {
        $scope.total = 0;
        angular.forEach($scope.venta.productos, (val, key) => {
            $scope.total = $scope.total + (val.precio * val.cantidad);
        });

        $scope.consumo = $scope.total * .08;
        $scope.subtotal = $scope.total - $scope.consumo;
        $scope.temp.tipo = 0;
    }
});
