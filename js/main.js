/**
 * Created by hp on 25.03.2017.
 */

'use strict'

const axis = rotate(new Vector3D(0, 0, 1), Math.PI / 6, new Vector3D(0, 1, 0));
const width = 800
const height = 700
const sqrtphi = 1.63600982476
const halfphi = 0.30901699437
const polygon = [
    new Vector3D(1, 1, 1),
    new Vector3D(-1, 1, 1),
    new Vector3D(1, -1, 1),
    new Vector3D(-1, -1, 1),
    new Vector3D(1, 1, -1),
    new Vector3D(-1, 1, -1),
    new Vector3D(1, -1, -1),
    new Vector3D(-1, -1, -1),
    new Vector3D(halfphi, sqrtphi, 0),
    new Vector3D(-halfphi, sqrtphi, 0),
    new Vector3D(halfphi, -sqrtphi, 0),
    new Vector3D(-halfphi, -sqrtphi, 0),
    new Vector3D(0, halfphi, sqrtphi),
    new Vector3D(0, -halfphi, sqrtphi),
    new Vector3D(0, halfphi, -sqrtphi),
    new Vector3D(0, -halfphi, -sqrtphi),
    new Vector3D(sqrtphi, 0, halfphi),
    new Vector3D(sqrtphi, 0, -halfphi),
    new Vector3D(-sqrtphi, 0, halfphi),
    new Vector3D(-sqrtphi, 0, -halfphi),
]
const lines = [
    [8, 9], [10, 11],
    [12, 13], [14, 15],
    [16, 17], [18, 19],
    [8, 0], [8, 4],
    [9, 1], [9, 5],
    [10, 2], [10, 6],
    [11, 3], [11, 7],
    [12, 0], [12, 1],
    [13, 2], [13, 3],
    [14, 4], [14, 5],
    [15, 6], [15, 7],
    [16, 0], [16, 2],
    [17, 4], [17, 6],
    [18, 1], [18, 3],
    [19, 5], [19, 7]
]

function testVector3D() {
    var vect1 = new Vector3D(0, 0, 1);
    var vect2 = new Vector3D(0, 1, 0);
    var str = '';
    str += vect1.multiple(3).print();
    str += '\n';
    str += vect1.negate().print();
    str += '\n';
    str += vect1.add(vect2).print();
    str += '\n';
    str += vect1.scalar_multiple(vect2);
    str += '\n';
    str += vect1.vector_multiple(vect2).print();
    str += '\n';
    str += vect1.scalar_multiple(vect1);
    str += '\n';
    str += vect1.vector_multiple(vect1).print();
    str += '\n';
    str += new Vector3D(3, 1, -7).vector_multiple(new Vector3D(-1, 7, 1)).print();
    alert(str);
}

function testQuaternion() {
    var quat1 = new Quaternion(1, new Vector3D(3, 1, -1));
    var quat2 = new Quaternion(2, new Vector3D(-1, 7, 1));
    console.log(quat1.multiple(quat2).print());
}

function testRotate() {
    var vect = new Vector3D(1, 1, 0);
    var axis = new Vector3D(0, 1, 0);
    var str = rotate(vect, Math.PI / 2, axis).print();
    console.log(str);
}

function getCoords(vect) {
    var xcoef = 175;
    var ycoef = -125;
    return [xcoef * vect.x, ycoef * vect.y];
}

function render(angle) {
    const canvas = document.getElementById("quatdemo")
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.beginPath();
    context.moveTo(0, 0);
    context.fillText('0', -5, 0);
    context.fillText('0', width / 2, height / 2);
    var coords = getCoords(rotate(new Vector3D(0, 0, 1), angle, axis));
    context.moveTo(0, 0);
    context.lineTo(coords[0], coords[1]);
    context.fillText('Z', coords[0], coords[1] + 5);
    coords = getCoords(rotate(new Vector3D(0, 1, 0), angle, axis));
    context.moveTo(0, 0);
    context.lineTo(coords[0], coords[1]);
    context.fillText('Y', coords[0], coords[1] + 5);
    coords = getCoords(rotate(new Vector3D(1, 0, 0), angle, axis));
    context.moveTo(0, 0);
    context.lineTo(coords[0], coords[1]);
    context.fillText('X', coords[0], coords[1] + 5);
    coords = getCoords(axis);
    context.moveTo(0, 0);
    context.lineTo(coords[0], coords[1]);
    context.fillText('A', coords[0], coords[1] + 5);
    lines.forEach(function (entry) {
        var coords1 = getCoords(rotate(polygon[entry[0]], angle, axis))
        var coords2 = getCoords(rotate(polygon[entry[1]], angle, axis))
        context.moveTo(coords1[0], coords1[1]);
        context.lineTo(coords2[0], coords2[1]);
    });
    context.stroke();
    context.translate(-width/2, -height/2);
}

window.onload = function() {
    var angle = 0;
    var fps = 50;
    setInterval(function () {
        render(angle)
        angle += Math.PI/100;
    }, 1000/fps);
}