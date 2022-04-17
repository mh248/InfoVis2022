class Vec3 {
    // Constructor
    constructor( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add( v ) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sub( v ) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    sum() {
        return this.x + this.y + this.z;
    }

    min() {
    //return Math.min( this.x, this.y, this.z );
    const m =  this.x < this.y ? this.x : this.y;
    return m < this.z ? m : this.z;
    }

    max() {
        //return Math.max( this.x, this.y, this.z );
        const m = this.x > this.y ? this.x : this.y;
        return m > this.z ? m : this.z;
    }

    mid() {
        return this.sum() - this.min() - this.max();
    }

    cross( v ) {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        console.log("this=" + this)
        return this;
    }

    length() {
        console.log("this.x=" + this.x)

        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    areaOfTriangle(v1, v2) {
        var a1 = v1.sub(this)
        var a2 = v2.sub(this)
        console.log("a1=" + a1)
        console.log("a2=" + a2)
        console.log("ans=" + a1.cross(a2).length())
        return a1.cross(a2).length()
    }
}