import InitAcademicDepartmentEvents from "../modules/academicDepartment/academicDepartment.events";
import initAcademicSemesterEvents from "../modules/academicSemester/academicSemester.event";

const subscribeToEvents = () => {
    initAcademicSemesterEvents();
    InitAcademicDepartmentEvents()

}

export default subscribeToEvents;