import React from "react";
import {Button, Form, Input} from "antd";
import {createClient} from "../../redux/clientReducer/clientReducer";
import {getClientsInApartment} from "../../redux/clientsReducer/clientsReducer";
import {useDispatch} from "react-redux";

const layout = {
    labelCol: {span: 4,},
    wrapperCol: {span: 16,},
};

const validateMessages = {
    required: '${label} is required!',
    types: {email: '${label} is not a valid email!', number: '${label} is not a valid number!',},
    number: {range: '${label} must be between ${min} and ${max}',},
};

export const EditClientForm = (props) => {
    const dispatch = useDispatch()

    const onFinish = (values) => {
        const {name, number, email} = values.user
        dispatch(createClient(props.id, name, number, email, props.bindId))
        dispatch(getClientsInApartment(props.bindId))
    };

    return (
        <div>
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
                    <Input defaultValue={props.phone}/>
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
                    <Input defaultValue={props.email}/>
                </Form.Item>
                <Form.Item
                    name={['user', 'name']}
                    label="Ф.И.О"
                >
                    <Input defaultValue={props.name}/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                    <Button type="primary" htmlType="submit" block>
                        Изменить данные
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}