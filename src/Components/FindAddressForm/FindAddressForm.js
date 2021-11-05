import React, {useEffect, useState} from "react";
import styles from './FindAddressForm.module.css'
import 'antd/dist/antd.css';
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getApartments, getHouses} from "../../redux/addressReducer/addressReducer";
import {getClientsInApartment} from "../../redux/clientsReducer/clientsReducer";
import {setApartmentID} from "../../redux/clientReducer/clientReducer";

const { Option } = Select

export const FindAddressForm = () => {
    const dispatch = useDispatch()

    const [selectorsStatus, setSelectorsStatus] = useState(false)

    const streets = useSelector(state => state.address.streets)
    const houses = useSelector(state => state.address.houses)
    const apartments = useSelector(state => state.address.apartments)
    // const chosenStreet = useSelector(state => state.address.chosenStreet)
    // const chosenHouse = useSelector(state => state.address.chosenHouse)
    // const chosenApartment = useSelector(state => state.address.chosenApartment)
    const clients = useSelector(state => state.clients)

    const optionsStreets = streets.map(str => <Option key={str.id} value={str.id}>{str.name}</Option>)
    const optionsHouses = houses.map(hs => <Option key={hs.id} value={hs.id}>{hs.name}</Option>)
    const optionsApartments = apartments.map(ap => <Option key={ap.id} value={ap.id}>{ap.flat}</Option>)

    const onStreetSelected = (streetID) => {
        setSelectorsStatus(true)
        dispatch(getHouses(streetID))
    }
    const onHouseSelected = (houseID) => {
        setSelectorsStatus(true)
        dispatch(getApartments(houseID))
    }
    const onApartmentSelected = (apartmentID) => {
        setSelectorsStatus(true)
        dispatch(getClientsInApartment(apartmentID))
        dispatch(setApartmentID(apartmentID))
    }

    useEffect(() => {
        setSelectorsStatus(false)
    }, [streets, houses, apartments, clients])

    return (
        <div className={styles.selectWrapper}>
            <Select loading={selectorsStatus}
                    placeholder="Улица"
                    onChange={onStreetSelected}
                    style={{ width: 200 }}>
                {optionsStreets}
            </Select>
            <Select loading={selectorsStatus}
                    placeholder="Дом"
                    onChange={onHouseSelected}
                    style={{ width: 200 }}>
                {optionsHouses}
            </Select>
            <Select loading={selectorsStatus}
                    placeholder="Квартира"
                    onChange={onApartmentSelected}
                    style={{ width: 200 }}>
                {optionsApartments}
            </Select>
        </div>
    )
}