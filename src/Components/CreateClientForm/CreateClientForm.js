import React from "react";
import styles from './CreateClientForm.module.css'
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createClient} from "../../redux/clientReducer/clientReducer";
import {getClientsInApartment} from "../../redux/clientsReducer/clientsReducer";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export const CreateClientForm = () => {
    const dispatch = useDispatch()

    const addressId = useSelector(state => state.client.addressId)
    const chosenStreet = useSelector(state => state.address.chosenStreet.name)
    const chosenHouse = useSelector(state => state.address.chosenHouse.name)
    const chosenApartment = useSelector(state => state.address.chosenApartment.flat)

    const onFinish = (values) => {
        const {name, number, email} = values.user
        dispatch(createClient(0, name, number, email, addressId))
        dispatch(getClientsInApartment(addressId))
    };

    return (
        <div>
            <div className={styles.infoWrapper}>
                <p className={styles.info}><span>Улица</span> {chosenStreet}</p>
                <p className={styles.info}><span>Дом №</span> {chosenHouse} / {chosenApartment}</p>
            </div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'number']}
                    label="Телефон"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^\+?[0-9]{3}-?[0-9]{6,12}$/),
                            message: 'You should use only numbers and +'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'name']}
                    label="Ф.И.О"
                >
                    <Input/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}