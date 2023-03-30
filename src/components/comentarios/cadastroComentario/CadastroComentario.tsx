import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Grid } from "@material-ui/core";
import './CadastroComentario.css';
import { useNavigate, useParams } from 'react-router-dom';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import User from '../../../models/User';
import Comentario from '../../../models/Comentario';

function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [users, setUsers] = useState<User[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")

        }
    }, [token])
    
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })
    
    const [comentario, setComentario] = useState<Comentario>({
        id: 0,
        texto: '',
        usuario: null,
        postagem: null
    })

    useEffect(() => { 
        setComentario({
            ...comentario
        })
    }, [comentario])

    useEffect(() => { 
        setComentario({
            ...comentario,
            usuario: user
        })
    }, [user])

    useEffect(() => {
        getUsers()
        if (id !== undefined) {
            findByIdComentario(id)
        }
    }, [id])

    async function getUsers() {
        await busca("/usuarios", setUsers, {
            headers: {
                'Authorization': token
            }
        })
    }


    async function findByIdComentario(id: string) {
        await buscaId(`/comentarios/${id}`, setComentario, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedComentario(e: ChangeEvent<HTMLInputElement>) {

        setComentario({
            ...comentario,
            [e.target.name]: e.target.value,
            usuario: user
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/comentarios`, comentario, setComentario, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Comentário atualizado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } else {
            post(`/comentarios`, comentario, setComentario, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Comentário cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return (
        <>
<Grid className='centralizarImg produto-container'>
            <img src='https://cdn.discordapp.com/attachments/1011758147494498377/1055504651795054712/sale-removebg-preview.png'></img>

            </Grid>
        
        
        <Container maxWidth="sm" className="topo produto-container">
            <form onSubmit={onSubmit}>
                {/* <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography> */}
                <TextField value={comentario.usuario?.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedComentario(e)} id="titulo" label="TITULO" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={comentario.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedComentario(e)} id="texto" label="TEXTO" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Usuário </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/usuarios/${e.target.value}`, setUser, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            users.map(user => (
                                <MenuItem value={user.id}>{user.nome}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Postagem </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/postagens/${e.target.value}`, setComentario, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            comentarios.map(comentario => (
                                <MenuItem value={comentario.id}>{comentario.texto}</MenuItem>
                            ))
                        }
                    </Select>
                    </FormControl>
                    <FormHelperText>Escolha um usuário e postagem para finalizar</FormHelperText>
                    <Button type="submit" variant="contained" color="primary" className='botaofinalizarpost imagem3'>
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>


        </>
    )

}

export default CadastroPost;