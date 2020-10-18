export interface Rectangle {
    left: number,
    top: number,
    right: number,
    bottom: number
}

export function intersect(r1: Rectangle, r2: Rectangle): boolean {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
}
