const app = angular.module('sandwichApp', ['ui.router', 'ngMaterial', 'ngFileUpload']);
const baseUrl = 'http://localhost:5000';
//const baseUrl = 'https://sandwichesusb.herokuapp.com';

app.config(($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../views/home.html'
        })
        .state('categorias', {
            url: '/categorias',
            templateUrl: '../views/listados/listCat.html'
        })
        .state('listPro', {
            url: '/productos',
            templateUrl: '../views/productos/listProd.html'
        })
        .state('addPro', {
            url: '/anadir-producto',
            templateUrl: '../views/productos/addPro.html'
        })
        .state('editPro', {
            url: '/editar-producto/:id',
            templateUrl: '../views/productos/editPro.html'
        })
        .state('listCargos', {
            url: '/cargos',
            templateUrl: '../views/listados/listCar.html'
        })
        .state('listStore', {
            url: '/tiendas',
            templateUrl: '../views/tiendas/listStore.html'
        })
        .state('addStore', {
            url: '/anadir-tienda',
            templateUrl: '../views/tiendas/addStore.html'
        })
        .state('editStore', {
            url: '/editar-tienda/:id',
            templateUrl: '../views/tiendas/addStore.html'
        })
        .state('listEmp', {
            url: '/empleados',
            templateUrl: '../views/empleados/listEmpleados.html'
        })
        .state('addEmp', {
            url: '/anadir-empleado',
            templateUrl: '../views/empleados/addEmpleado.html'
        })
        .state('editEmp', {
            url: '/editar-empleado/:id',
            templateUrl: '../views/empleados/addEmpleado.html'
        })
        .state('listIng', {
            url: '/ingredientes',
            templateUrl: '../views/ingredientes/listIng.html'
        })
        .state('listProv', {
            url: '/proveedores',
            templateUrl: '../views/proveedores/listProv.html'
        })
        .state('addProv', {
            url: '/anadir-proveedor',
            templateUrl: '../views/proveedores/addProv.html'
        })
        .state('editProv', {
            url: '/editar-proveedor/:id',
            templateUrl: '../views/proveedores/addProv.html'
        })
        .state('listVent', {
            url: '/ventas',
            templateUrl: '../views/ventas/listVent.html'
        })
        .state('addVent', {
            url: '/anadir-venta',
            templateUrl: '../views/ventas/addVent.html'
        })
        .state('detalleVent', {
            url: '/detalle-venta/:id',
            templateUrl: '../views/ventas/detalleVent.html'
        });

    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('grey');

    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('YYYY-MM-DD');
    };
});
