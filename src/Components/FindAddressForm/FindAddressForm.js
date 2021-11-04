import React from "react";
import 'antd/dist/antd.css';
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getApartments, getHouses} from "../../redux/addressReducer/addressReducer";

const { Option } = Select

export const FindAddressForm = () => {
    const dispatch = useDispatch()

    const streets = useSelector(state => state.address.streets)
    const houses = useSelector(state => state.address.houses)
    const apartments = useSelector(state => state.address.apartments)

    const optionsStreets = streets.map(str => <Option key={str.id} value={str.id}>{str.name}</Option>)
    const optionsHouses = houses.map(hs => <Option key={hs.id} value={hs.id}>{hs.name}</Option>)
    const optionsApartments = apartments.map(ap => <Option key={ap.id} value={ap.id}>{ap.flat}</Option>)

    const onStreetSelected = (streetID) => {
        dispatch(getHouses(streetID))
    }
    const onHouseSelected = (houseID) => {
        dispatch(getApartments(houseID))
    }

    console.log(houses)

    return (
        <div>
            <Select placeholder="Улица"
                    onChange={onStreetSelected}
                    style={{ width: 200 }}>
                {optionsStreets}
            </Select>
            <Select placeholder="Дом"
                    onChange={onHouseSelected}
                    style={{ width: 200 }}>
                {optionsHouses}
            </Select>
            <Select placeholder="Квартира" style={{ width: 200 }}>
                {optionsApartments}
            </Select>
        </div>
    )
}