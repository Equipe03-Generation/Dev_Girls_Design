import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs centered className='bgtab' onChange={handleChange}>
            <Tab label="Todas as postagens" value="1"/>
            <Tab label="Igualdade de Gênero" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Igualdade de Gênero</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">A igualdade de género, além de ser um direito humano fundamental, é essencial para alcançar sociedades pacíficas, com pleno potencial humano e desenvolvimento sustentável. Além disso, está provado que o fortalecimento da mulher estimula a produtividade e o crescimento económico.</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;