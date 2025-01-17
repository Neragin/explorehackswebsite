 
import * as paper from 'paper';
 // text test
export function run2() {
    var project = paper.setup(canvas);

    var text = new paper.PointText(paper.view.center);
    text.content = 'FSSIUSF';
    text.style = {
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: 20,
    fillColor: 'white',
    justification: 'center'
   };
   
    // The amount of symbol we want to place;
    var count = 150;
   
    // Create a symbol, which we will use to place instances of later:
    var path = new paper.Path.Circle({
        center: new paper.Point(0, 0),
        radius: 5,
        fillColor: 'white',
        strokeColor: 'black'
    });
   
    var symbol = new paper.SymbolDefinition(path);
   
    // Place the instances of the symbol:
    for (var i = 0; i < count; i++) {
        // The center position is a random point in the view:
        var center = paper.Point.random() * paper.view.size;
        var placed = symbol.place(center);
        var scale = (i + 1) / count;
        placed.scale(scale);
        placed.data.vector = new paper.Point({
            angle: Math.random() * 360,
            length : scale * Math.random() / 5
        });
    }
   
    var vector = new paper.Point({
        angle: 45,
        length: 0
    });
   
    var mouseVector = vector.clone();
   
    // function onMouseMove(event) {
    //     mouseVector = paper.view.center - event.point;
    // }

    paper.view.onMouseMove = function(event) {
        mouseVector = paper.view.center - event.point;
    }
   
    // The onFrame function is called up to 60 times a second:
    paper.view.onFrame = function(event) {
        vector = vector + (mouseVector - vector) / 30;
   
        // Run through the active layer's children list and change
        // the position of the placed symbols:
        for (var i = 0; i < count; i++) {
            var item = project.activeLayer.children[i];
            var size = item.bounds.size;
            var length = vector.length / 10 * size.width / 10;
            item.position += vector.normalize(length) + item.data.vector;
            keepInView(item);
        }
    }
    // function onFrame(event) {
    //     vector = vector + (mouseVector - vector) / 30;
   
    //     // Run through the active layer's children list and change
    //     // the position of the placed symbols:
    //     for (var i = 0; i < count; i++) {
    //         var item = paper.project.activeLayer.children[i];
    //         var size = item.bounds.size;
    //         var length = vector.length / 10 * size.width / 10;
    //         item.position += vector.normalize(length) + item.data.vector;
    //         keepInView(item);
    //     }
    // }
   
    function keepInView(item) {
        var position = item.position;
        var itemBounds = item.bounds;
        var bounds = paper.view.bounds;
        if (itemBounds.left > bounds.width) {
            position.x = -item.bounds.width;
        }
   
        if (position.x < -itemBounds.width) {
            position.x = bounds.width + itemBounds.width;
        }
   
        if (itemBounds.top > paper.view.size.height) {
            position.y = -itemBounds.height;
        }
   
        if (position.y < -itemBounds.height) {
            position.y = bounds.height  + itemBounds.height / 2;
        }
    }
   
    		paper.view.draw();

 }
