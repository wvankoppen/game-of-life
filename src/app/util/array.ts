export function matrix(rows: number, cols: number): boolean[][] {
    return Array(rows)
        .fill(null)
        .map((_) => vector(cols));
}

export function vector(cols: number): boolean[] {
    return Array(cols).fill(false);
}
