import Comentario from './Comentario';
import Postagem from './Postagem'

interface User {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string
    postagem?: Postagem| null
    comentario?: Comentario|null
}

export default User;