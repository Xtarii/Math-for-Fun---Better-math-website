/**
 * Stops thread for ```ms``` time
 *
 * @param ms Time to wait
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
