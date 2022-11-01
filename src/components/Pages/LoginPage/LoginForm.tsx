import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useAppDispatch } from '../../../hooks/storeHooks';
import axios from '../../../modules/Axios';
import {setToken, setUser} from '../../../store/chatSlice';
import {PagesEnum} from "../../../enums/pagesEnum";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface errorFields {
    username: string;
    password: string
}

const initialInputValues = {
    username: 'qwe1',
    password: 'qwe'
};

const LoginForm = () => {
    const validate = (values: errorFields) => {
        const errors:any = {};
        if (!values.username) errors.username = 'Required!';
        if (!values.password) errors.password = 'Required!';
        return errors;
    };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (values:any) => {
        console.log(values);

        let fd = new FormData();
        fd.append('username', values.username)
        fd.append('password', values.password)
        const { username } = values;
        const resp = await axios.post(
            '/api/v1/auth/login',
            fd,
            // JSON.stringify(values),
            { timeout: 2000, },
        );
        if ((resp.status) != 200) return alert('Invalid credentials');

        const { access_token, token_type} = resp.data;
        let access = token_type + " " + access_token;
        console.log(access_token, );
        dispatch(setToken(access));
        dispatch(setUser(username));
        if (access) navigate(PagesEnum.ContactPage);
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

                <Button
                    type="submit"
                    hidden
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {'Login'}
                </Button>
            </Form>
        )}
    </Formik>
}
export default LoginForm;
