import { Controller, Get } from '@nestjs/common';
import { ValidHttpResponse } from '../packages/handler/response/validHttp.response';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  findAll() {
    const data = this.coursesService.findAll();
    return ValidHttpResponse.toOkResponse('Get all courses successfully', data);
  }
}
