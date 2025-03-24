import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("aneis") // Define o nome da tabela no banco
export class Anel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  nome: string;

  @Column({ type: "text" })
  poder: string;

  @Column({ type: "text" })
  portador: string;

  @Column({ type: "text" })
  forjadoPor: string;

  @Column({ nullable: true })
  imagem: string;
}