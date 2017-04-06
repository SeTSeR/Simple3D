/**
 * Created by hp on 25.03.2017.
 */
'use strict'

function Vector3D(x, y, z) {
    this.constructor(x, y, z);
}

Vector3D.prototype = {
    x: 0.0,
    y: 0.0,
    z: 0.0,

    constructor: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },

    length: function() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    },

    negate: function() {
        return new Vector3D(-this.x, -this.y, -this.z);
    },

    add: function(second) {
        return new Vector3D(this.x + second.x, this.y + second.y, this.z + second.z);
    },

    multiple: function(coef) {
        return new Vector3D(coef*this.x, coef*this.y, coef*this.z);
    },

    scalar_multiple: function (second) {
        return this.x*second.x + this.y*second.y + this.z*second.z;
    },

    vector_multiple: function (second) {
        return new Vector3D(this.y*second.z - this.z*second.y, this.z*second.x - this.x*second.z,
                            this.x*second.y - this.y*second.x);
    },

    print: function() {
        return ('(' + this.x.toFixed(4) + '; ' + this.y.toFixed(4) + '; ' + this.z.toFixed(4) + ')');
    }
}

function Quaternion(u, w) {
    this.constructor(u, w);
}

Quaternion.prototype = {
    u: 0.0,
    w: new Vector3D(0.0, 0.0, 0.0),

    constructor: function(u, w) {
        this.u = u;
        this.w = w;
    },

    length: function () {
        var wlen = this.w.length();
        return Math.sqrt(this.u*this.u + wlen*wlen);
    },

    normalize: function() {
        var coef = 1.0/this.length();
        return new Quaternion(this.u*coef, this.w.multiple(coef));
    },

    multiple: function (second) {
        var real = this.u*second.u - this.w.scalar_multiple(second.w);
        var vect1 = second.w.multiple(this.u);
        var vect2 = this.w.multiple(second.u);
        var vect3 = this.w.vector_multiple(second.w);
        var imaginary = vect1.add(vect2).add(vect3);
        var result = new Quaternion(real, imaginary);
        return result;
    },

    invert: function() {
        return new Quaternion(this.u, this.w.negate());
    },

    print: function() {
        return (this.u.toFixed(4) + ' + ' + this.w.print());
    }
}

function quaternionFromAngleAndAxis(angle, axis) {
    var imaginary = axis.multiple(Math.sin(angle/2.0));
    var real = Math.cos(angle/2.0);
    return (new Quaternion(real, imaginary)).normalize();
}

function rotate(vector, angle, axis) {
    var quatvec = new Quaternion(0, vector);
    var quataxis = quaternionFromAngleAndAxis(angle, axis);
    return quataxis.multiple(quatvec.multiple(quataxis.invert())).w;
}