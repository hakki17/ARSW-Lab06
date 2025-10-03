# ARSW-Lab06

**Escuela Colombiana de Ingeniería Julio Garavito**  
**Arquiecturas de Software - ARSW**  
**Laboratorio Número 6**

**Miembros:**
- Juan Esteban Medina Rivas
- María Paula Sánchez Macías

---

**Estructura de directorios final del proyecto**

<div align="center"><img src="img/7. estructura.png"></div>

---
## Parte I - Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3.

Requerimientos de la página web:

* Al oprimir 'Get blueprints', consulta los planos del usuario dado en el formulario. Por ahora, si la consulta genera un error, sencillamente no se mostrará nada.
* Al hacer una consulta exitosa, se debe mostrar un mensaje que incluya el nombre del autor, y una tabla con: el nombre de cada plano de autor, el número de puntos del mismo, y un botón para abrirlo. Al final, se debe mostrar el total de puntos de todos los planos (suponga, por ejemplo, que la aplicación tienen un modelo de pago que requiere dicha información).
* Al seleccionar uno de los planos, se debe mostrar el dibujo del mismo. Por ahora, el dibujo será simplemente una secuencia de segmentos de recta realizada en el mismo orden en el que vengan los puntos.


## Ajustes Backend

1. Debemos trabajar sobre la base del proyecto anterior [ARSW-Lab05](github.com/JuanEstebanMedina/ARSW-Lab05) (en el que se hizo el API REST de los blueprints).
2. Incluir dentro de las dependencias de Maven los 'webjars' de jQuery y Bootstrap (esto permite tener localmente dichas librerías de JavaScript al momento de construír el proyecto):

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
        <version>0.52</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                

    ```

## Front-End - Vistas

1. Creamos el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:  

    ```
    src/main/resources/static
    ```

<br>

2. Creamos la página index.html, sólo con lo básico: título, campo para la captura del autor, botón de 'Get blueprints', campo \<div> donde se mostrará el nombre del autor seleccionado, [la tabla HTML](https://www.w3schools.com/html/html_tables.asp) donde se mostrará el listado de planos (con sólo los encabezados), y un campo \<div> donde se mostrará el total de puntos de los planos del autor.

<div align="center"><img src="img/0. indexHtml.png"></div>

<br>

3. En el elemento \<head\> de la página, agregamos las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap. 
    ```html
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blueprints</title>

        <!-- jQuery y Bootstrap -->
        <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```

<br>

4. Ejecutar la aplicación con *mvn spring-boot:run*, y revisar:

    1. Que la página sea accesible desde:
    
        ```
        http://localhost:8080/index.html
        ```
    2. Al abrir la consola de desarrollador del navegador, NO deben aparecer mensajes de error 404 (es decir, que las librerías de JavaScript se cargaron correctamente).

<img src="img/2. indexURL.png">

## Front-End - Lógica

1. Continuando con la lógica de la aplicación web, creamos un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tuvimos en cuenta el [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/), y creamos un módulo en la ruta static/js/app.js.

2. Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.

    ```javascript
    {author:"maryweyland","points":[{"x":100,"y": 200},{"x":200,"y":200},{"x":200,"y":100},{"x":100,"y":100},{"x":150,"y":50},{"x":200,"y":100},
            {"x":100,"y":200},{"x":100,"y":100},{"x":200,"y":200}],"name":"casitaHecha"}
    ```

**Lista Mockeada**
<div align="center"><img src="img/3. puntosQuemados.png"></div>

<br>

3. Agregamos la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```

<br>

4. Luego hicimos el módulo antes creado mantenga de forma privada:
    * El nombre del autor seleccionado.
    * El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.

    Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.

    ```javascript
    // punto 4
    var currentAuthor = null;

    // punto 4
    var currentBlueprints = [];

    // punto 4
    var setAuthor = function (authorName) {
        currentAuthor = authorName;
        console.log("Author changed to: " + currentAuthor);
    };

    // punto 4
    var getAuthor = function () {
        return currentAuthor;
    };
    ```

<br>

