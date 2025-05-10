export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);
    const isFuture = secondsDiff < 0;
    let value = Math.abs(secondsDiff);

    const intervals = [
        [60, "segon"],
        [60, "minut"],
        [24, "hora"],
        [7, "dia"],
        [4.34524, "setmana"],
        [12, "mes"],
        [Number.POSITIVE_INFINITY, "any"],
    ];

    const durations = [60, 60, 24, 7, 4.34524, 12];
    let unit = "";

    for (let i = 0; i < intervals.length; i++) {
        if (value < intervals[i][0]) {
            unit = intervals[i][1];
            break;
        }
        value /= durations[i];
    }

    const rounded = Math.floor(value);
    const plural = rounded !== 1 ? "s" : "";

    return isFuture
        ? `D'aquí ${rounded} ${unit}${plural}`
        : `Fa ${rounded} ${unit}${plural}`;
}