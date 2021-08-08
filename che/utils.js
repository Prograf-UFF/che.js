export default function chunk(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunkedArray[chunkedArray.length - 1];
        if (!last || last.length === size) {
            chunkedArray.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunkedArray;
}