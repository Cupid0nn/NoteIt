import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Mi primera nota', description: 'Título de la nota' })
  title: string;

  @ApiProperty({ example: 'Contenido de la nota', description: 'Cuerpo de la nota' })
  content: string;

  @ApiProperty({ example: true, description: 'Si la nota es favorita o no', default: false })
  isFavorite?: boolean;
}
