import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { RevenusService } from './revenus.service';
import { CreateRevenuDto } from 'src/depenses/dto/create-revenu.dto';
import { UpdateRevenuDto } from 'src/depenses/dto/update-revenu.dto';

@Controller('revenus')
export class RevenusController {
constructor(private readonly revenusService: RevenusService ) {}

@Post()
create(@Body() createRevenuDto: CreateRevenuDto){
    return this.revenusService.create( createRevenuDto)
}

@Patch(':id')
update(@Param('id') id:string, @Body() updateRevenuDto: UpdateRevenuDto){
    return this.revenusService.update(id,updateRevenuDto)
}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
remove(@Param('id') id:string){
    return this.revenusService.remove(id);
}

@Get()
findAll() {
    return this.revenusService.findAll();
    
}
@Get(':id')
findOne(@Param('id') id:string){
    return this.revenusService.findOne(id);
}
}


