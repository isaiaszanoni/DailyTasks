import { Tarefas } from "./Tarefas";

export class Usuario{

    public id: number
    public nome: string
    public email: string
    public senha: string
    public token: string
    public tarefas: Tarefas[]
}