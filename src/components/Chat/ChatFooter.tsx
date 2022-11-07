import React, {useEffect} from "react";
import * as Yup from 'yup';
import {Formik} from "formik";
import useChat from '../../hooks/useChat';
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {addMessage} from "../../store/chatSlice";
import {Form, Button, Stack} from "react-bootstrap";
import useScroll from "../../hooks/useScroll";


const get_random_message = () => {
    const variants = [
        "Hey, honey I've jumped from plane",
        "Hey, honey I've cooked the dinner",
        "Hey, honey, there are zombies outside",
        "Hey, honey, I've bought a crocodile",
        "Hey, honey, I want you",
        "Hey, honey, I love you",
    ];

    let index = Math.floor(Math.random() * variants.length);
    return variants[index];
}


const ChatFooter = () => {
    const {userName} = useAppSelector(({ chat }) => chat);
    const { sendMessage } = useChat();
    const dispatch = useAppDispatch();
    useEffect( () => {
        console.log('MsgForm init, user: ' + userName);
    }, []);
    const { scrollBodyToBottom } = useScroll();

    return (
        <Formik
            initialValues={{message: `Hey, honey I've jumped from plane`}}
            validationSchema={Yup.object({
                message: Yup.string()
                    .min(1, 'Must include characters')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, setValues }) => {
                setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    try {
                        sendMessage(values.message);
                    } catch (error) {
                        let message = 'Unknown Error';
                        if (error instanceof Error) message = error.message;
                        dispatch(addMessage({type: "ERR", message: message, stamp: +new Date()}));
                    }
                    scrollBodyToBottom(100);
                    setSubmitting(false);
                    setValues({ message: get_random_message()})
                }, 500);
            }}
        >
        {formik => (
            <Form
                onSubmit={formik.handleSubmit}
                className="mb-1"
                style={{
                    width: "100%",
            }}
            >
                <Stack
                    direction="horizontal"
                    gap={3}
                    className='bg-yellow'
                >
                <Form.Control
                    id="message"
                    type="text"
                    autoFocus
                    {...formik.getFieldProps('message')}
                />
                <Button
                    type="submit"
                    // hidden
                    disabled={ formik.isSubmitting || !formik.isValid }
                >Send</Button>
                </Stack>
            </Form>
        )}
        </Formik>
    )
}

export default ChatFooter;
