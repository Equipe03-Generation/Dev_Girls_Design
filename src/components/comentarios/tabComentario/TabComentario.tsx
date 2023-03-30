import React, {useState} from 'react'
import { AppBar, Tab, Tabs } from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import './TabComentario.css';
import ListaComentario from '../listaComentario/ListaComentario';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs centered className='imagetab' onChange={handleChange}>
            <Tab label="Últimos Comentários" value="1"/>
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaComentario />
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;