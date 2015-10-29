angular.module('library')
	.controller('SideNavCtrl', 
		['$scope', '$location', 'Book', 'bookService', 'Author', 'authorService', '$mdSideNav', '$mdUtil', 
		function($scope, $location, Book, bookService, Author, authorService, $mdSideNav, $mdUtil) {
			$scope.books = bookService.getValues();
			$scope.toggleLeft = buildToggler('left');

			function buildToggler(navID) {
				var debounceFn = $mdUtil.debounce(function(){
					$mdSideNav(navID).toggle()
				}, 300);
				return debounceFn;
			}

			$scope.getAllBooks = function(){
				$location.url('/books');
				$scope.closeSideNav();
			};

			$scope.getAllAuthors = function(){
				$location.url('/authors');
				$scope.closeSideNav();
			}

			$scope.closeSideNav = function() {
				$mdSideNav('left').close();
			}

			$scope.getBookDetails = function(id, $event){
				console.log(id);
			}

		}
		]
	)