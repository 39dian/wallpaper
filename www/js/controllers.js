angular.module('myApp.controllers', [])

.controller('HomeCtrl', function($scope,$http) {


      $http.get('http://sys.wallinter.com/webservice/product/listPaged/0000189/5/1')
          .success(function(data){
            $scope.hotPaperList=data.productList;
          });
    })


.controller('SearchProductCtrl', ['$scope','$http','$ionicLoading','ProductService', function($scope,$http,$ionicLoading,ProductService){
        $scope.pageNo=1;
        $scope.pageSize=15;
        $scope.productList=[];
        $scope.ifLoadMore=false;
        //刷新页面
        $scope.doRefreshProduct=function(){
            $ionicLoading.show({
                animation: 'fade-in',
                duration:3000
            });
            ProductService.getAllProductByName($scope.pageNo,$scope.pageSize).then(function(data){
                $scope.productList =data;
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');    //隐藏刷新提示
                $scope.pageNo=1;
                $scope.ifLoadMore=true;
            },function(error){
                //获取数据失败不做任何操作
            });
        };
        //加载更多
        $scope.loadMoreProduct= function () {
            ProductService.getAllProductByName($scope.pageNo+1,$scope.pageSize).then(function(data){
                $scope.productList =$scope.productList.concat(data);
                $scope.pageNo+=1;
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
        };
        $scope.doRefreshProduct($scope.pageNo,$scope.pageSize);          //首次进入执行刷新操作
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CartCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
