import {Route, Switch} from "react-router-dom";
import App from "./pages/App";
import NotFound from "./pages/NotFound";
import React from "react";
import Details from "./pages/Details";

export const MAIN_ROUTE = 'MAIN_ROUTE'
export const PEOPLE_DETAILS = 'PEOPLE_DETAILS'

const routes = [
    {
        id: MAIN_ROUTE,
        path: '/',
        exact: true,
        component: App
    },
    {
        id: PEOPLE_DETAILS,
        path: '/people/:id',
        exact: true,
        component: Details
    }
]

export const getRouteConfig = id => {
    const route = routes.find(r => r.id === id)
    if (route) {
       const {component, ...rest} = route
        return rest
    }
}

export default function Routes() {
    return (
        <Switch>
            {routes.map((rout) => {
                return (
                    <Route key={rout.id} path={rout.path} exact={rout.exact} component={rout.component}/>
                )
            })}
        </Switch>
    )
}