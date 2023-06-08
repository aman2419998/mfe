import React, { Suspense, lazy, useState, useEffect } from "react";
import Header from "./components/Header";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

const MarketingApp = lazy( () => import( './components/MarketingApp' ) );
const AuthApp = lazy( () => import( './components/AuthApp' ) );
import ProgressBar from './components/Progress';
const Dashboard = lazy( () => import( './components/Dashboard' ) );

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {

    const [ isSignedIn, setIsSignedIn ] = useState( false );

    useEffect( () => {
        if( isSignedIn ) {
            history.push( '/dashboard' );
        }else{
            history.push( '/' );
        }
    }, [ isSignedIn ] );

    return <div>
        <StylesProvider generateClassName={generateClassName} >
            <Router history={history} >
                <Header isSignedIn={ isSignedIn } onSignOut={ () => setIsSignedIn( false ) }  />
               <Suspense fallback={ <ProgressBar /> } >
               <Switch>
                    <Route path='/auth'>
                        <AuthApp onSignIn={ () => setIsSignedIn( true ) } />
                    </Route>
                    <Route path='/dashboard'>
                        { !isSignedIn && <Redirect to='/' /> }
                        <Dashboard />
                    </Route>
                    <Route path='/' component={ MarketingApp } />
                </Switch>
               </Suspense>
            </Router>

        </StylesProvider>
    </div>
}