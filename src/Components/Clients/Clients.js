import React, {useState} from "react";
import styles from './Client.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Modal, Popover} from "antd";
import {removeClient} from "../../redux/clientsReducer/clientsReducer";
import {EditClientForm} from "../EditClientForm/EditClientForm";

export const Clients = () => {
    const clients = useSelector(state => state.clients.clients)
    const clientsText = useSelector(state => state.clients.clientsText)
    const dispatch = useDispatch()

    const [modalStatus, setModalStatus] = useState(false)
    const [clientPhone, setClientPhone] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientName, setClientName] = useState('')
    const [clientId, setClientId] = useState(0)
    const [clientBindId, setClientBindId] = useState(0)

    const showModal = (phone, email, name, id, bindId) => {
        setClientPhone(phone)
        setClientEmail(email)
        setClientName(name)
        setClientId(id)
        setClientBindId(bindId)
        setModalStatus(true)
    }
    const handleCancel = () => {
        setModalStatus(false)
    }


    const onRemoveClient = (id) => {
        dispatch(removeClient(id))
    }

    return (
        <div className={`cardBg ${styles.wrapper}`}>
            {clientsText && <p className={styles.text}>{clientsText}</p>}
            {clients.map(cl => <div className={styles.item} key={cl.id}>
                <p className={styles.itemInfo}><b>Имя:</b> {cl.name}</p>
                <p className={styles.itemInfo}><b>Email:</b> {cl.email}</p>
                <p className={styles.itemInfo}><b>Телефон:</b> {cl.phone}</p>
                <Popover content={<p style={{margin: 0}}>Редактировать</p>}>
                    <div onClick={() => showModal(cl.phone, cl.email, cl.name, cl.id, cl.bindId)}
                         className={`${styles.icons} ${styles.change}`}>✎
                    </div>
                </Popover>
                <Popover content={<p style={{margin: 0}}>Удалить</p>}>
                    <div onClick={() => onRemoveClient(cl.id)} className={`${styles.icons} ${styles.remove}`}>🕱</div>
                </Popover>
            </div>)}
            {modalStatus &&
            <Modal footer={null}
                   title="Редактировать данные клиента"
                   visible={modalStatus}
                   onCancel={handleCancel}
            >
                <EditClientForm phone={clientPhone}
                                id={clientId}
                                bindId={clientBindId}
                                email={clientEmail}
                                name={clientName}/>
            </Modal>}
        </div>
    )
}