Array.prototype.parse2D = function() {
    const row = []
    for(let i =0; i <this.length; i += 16){
        row.push(this.slice(i, i + 16))
    }
    return rows
}