export const getStudentName = (idStudent, listStudent) => {
    for(let i = 0; i < listStudent.length; i++) {
        if(listStudent[i].id === idStudent) {
            return listStudent[i].firstname + " " + listStudent[i].lastname;
        }
    }
    return "Unknown";
}