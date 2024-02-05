export const getStudentName = (idStudent, listStudent) => {
    for(const element of listStudent) {
        if (element.id === idStudent) {
            return element.firstname + " " + element.lastname;
        }
    }
    return "Unknown";
}

export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.toLocaleString("default", {year: "numeric"});
    const month = formattedDate.toLocaleString("default", {month: "2-digit"});
    const day = formattedDate.toLocaleString("default", {day: "2-digit"});

    return `${year}-${month}-${day}`;
}