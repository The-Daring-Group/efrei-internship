export const getStudentName = (idStudent, listStudent) => {
    for(const element of listStudent) {
        if (element.id === idStudent) {
            return element.firstname + " " + element.lastname;
        }
    }
    return "Unknown";
}