export const parseStringRating = (string) => {
    const pattern = /type=(\w+)&id=(\d+)/;
    const match = string.match(pattern);

    if (match) {
        const typeValue = match[1];
        const idValue = match[2];
        return { type: typeValue, id: idValue };
    } else {
        console.log("No match found");
    }
}