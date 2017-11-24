var app = angular.module('myApp', []);

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
        $window.localStorage.setItem("productId",id);
        setTimeout(function() {
            $window.location.href = 'producto.html';
        }, 200);
    }   

})


app.controller('productCtrl', function($scope, $http, $window, $filter,  $timeout) {
    var thisCtrl = this;
    $scope.products = [];
    $scope.productId = $window.localStorage.getItem("productId");
    $scope.adding = false;
    
    this.getData = function () {
        this.route = 'data/products.json';
        $http.get(thisCtrl.route)
        .then(function(data){
            $scope.products = data.data.products;
        });
    }
    this.getData();
    
    /* guardar data de pedido */
    if($window.localStorage.getItem("cartList")){
        var cartProducts = JSON.parse($window.localStorage.cartList);
    }else{
        var cartProducts = [];
    }

    var currentProduct = {};
    var exist = false;    
    var order = new Object();
    var replaceSizesvar = false;

    $scope.addCart = function(id, size, qty){
        $scope.adding = true;
        $timeout(function(){
            $scope.adding = false;
        }, 1500);
        /**
         * Cuando se recarga la pagina se pierde el id del producto
         */
        if(currentProduct.id === undefined){
            currentProduct.id === $window.localStorage.getItem("productId");
        }else {
            currentProduct.id = id
        }
        currentProduct = $filter('filter')($scope.products, {id: id })[0];
        order = {size: size, quantity: qty};
        $scope.addProduct(id, size);
    }
    
    $scope.addProduct = function(id, size){
        // ver si el producto ya esta incluido en el carrito
        replaceSizesvar = false;
        for (var i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].id == id) {
                exist = true;   
                currentProduct.order = cartProducts[i].order;


                $scope.replaceSizes();
                if(!replaceSizesvar){
                    currentProduct.order.push(order);
                }

                cartProducts[i] = currentProduct;
                break;
            }
        }
        if(!exist){
            // agregar productos al carrito
            $scope.addSizes();
            cartProducts[cartProducts.length] = currentProduct;   
        }
        $scope.$emit('cartListEvent', cartProducts)
        $window.localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }

    $scope.addSizes = function(){
        // agregar a la tabla el producto
        if(currentProduct.order === undefined){
            currentProduct.order = new Array();
            currentProduct.order = [order];

        } else {
             currentProduct.order[currentProduct.order.length] = order;
        }

        return currentProduct.order;
    };   

    $scope.replaceSizes = function(){
        for(var i = 0; i < currentProduct.order.length; i++){
            if(currentProduct.order[i].size === order.size){
                currentProduct.order[i].quantity = order.quantity;
                replaceSizesvar = true
                break;
            }       
        }
    }

});




app.controller('cartCtrl', function($scope, $http, $window, $rootScope, $timeout) {
    $scope.total = 0;    
    $scope.cartactive = false;
    var cartList = $window.localStorage.getItem("cartList");
    if(cartList){
        $scope.cartList = JSON.parse($window.localStorage.cartList);
    }

    $scope.getTotal = function(){
        if(!cartList){
            $scope.total = 0;
        }else{
            $scope.total = 0;
            var totalProducts = 0;
            var priceProduct = 0;
            for(var i = 0; i < $scope.cartList.length; i++){
                priceProduct = $scope.cartList[i].price;
                for(var j = 0; j < $scope.cartList[i].order.length; j++){
                    totalProducts += $scope.cartList[i].order[j].quantity;
                }
            }
            $scope.total = totalProducts * priceProduct;
        }
    }
    $scope.getTotal();

    $scope.changeText = function(message) {
        $scope.cartList = message;
        cartList = message;
        $scope.cartactive = true;
        // $timeout($scope.cartactive = false, 500);
        $timeout(function(){
            $scope.cartactive = false
        }, 1000);
        // $scope.getTotal();
    };

    $rootScope.$on('cartListEvent', function(event, message) {
        $scope.changeText(message);
        $scope.getTotal();
    });
});