import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { busca } from '../../../services/Service'
import {  Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { TabTitle } from '../../../tituloPaginas/GeneralFunctions';
import Comentario from '../../../models/Comentario';

function ListaComentario() {
  const [coments, setComents] = useState<Comentario[]>([])
  let navigate = useNavigate();
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

  async function getComent() {
    await busca("/comentarios", setComents, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getComent()

   }, [coments.length]);
  TabTitle('Lady Debug - Comentários');

  return (
    <>
    <Grid container  direction='row' alignItems='center' className= 'produto-container fundototallistapost'>
      <Grid alignItems="center" item xs={12}>
      {
        coments.map(coment => (
          <Box m={1} className='caixalistapost'>
            <Card variant="outlined" className='papelpost'>
              <CardContent>
                <Typography color="textSecondary" gutterBottom className='cordefundo'>
                  Comentário
                </Typography>
                <Typography variant="h5" component="h2">
                  {coment.usuario?.usuario}
                </Typography>
                <Typography variant="body2" component="p">
                  {coment.texto}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioComentario/${coment.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained"size='small' className="botaoatualizarpost">
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarComentario/${coment.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary" className='botaodeletarpost'>
                        Deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>

        ))
      } 
      </Grid>
       </Grid>
    </>
  )
}

export default ListaComentario;