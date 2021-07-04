import React from 'react';
import {useFormik, Field, ErrorMessage, Formik, Form} from 'formik';
import {Box, Button, FormControlLabel, Grid, Switch, TextField} from "@material-ui/core";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {fetchFormThunkAT, initialStateLoginType} from "./loginReduser";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "../todoListsList/taskReduser";
import { Redirect } from 'react-router-dom';


export const Login = () => {

    const dispatch = useDispatch();
    let isLogin = useSelector<AppRootStateType, initialStateLoginType>(state => state.login);

if(isLogin.isLoggedIn){
    return <Redirect to='/'/>
}

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}

            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required')

            })}

            onSubmit={(values) => {
              dispatch(fetchFormThunkAT(values))
            }}
        >
            {({errors, touched}) => (
                <Form>
                    <Grid container style={{padding: "20px 0px"}}>

                        <Grid container style={{padding: "10px 0px"}}>
                            <Box margin={1}>
                                <label htmlFor="email">email </label>
                                <Field name="email" type="text"/>
                                <ErrorMessage name="email"/>
                            </Box>
                        </Grid>

                        <Grid container style={{padding: "10px 0px"}}>
                            <Box margin={1}>
                                <label htmlFor="password">password </label>
                                <Field name="password" type="password"/>
                                <ErrorMessage name="password"/>
                            </Box>
                        </Grid>

                        <Grid container style={{padding: "10px 0px"}}>
                            <Box margin={1}>
                                <label htmlFor="rememberMe">rememberMe </label>
                                <Field type="checkbox" name="rememberMe"/>
                            </Box>
                        </Grid>

                        <Button color="primary" type="submit" variant={'outlined'}>Submit</Button>

                    </Grid>
                </Form>)}
        </Formik>
    )
}