import React, {useEffect, useState} from "react";
import styles from './FindAddressForm.module.css'
import 'antd/dist/antd.css';
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getApartments, getHouses} from "../../redux/addressReducer/addressReducer";
import {getClientsInApartment} from "../../redux/clientsReducer/clientsReducer";
import {setApartmentID} from "../../redux/clientReducer/clientReducer";

const {Option} = Select

export const FindAddressForm = () => {
    const dispatch = useDispatch()

    const [selectorsStatus, setSelectorsStatus] = useState(false)

    const streets = useSelector(state => state.address.streets)
    const houses = useSelector(state => state.address.houses)
    const apartments = useSelector(state => state.address.apartments)
    const clients = useSelector(state => state.clients.clients)

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
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{width: 200}}>
                {optionsStreets}
            </Select>
            <Select loading={selectorsStatus}
                    placeholder="Дом"
                    onChange={onHouseSelected}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{width: 200}}>
                {optionsHouses}
            </Select>
            <Select loading={selectorsStatus}
                    placeholder="Квартира"
                    onChange={onApartmentSelected}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{width: 200}}>
                {optionsApartments}
            </Select>
        </div>
    )
}