/**
 * Created by Jhoy on 24/04/2017.
 */
app.factory('Galaga', ($http, $rootScope) => {
    $rootScope.preload = false;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function getAll(url) {
        $rootScope.preload = true;
        return $http.get(baseUrl + url)
          .then((res) => {
              $rootScope.preload = false;
              return res.data;
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function getItemId(url, id) {
        $rootScope.preload = true;
        return $http.get(`${baseUrl}${url}/${id}`)
          .then((res) => {
              $rootScope.preload = false;
              return res.data;
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function addItem(url, item) {
        $rootScope.preload = true;
        return $http.post(baseUrl + url, item, config)
          .then((res) => {
              $rootScope.preload = false;
              return res
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function deleteItem(url, id) {
        $rootScope.preload = true;
        return $http.delete(`${baseUrl}${url}/${id}`)
          .then((res) => {
              $rootScope.preload = false;
              return res;
          })
          .catch((err) => {
              console.log(err);
          });
    }

    function updateItem(url, item, id){
        $rootScope.preload = true;
        return $http.put(`${baseUrl}${url}/${id}`, item, config)
          .then((res) => {
              $rootScope.preload = false;
              return res;
          })
          .catch((err) => {
              console.log(err);
          });
    }

    return {
        getAll,
        addItem,
        deleteItem,
        updateItem,
        getItemId
    };
});