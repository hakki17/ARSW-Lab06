// var app = (function () {
    
//     var api = apimock; // Cambiar a: apiclient para usar API real

//     var currentAuthor = null;
//     var currentBlueprints = [];

//     var setAuthor = function (author) {
//         currentAuthor = author;
//     };

//     var updateBlueprintsByAuthor = function (author) {
//         setAuthor(author);

//         // Mostrar loading
//         $('#loadingIndicator').show();
//         $('#authorInfo').hide();
//         $('.blueprints-table').hide();
//         $('#emptyState').hide();

//         // ADAPTADO PARA TU APIMOCK ORIGINAL
//         api.getBlueprintsByAuthor(author, function (data) {
//             $('#loadingIndicator').hide();

//             // Verificar si hay datos
//             if (!data || data.length === 0) {
//                 alert('No blueprints found for author: ' + author);
//                 $('#emptyState').show();
//                 return;
//             }

//             // Transformar datos: crear lista con nombre y número de puntos
//             currentBlueprints = data.map(function (blueprint) {
//                 return {
//                     name: blueprint.name,
//                     points: blueprint.points.length
//                 };
//             });

//             // Limpiar tabla
//             $('#blueprintsTableBody').empty();

//             // Agregar filas a la tabla
//             currentBlueprints.forEach(function (blueprint) {
//                 var row = $('<tr>');
//                 row.append($('<td>').text(blueprint.name));
//                 row.append($('<td>').text(blueprint.points));

//                 var viewBtn = $('<button>')
//                     .addClass('btn-view')
//                     .text('View')
//                     .click(function () {
//                         drawBlueprint(author, blueprint.name);
//                     });

//                 row.append($('<td>').append(viewBtn));
//                 $('#blueprintsTableBody').append(row);
//             });

//             // Calcular total de puntos usando reduce
//             var totalPoints = currentBlueprints.reduce(function (sum, blueprint) {
//                 return sum + blueprint.points;
//             }, 0);

//             // Actualizar UI
//             $('#authorName').text(author);
//             $('#totalPoints').text(totalPoints);
//             $('#authorInfo').show();
//             $('.blueprints-table').show();
//             $('#collectionSubtitle').text('Blueprints by ' + author);
//         });
//     };

//     // Función para dibujar un blueprint en el canvas
//     var drawBlueprint = function (author, blueprintName) {
//         // ADAPTADO PARA TU APIMOCK ORIGINAL
//         api.getBlueprintsByNameAndAuthor(author, blueprintName, function (data) {
//             if (!data) {
//                 alert('Blueprint not found: ' + blueprintName);
//                 return;
//             }

//             var canvas = document.getElementById('blueprintCanvas');
//             var ctx = canvas.getContext('2d');

//             // Limpiar canvas
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             // Actualizar título
//             $('#canvasTitle').text('Blueprint: ' + blueprintName);
//             $('#canvasContainer').show();

//             // Dibujar blueprint
//             if (data.points && data.points.length > 0) {
//                 ctx.strokeStyle = '#667eea';
//                 ctx.lineWidth = 3;
//                 ctx.lineCap = 'round';
//                 ctx.lineJoin = 'round';

//                 ctx.beginPath();
//                 ctx.moveTo(data.points[0].x, data.points[0].y);

//                 for (var i = 1; i < data.points.length; i++) {
//                     ctx.lineTo(data.points[i].x, data.points[i].y);
//                 }

//                 ctx.stroke();

//                 // Dibujar puntos
//                 ctx.fillStyle = '#764ba2';
//                 data.points.forEach(function (point) {
//                     ctx.beginPath();
//                     ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
//                     ctx.fill();
//                 });
//             }
//         });
//     };

//     return {
//         setAuthor: setAuthor,
//         updateBlueprintsByAuthor: updateBlueprintsByAuthor,
//         drawBlueprint: drawBlueprint
//     };
// })();

// // Event listeners
// $(document).ready(function () {
//     $('#getBlueprintsBtn').click(function () {
//         var author = $('#authorInput').val().trim();
//         if (author) {
//             app.updateBlueprintsByAuthor(author);
//         } else {
//             alert('Please enter an author name');
//         }
//     });

//     // Enter key support
//     $('#authorInput').keypress(function (e) {
//         if (e.which === 13) {
//             $('#getBlueprintsBtn').click();
//         }
//     });
// });


var app = (function() {
    
    // ==========================================
    // VARIABLES PRIVADAS (según la instrucción)
    // ==========================================
    
    // 1. El nombre del autor seleccionado
    var currentAuthor = null;
    
    // 2. El listado de nombre y tamaño de los planos
    //    Lista de objetos con: {name: string, points: number}
    var currentBlueprints = [];
    
    
    // ==========================================
    // OPERACIONES PÚBLICAS
    // ==========================================
    
    // Operación pública: cambiar el nombre del autor
    var setAuthor = function(authorName) {
        currentAuthor = authorName;
        console.log("Author changed to: " + currentAuthor);
    };
    
    // Operación pública: obtener el autor actual (opcional pero útil)
    var getAuthor = function() {
        return currentAuthor;
    };
    
    // Operación pública: actualizar listado de blueprints
    var updateBlueprintsByAuthor = function(author) {
        setAuthor(author);  // Actualiza el autor
        
        // Llamar al API
        apimock.getBlueprintsByAuthor(author, function(data) {
            if (!data) {
                alert('Author not found');
                return;
            }
            
            // Transformar los datos usando map()
            // De: [{author, name, points:[{x,y}...]}]
            // A:  [{name, points: number}]
            currentBlueprints = data.map(function(blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length  // Número de puntos
                };
            });
            
            // Aquí agregarías el código para actualizar la tabla
            // y calcular el total...
            
            console.log("Blueprints loaded:", currentBlueprints);
        });
    };
    
    
    // ==========================================
    // EXPONER SOLO LAS FUNCIONES PÚBLICAS
    // ==========================================
    return {
        setAuthor: setAuthor,
        getAuthor: getAuthor,
        updateBlueprintsByAuthor: updateBlueprintsByAuthor
        // currentAuthor y currentBlueprints quedan PRIVADOS
    };
    
})();