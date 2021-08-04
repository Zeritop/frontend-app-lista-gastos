import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import { AlertaProvider } from './context/AlertaContext';
import { UsuarioProvider } from './context/UsuarioContext';
import NotFound from './elements/404';
import ListaGastos from './components/ListaGastos';
import EditarGasto from './components/EditarGasto';
import Categorias from './components/Categorias';
import { Contenedor } from './elements/ContainerBody';
import { GastosDelMesProvider } from './context/GastoDelMesContext';
import { GastosCategoriasProvider } from './context/GastosCategoria/GastosCategoriasContext';
import { Helmet } from 'react-helmet';
import favicon from './image/logo.png';


const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
        <title>App Gastos</title>
      </Helmet>

      <UsuarioProvider>
        <AlertaProvider>
          <BrowserRouter>
            <Contenedor>

              <Switch>
                <Route path="/iniciar-sesion">
                  <Login />
                </Route>
                
                <Route path="/registrarse">
                  <Registrarse />
                </Route>
        
                  <Route 
                    path="/" 
                    exact 
                    render={routeProps => (
                      
                        <GastosDelMesProvider>
                          <App {...routeProps} />
                        </GastosDelMesProvider>
                   
                    )}>
                  </Route>

                  <Route 
                    path="/lista-gastos" 
                    render={routeProps => (
                   
                        <GastosDelMesProvider>
                          <ListaGastos {...routeProps} />
                        </GastosDelMesProvider>
                    
                    )}>
                  </Route>

                  <Route 
                    path={`/editar-gasto/:id`} 
                    render={routeProps => (
                      
                        <GastosDelMesProvider>
                          <EditarGasto {...routeProps} />
                        </GastosDelMesProvider>
                   
                    )}>
                  </Route>

                  <Route 
                    path="/categorias" 
                    render={routeProps => (
                      
                        <GastosCategoriasProvider>
                          <GastosDelMesProvider>
                            <Categorias {...routeProps} />
                          </GastosDelMesProvider>
                        </GastosCategoriasProvider>
                
                    )}>
                  </Route>
    
                <Route component={NotFound} />

              </Switch>

            </Contenedor>
          </BrowserRouter>
          </AlertaProvider>
      </UsuarioProvider>
    </>
  )
}
ReactDOM.render(<Index />,document.getElementById('root')
);

