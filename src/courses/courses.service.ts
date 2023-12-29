import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private readonly courses: Course[] = [
    {
      id: 'cd23c5cf-b30b-4389-a1f5-35a6ba8e1d99',
      name: 'NestJS Basic',
      author: 'John Smith',
      description: 'Description of NestJS',
    },
    {
      id: '19168d7d-fbce-4620-9ce2-819ca12184d2',
      name: 'ExpressJS Basic',
      author: 'Jennifer',
      description: 'Description of ExpressJS',
    },
    {
      id: 'd0794903-e6a7-492a-8244-daad7ff0194b',
      name: 'Spring Boot Basic',
      author: 'Jones Bar',
      description: 'Description of Spring Boot',
    },
    {
      id: '9b3329ca-f6c8-4bed-b60f-4f469fa95751',
      name: 'Reactive Development Build',
      author: 'Cristian Rold',
      description: 'Description of Reactive Development Build',
    },
  ];
  findAll(): Course[] {
    return this.courses;
  }
}
