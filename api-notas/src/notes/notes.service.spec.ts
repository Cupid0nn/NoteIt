import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';

const mockNote = {
  id: '1',
  title: 'Título de prueba',
  content: 'Contenido de prueba',
  isFavorite: false,
};

describe('NotesService', () => {
  let service: NotesService;
  let repository: Repository<Note>;
  let mailService: MailService;

  const mockNotesRepository = {
    create: jest.fn().mockReturnValue(mockNote),
    save: jest.fn().mockResolvedValue(mockNote),
    find: jest.fn().mockResolvedValue([mockNote]),
    findOne: jest.fn().mockResolvedValue(mockNote),
    preload: jest.fn().mockResolvedValue(mockNote),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  const mockMailService = {
    sendNote: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: mockNotesRepository },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
    mailService = module.get<MailService>(MailService);
  });

  it('debería crear una nota', async () => {
    const result = await service.create({ title: 'Test', content: 'Content' });
    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(result).toEqual(mockNote);
  });

  it('debería devolver todas las notas', async () => {
    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockNote]);
  });

  it('debería encontrar una nota por id', async () => {
    const result = await service.findOne('1');
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockNote);
  });

  it('debería actualizar una nota', async () => {
    const result = await service.update('1', {
      title: 'Nuevo título',
      content: 'Nuevo contenido',
    });
    expect(repository.preload).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(mockNote);
    expect(result).toEqual(mockNote);
  });

  it('debería eliminar una nota', async () => {
    await service.remove('1');
    expect(repository.remove).toHaveBeenCalledWith(mockNote);
  });

  it('debería encontrar notas favoritas', async () => {
    await service.findFavorites();
    expect(repository.find).toHaveBeenCalledWith({ where: { isFavorite: true } });
  });

  it('debería enviar una nota por email', async () => {
    const result = await service.sendNoteByEmail('1', 'test@email.com');
    expect(mailService.sendNote).toHaveBeenCalledWith(
      'test@email.com',
      `Nota: ${mockNote.title}`,
      mockNote.content,
    );
    expect(result).toEqual({ success: true });
  });
});
