import styles from './App.module.css';
import React, {useEffect, useState} from "react";
import {FindAddressForm} from "./Components/FindAddressForm/FindAddressForm";
import {useDispatch, useSelector} from "react-redux";
import {getStreets} from "./redux/addressReducer/addressReducer";
import {CreateClientForm} from "./Components/CreateClientForm/CreateClientForm";
import {Clients} from "./Components/Clients/Clients";
import {Alert, Button, Modal, Popover} from "antd";
import {resetMessages} from "./redux/appReducer/appReducer";

function App() {
    const dispatch = useDispatch()

    const isChosenApartment = useSelector(state => state.address.isChosenApartment)
    const errorMessage = useSelector(state => state.app.errorMessage)
    const successMessage = useSelector(state => state.app.successMessage)

    const [modalStatus, setModalStatus] = useState(false)

    const showModal = () => {
        setModalStatus(true)
    }
    const handleCancel = () => {
        setModalStatus(false)
    }

    useEffect(() => {
        dispatch(getStreets())
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetMessages())
        }, 6000)
    }, [dispatch, errorMessage, successMessage])

    return (
        <div className={styles.App}>
            <h1 className={styles.title}>Dispex</h1>
            <div className={'cardBg'}>
                <h2 className={styles.cardHeading}>Выберите квартиру</h2>
                <FindAddressForm/>
                <Button block onClick={showModal} type="primary" disabled={!isChosenApartment}>
                    Добавить жильца
                </Button>
                <Popover content={<p style={{margin: 0}}>все корпуса  + привязываться к квартирам, а не к подъездам и домам</p>}>
                    <p className={styles.tip}><b>Адрес для тестов:</b> Федюнинского 30</p>
                </Popover>
            </div>
            <Clients/>
            {modalStatus &&
            <Modal footer={null}
                   title="Добавить жильца по адресу:"
                   visible={modalStatus}
                   onCancel={handleCancel}
            >
                <CreateClientForm/>
            </Modal>}
            {successMessage || errorMessage
                ? <div className={styles.commonAlert}>
                    <Alert message={successMessage || errorMessage} type={errorMessage ? 'error' : 'success'} showIcon
                           closable closeText="Закрыть Х"/>
                </div> : null}
        </div>
    );
}

export default App;
