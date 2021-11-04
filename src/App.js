import './App.css';
import {useEffect} from "react";
import {FindAddressForm} from "./Components/FindAddressForm/FindAddressForm";
import {useDispatch} from "react-redux";
import {getStreets} from "./redux/addressReducer/addressReducer";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStreets())
    }, [dispatch])

    return (
        <div className="App">
            <h1>Dispex</h1>
            <FindAddressForm />
        </div>
    );
}

export default App;
