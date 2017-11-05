var app = angular.module('myApp', []);
var currentProduct = 0;

app.controller('mainCtrl', function($scope, $http, $window) {
    var thisCtrl = this;

    $scope.products = [];
    
    this.getData = function () {
        this.route = 'data/products.json';
        $http.get(thisCtrl.route)
        .then(function(data){
            $scope.products = data.data.products;
        });
    }
    this.getData();

    $scope.showProduct = function (id) {
        $window.sessionStorage.setItem("productId",id);
        setTimeout(function() {
            $window.location.href = 'producto.html';
        }, 200);
    }   

})


app.controller('productCtrl', function($scope, $http, $window) {

    var thisCtrl = this;
    $scope.productId = $window.sessionStorage.getItem("productId");
    $scope.products = [];

    this.getData = function () {
        this.route = 'data/products.json';
        $http.get(thisCtrl.route)
        .then(function(data){
            $scope.products = data.data.products;
        });
    }
    this.getData();
});
