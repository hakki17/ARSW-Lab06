var apiclient = (function() {
    var baseUrl = "http://localhost:8080/blueprints";

    return {
        getBlueprintsByAuthor: function(author, callback) {
            $.ajax({
                url: baseUrl + "/" + author,
                method: 'GET',
                success: function(data) {
                    callback(null, data);
                },
                error: function(xhr, status, error) {
                    callback({
                        message: "Error fetching blueprints: " + error,
                        status: xhr.status
                    }, null);
                }
            });
        },

        getBlueprintsByNameAndAuthor: function(author, blueprintName, callback) {
            $.ajax({
                url: baseUrl + "/" + author + "/" + blueprintName,
                method: 'GET',
                success: function(data) {
                    callback(null, data);
                },
                error: function(xhr, status, error) {
                    callback({
                        message: "Error fetching blueprint: " + error,
                        status: xhr.status
                    }, null);
                }
            });
        }
    };
})();