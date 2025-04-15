import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // POST
  @Post()
  @ApiTags('POST')
  @ApiOperation({ summary: 'Crear una nueva nota' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Post(':id/send')
  @ApiTags('POST')
  @ApiOperation({ summary: 'Enviar una nota por email' })
  @ApiParam({ name: 'id', required: true })
  @ApiQuery({ name: 'to', required: true, description: 'Correo destinatario' })
  sendNoteByEmail(@Param('id') id: string, @Query('to') to: string) {
    return this.notesService.sendNoteByEmail(id, to);
  }

  // GET
  @Get()
  @ApiTags('GET')
  @ApiOperation({ summary: 'Obtener todas las notas' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get('favorites')
  @ApiTags('GET')
  @ApiOperation({ summary: 'Obtener todas las notas marcadas como favoritas' })
  findFavorites() {
    return this.notesService.findFavorites();
  }

  @Get(':id')
  @ApiTags('GET')
  @ApiOperation({ summary: 'Obtener una nota por ID' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  // PATCH
  @Patch(':id')
  @ApiTags('PATCH')
  @ApiOperation({ summary: 'Actualizar una nota' })
  @ApiParam({ name: 'id', required: true })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  // DELETE
  @Delete(':id')
  @ApiTags('DELETE')
  @ApiOperation({ summary: 'Eliminar una nota' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
