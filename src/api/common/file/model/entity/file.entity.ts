import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  fieldName: string;

  @Column()
  originalName: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  imageUrl: string;

  constructor(
    fieldName: string,
    originalName: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
    imageUrl: string,
  ) {
    this.fieldName = fieldName;
    this.originalName = originalName;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.destination = destination;
    this.filename = filename;
    this.path = path;
    this.size = size;
    this.imageUrl = imageUrl;
  }
}
