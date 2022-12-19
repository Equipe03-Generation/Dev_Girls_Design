import React from 'react';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useDispatch } from "react-redux";
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    function goLogout(){
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        navigate('/login')
    }

    var navbarComponent;


    if(token != ""){
        navbarComponent = <AppBar position="static">
        <Toolbar variant="dense" className='bgnav centro'>

            <Box display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                    <Box mx={1} className='cursor text-decorator-none'>
                        <img src="https://cdn-icons-png.flaticon.com/512/9094/9094099.png" height={40} alt="" />
                    </Box>
                </Link>
                <Link to="/equipe" className="text-decorator-none">
                    <Box mx={1} className='cursor text-decorator-none'>
                        <img src="https://cdn-icons-png.flaticon.com/512/5027/5027793.png" height={40} alt="" />
                    </Box>
                </Link>
                <Link to="/sobre" className="text-decorator-none">
                    <Box mx={1} className='cursor text-decorator-none'>
                        <img src="https://cdn-icons-png.flaticon.com/512/6488/6488588.png" height={40} alt="" />
                    </Box>
                </Link>
                <Link to="/posts" className="text-decorator-none">
                    <Box mx={1} className='cursor text-decorator-none'>
                        <img src="https://cdn-icons-png.flaticon.com/512/6738/6738314.png" height={40} alt="" />
                    </Box>
                </Link>
                <Link to="xxx" className="text-decorator-none">
                    <Box mx={1} className='cursor text-decorator-none'>
                        <img src="https://cdn-icons-png.flaticon.com/512/983/983952.png" height={40} alt="" />
                    </Box>
                </Link>                 
                <Link to="/temas" className="text-decorator-none">
                <Box mx={1} className='cursor text-decorator-none'>
                    <img src="https://cdn-icons-png.flaticon.com/512/1443/1443029.png" height={40} alt="" />
                </Box>
                </Link>
                <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={1} className='cursor text-decorator-none'>
                    <img src="https://cdn-icons-png.flaticon.com/512/1658/1658958.png" height={40} alt="" />
                </Box>
                </Link>
              
                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6488/6488629.png" height={40} alt="" />
                    </Box>
                
            </Box>

        </Toolbar>
    </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;