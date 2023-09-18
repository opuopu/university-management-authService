import { RedisClient } from "../../../shared/redis"
import { AcademicDepartmentService } from "./academicDepartment.service"


const InitAcademicDepartmentEvents = ()=>{
    RedisClient.subscribe('academic_department_create',async(e:string)=>{
        const data =  JSON.parse(e)
      await AcademicDepartmentService.insertIntoDBFromEvent(data)

    })
    RedisClient.subscribe('academic_department_update',async(e:string)=>{
        const data =  JSON.parse(e)
      await AcademicDepartmentService.updateOneInDBFromEvent(data)

    })
}




export default InitAcademicDepartmentEvents