import {
   Controller,
   Get,
   Put,
   Delete,
   Patch,
   Body,
   Post
 } from '@nestjs/common';

 import { PremierService } from './premier.service';
 import { ParseIntPipe } from '@nestjs/common';

 //import { Post } from '@nestjs/common/decorators';

 
 @Controller('premier')
 export class PremierController {
   constructor(
   ) {}
   @Patch('')
   patchTest()
  {
 
    return 'Patch'
  }
  @Post('')
  postTest()
 {

   return 'Post'
 }
 @Get('')
 getTest()
{

  return 'Get'
}
@Put('')
putTest()
{

 return 'Put'
}
@Delete('')
deleteTest()
{

 return 'Delete'
}

 }
