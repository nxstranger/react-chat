import React, { useEffect } from "react";
import * as Yup from 'yup';
import {Formik} from "formik";
import {asyncSetContactName} from '../../../store/chatSlice'
import {useAppDispatch, useAppSelector} from "../../../hooks/storeHooks";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useLocalStorage from "../../../hooks/useLocalStorage";

const ChangeContactForm = () => {
    const contactName = useAppSelector(({chat}) => chat.contactName);
    const token = useAppSelector(({chat}) => chat.token);
    const dispatch = useAppDispatch();
    const {getContactLocal, setContactLocal} = useLocalStorage();

    useEffect( () => {
        console.log('ChangeContactForm init');
    }, [contactName]);
    return (
        <Formik
            initialValues={{contactName: getContactLocal()}}
            validationSchema={Yup.object({
                contactName: Yup.string()
                    .min(1, 'Must include characters')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, setValues }) => {
                setTimeout(() => {
                    const contactName = values.contactName;
                    // console.log(JSON.stringify(values, null, 2));
                    if (contactName && token) {
                        setContactLocal(contactName)
                        dispatch(asyncSetContactName({token, contactName}));
                    }
                    setSubmitting(false);
                    setValues({ contactName });
                }, 500);
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="contactName">Contact ID</Form.Label>
                        <Form.Control
                            autoFocus
                            id="contactName"
                            type="text"
                            {...formik.getFieldProps('contactName')}
                        />
                        <Form.Text>
                            {formik.errors.contactName && formik.touched.contactName && formik.errors.contactName}
                        </Form.Text>
                    </Form.Group>
                    <Button
                        type="submit"
                        // hidden
                        disabled={ formik.isSubmitting || !formik.isValid }
                    >
                        {'Change ID'}
                    </Button>

                </Form>
            )}
        </Formik>
    )
}

export default ChangeContactForm;
