const Neighbours = (i, j) => {
    const n = [
        [i-1, j],
        [i+1, j],
        [i, j-1],
        [i, j+1],
    ]
    for(let i=n.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [n[i], n[j]] = [n[j], n[i]];
    }
    return n;
}
export default Neighbours;