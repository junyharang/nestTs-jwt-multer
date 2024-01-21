import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("increment", { type: "int", comment: "파일 고유 번호" })
  id: number;

  @Column({ name: "field_name" })
  fieldName: string;

  @Column({ name: "original_name" })
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
  url: string;

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
    this.url = imageUrl;
  }
}