5. agregamos al módulo 'app.js' una operación pública que permite actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' que se nos dió, enviándole como _callback_ una función que:

    * Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.

    * Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento \<tr\> (con los respectvos \<td\>) a la tabla creada en el punto 4. Tenga en cuenta los [selectores de jQuery](https://www.w3schools.com/JQuery/jquery_ref_selectors.asp) y [los tutoriales disponibles en línea](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-append-and-remove-table-row-dynamically). Por ahora no agregue botones a las filas generadas.

    * Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.

    ```javascript
    var updateBlueprintsByAuthor = function (author) {
        setAuthor(author);

        apimock.getBlueprintsByAuthor(author, function (data) {
            if (!data) {
                alert('Author not found');
                return;
            }

            // punto 5.1
            currentBlueprints = data.map(function (blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length
                };
            });

            $('#authorName').text(author);
            $('#blueprintsTableBody').empty();


            // punto 5.2
            currentBlueprints.map(function (blueprint) {
                var row = $('<tr>');
                row.append($('<td>').text(blueprint.name));
                row.append($('<td>').text(blueprint.points));

                $('#blueprintsTableBody').append(row);
            });

            // punto 5.3
            const totalPoints = currentBlueprints.reduce((acumulador, blueprint) => {
                return acumulador + blueprint.points;
            }, 0);

            $('#totalPoints').text(totalPoints);

            console.log("Blueprints loaded:", currentBlueprints);
          });
    };
    ```

<br>

6. Asocie la operación antes creada (la de *app.js*) al evento 'on-click' del botón de consulta de la página.

    ```javascript
    // punto 6
    $(document).ready(function () {
        $('#getBlueprintsBtn').click(function () {
            var author = $('#authorInput').val().trim();
            if (author) {
                app.updateBlueprintsByAuthor(author);
            } else {
                alert('Please enter an author name');
            }
        });

        $('#authorInput').keypress(function (e) {
            if (e.which === 13) {
                $('#getBlueprintsBtn').click();
           }
        });
    });
    ```

<br>

7. Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación *HTML5/JavaScript*, y rectifique que al ingresar un usuario existente, se cargue el listado del mismo.

<div align="center"><img src="img/4. listarPlanos.png"></div> 

<br>

8. A la página, agregamos un [elemento de tipo Canvas](https://www.w3schools.com/html/html5_canvas.asp), con su respectivo identificador. Hicimos que sus dimensiones no sean demasiado grandes para dejar espacio para los otros componentes, pero lo suficiente para poder 'dibujar' los planos.

    ```html
    <canvas id="blueprintCanvas" width="800" height="600" style="border: 1px solid #ccc;"></canvas>
    ```

<br>

9. Al módulo app.js agregamos una operación que, dado el nombre de un autor, y el nombre de uno de sus planos dados como parámetros, haciendo uso del método *getBlueprintsByNameAndAuthor* de *apimock.js* y de una función _callback_:
    * Consulte los puntos del plano correspondiente, y con los mismos dibuje consectivamente segmentos de recta, haciendo uso [de los elementos HTML5 (Canvas, 2DContext, etc) disponibles](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path)* Actualice con jQuery el campo \<div> donde se muestra el nombre del plano que se está dibujando.

    ```javascript
    // punto 9
    var canvasBlueprint = function (author, blueprintName) {
        apimock.getBlueprintsByNameAndAuthor(author, blueprintName, function (data) {
            if (!data || !data.points || data.points.length === 0) {
                alert('Blueprint not found or has no points');
                return;
            }

            var canvas = document.getElementById('blueprintCanvas');
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            $('#currentBlueprintName').text(blueprintName);

            $('#canvasContainer').show();

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(data.points[0].x, data.points[0].y);
            for (var i = 1; i < data.points.length; i++) {
                ctx.lineTo(data.points[i].x, data.points[i].y);
            }
            ctx.stroke();

            ctx.fillStyle = '#a5269fff';

            data.points.forEach(function (point) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        });
    }
    ```

<br>

10. Verificamos que la aplicación ahora, además de mostrar el listado de los planos de un autor, permita seleccionar uno de éstos y graficarlo. Para esto, hicimos que en las filas generadas para el punto 5 incluyan en la última columna un botón con su evento de clic asociado a la operación hecha anteriormente (enviándo como parámetro los nombres correspondientes).

    ```javascript
    currentBlueprints.map(function (blueprint) {
        var row = $('<tr>');
        row.append($('<td>').text(blueprint.name));
        row.append($('<td>').text(blueprint.points));

        var openButton = $('<button>')
            .addClass('btn btn-sm btn-default')
            .text('Open')
            .click(function () {
                canvasBlueprint(author, blueprint.name);
            });

        row.append($('<td>').append(openButton));

        $('#blueprintsTableBody').append(row);
    });
    ```

<br>

11. Verificamos que la aplicación ahora permita consultar los planos de un auto y graficar aquel que se seleccione.

<div align="center"><img src="img/5. canvasBlueprints.png"></div>

<br>

12. Una vez funcione la aplicación (sólo front-end), hicimos un módulo (llámelo 'apiclient') que tenga las mismas operaciones del 'apimock', pero que para las mismas use datos reales consultados del API REST. Para lo anterior revise [cómo hacer peticiones GET con jQuery](https://api.jquery.com/jquery.get/), y cómo se maneja el esquema de _callbacks_ en este contexto.

    ```javascript
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
    ```

<br>

13. Modifique el código de app.js de manera que sea posible cambiar entre el 'apimock' y el 'apiclient' con sólo una línea de código.

    - En *api.js*
    ```javascript
    // punto 13
    // var api = apimock;
    var api = apiclient;
    ```

    - En *index.html*
    ```html
    <script src="js/apiclient.js"></script>
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```

<br>

14. Revise la [documentación y ejemplos de los estilos de Bootstrap](https://v4-alpha.getbootstrap.com/examples/) (ya incluidos en el ejercicio), agregue los elementos necesarios a la página para que sea más vistosa, y más cercana al mock dado al inicio del enunciado.

<div align="center"><img src="img/6. mockFinal.png"></div>