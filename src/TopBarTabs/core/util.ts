export function isBetween(num: number, a: number, b: number) {
    return (num >= a && num <= b) || (num >= b && num <= a);
}