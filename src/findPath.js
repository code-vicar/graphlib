export default function findPath(start, end, parents) {
    let path;

    if (end === -1) {
        return null;
    }
    if (start === end) {
        return [end];
    }

    path = findPath(start, parents[end], parents);
    if (!path) {
        return null;
    }
    path.push(end);
    return path;
}
