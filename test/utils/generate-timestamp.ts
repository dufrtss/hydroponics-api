let timestampCursor = Date.now()

export function generateTimestamp(daysBetween: number = 1) {
    const current = timestampCursor
    timestampCursor += daysBetween * 86_400_000 // increment by 1 * daysBetween day(s).
    return current
}
