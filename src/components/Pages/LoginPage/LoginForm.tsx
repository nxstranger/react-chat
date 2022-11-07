import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useAppDispatch } from '../../../hooks/storeHooks';
import axios from '../../../modules/Axios';
import {setToken, setUser} from '../../../store/chatSlice';
import {PagesEnum} from "../../../enums/pagesEnum";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useLocalStorage from "../../../hooks/useLocalStorage";
import ErrorMessageDiv from "../../Shared/ErrorMessageDiv";

interface errorFields {
    username: string;
    password: string
}

interface loginErrorInterface {
    code?: number;
    text?: string;
}

const LoginForm = () => {
    const {getUserLocal, setUserLocal} = useLocalStorage();
    const [loginError, setLoginError] = useState<loginErrorInterface>({});

    const validate = (values: errorFields) => {
        const errors:any = {};
        if (!values.username) errors.username = 'Required!';
        if (!values.password) errors.password = 'Required!';
        return errors;
    };
    const initialInputValues = {
        username: getUserLocal(),
        password: 'qwe'
    };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (values:any) => {
        console.log(values);
        let formData = new FormData();
        formData.append('username', values.username)
        formData.append('password', values.password)
        const { username } = values;
        try {
            const resp = await axios.post(
                '/api/v1/auth/login',
                formData,
                { timeout: 2000, },
            );
            if ((resp.status) != 200) return alert('Invalid credentials');
            setUserLocal(values.username);
            const { access_token, token_type} = resp.data;
            let access = token_type + " " + access_token;
            console.log(access_token, );
            dispatch(setToken(access));
            dispatch(setUser(username));
            if (access) navigate(PagesEnum.ContactPage);
        } catch (err: any) {
            const errCode = err.code || undefined;
            const errText = err.message || undefined;
            setLoginError({code: errCode, text: errText});
        }

    }
    useEffect(() => {console.log('LoginForm rerendered')}, [])
    return <Formik
        initialValues={initialInputValues}
        validate={validate}
        onSubmit={onSubmitHandler}
    >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        id='username'
                        {...formik.getFieldProps('username')}
                        aria-describedby="usernameHelpBlock"
                    />
                    <Form.Text id="usernameHelpBlock" muted>
                        {formik.errors.username && formik.touched.username && formik.errors.username}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    {...formik.getFieldProps('password')}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        {formik.errors.password && formik.touched.password && formik.errors.password}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                        {'Login'}
                    </Button>
                    <ErrorMessageDiv key={loginError.text} errorInfo={loginError.text}/>
                    <ErrorMessageDiv key={loginError.code} errorInfo={loginError.code}/>
                </Form.Group>
            </Form>
        )}
    </Formik>
}
export default LoginForm;
