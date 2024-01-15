import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  originalFileName: string;

  @Column()
  fileName: string;

  @Column()
  imageUrl: string;

  constructor(originalFileName: string, fileName: string, imageUrl: string) {
    this.originalFileName = originalFileName;
    this.fileName = fileName;
    this.imageUrl = imageUrl;
  }
}
