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
    const note = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.notesRepository.find();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.preload({
      id,
      ...updateNoteDto,
    });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return this.notesRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    const note = await this.findOne(id);
    await this.notesRepository.remove(note);
  }

  async findFavorites(): Promise<Note[]> {
    return await this.notesRepository.find({
      where: { isFavorite: true },
    });
  }
  
}


