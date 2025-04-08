import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const note = this.notesRepository.create(createNoteDto);
      return await this.notesRepository.save(note);
    } catch (error) {
      throw new Error('Error al crear la nota');
    }
  }

  async findAll(): Promise<Note[]> {
    try {
      return await this.notesRepository.find();
    } catch (error) {
      throw new Error('Error al obtener todas las notas');
    }
  }

  async findOne(id: string): Promise<Note> {
    try {
      const note = await this.notesRepository.findOne({ where: { id } });
      if (!note) throw new NotFoundException('Nota no encontrada');
      return note;
    } catch (error) {
      throw new Error('Error al obtener la nota');
    }
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    try {
      const note = await this.notesRepository.preload({
        id,
        ...updateNoteDto,
      });
      if (!note) throw new NotFoundException('Nota no encontrada');
      return this.notesRepository.save(note);
    } catch (error) {
      throw new Error('Error al actualizar la nota');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const note = await this.findOne(id);
      await this.notesRepository.remove(note);
    } catch (error) {
      throw new Error('Error al eliminar la nota');
    }
  }

  async findFavorites(): Promise<Note[]> {
    try {
      return await this.notesRepository.find({
        where: { isFavorite: true },  
      });
    } catch (error) {
      throw new Error('Error al obtener las notas favoritas');
    }
  }
}