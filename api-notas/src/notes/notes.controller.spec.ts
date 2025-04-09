import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNotesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findFavorites: jest.fn(),
    sendNoteByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: mockNotesService,
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería llamar al servicio para crear una nota', async () => {
    const dto: CreateNoteDto = { title: 'Test', content: 'Contenido' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todas las notas', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería retornar una nota por ID', async () => {
    const id = '123';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('debería actualizar una nota', async () => {
    const id = '123';
    const dto: UpdateNoteDto = { title: 'Actualizado', content: 'Nuevo contenido' };
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('debería eliminar una nota', async () => {
    const id = '123';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('debería obtener notas favoritas', async () => {
    await controller.findFavorites();
    expect(service.findFavorites).toHaveBeenCalled();
  });

  it('debería enviar una nota por email', async () => {
    const id = '123';
    const email = 'test@email.com';
    await controller.sendNoteByEmail(id, email);
    expect(service.sendNoteByEmail).toHaveBeenCalledWith(id, email);
  });
});
