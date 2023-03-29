import Postagem from './Postagem'
import User from './User';

interface Comentario{
    id: number;
    texto: string;
    usuario?: User| null
    postagem?: Postagem|null
}

export default Comentario;