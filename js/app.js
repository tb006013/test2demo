angular.module('myApp', [])
.controller('myController', ['$scope','Dinner', function($scope,Dinner){


	Dinner.getList();

	$scope.$on('dinnerList', function(event,data){
		//获取整个的数据 data
		$scope.allData = data;

		//默认显示主菜的数据
		//dinnerList 右侧列表的变量
		$scope.dinnerList = data[0].items;  //菜品数据
		$scope.dinnerTitle = data[0].name;  //右侧的标题
	});

	//菜单点击事件
	$scope.changeNav = function(index){
		//index 当前菜单的索引

		//首先把所有菜单的数据里面的ifChose改为false
		angular.forEach($scope.allData,function(val,key){
			val.ifChose = false;
		});
		//把当前点击的菜单数据ifChose改成true
		$scope.allData[index].ifChose = true;

		//把右侧的菜品数据，切换成当前点击的导航下的菜品数据
		$scope.dinnerList = $scope.allData[index].items;
		$scope.dinnerTitle = $scope.allData[index].name;
	}

}])

.service('Dinner', ['$http','$rootScope', function($http,$rootScope){

	return {

		"getList" : function(){
			$http.get('js/groups.json', {})
			.then(function(response){
				console.log(response.data);
				$rootScope.$broadcast('dinnerList', response.data)
			},function(error){
				console.log(error)
			})
		}
	}
}])