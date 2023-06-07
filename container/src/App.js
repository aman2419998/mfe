import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const MarketingApp = lazy( () => import( './components/MarketingApp' ) );
const AuthApp = lazy( () => import( './components/AuthApp' ) );
import ProgressBar from './components/Progress';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

export default () => {
    return <div>
        <StylesProvider generateClassName={generateClassName} >
            <BrowserRouter>
                <Header />
               <Suspense fallback={ <ProgressBar /> } >
               <Switch>
                    <Route path='/auth' component={ AuthApp } />
                    <Route path='/' component={ MarketingApp } />
                </Switch>
               </Suspense>
            </BrowserRouter>

        </StylesProvider>
    </div>
}