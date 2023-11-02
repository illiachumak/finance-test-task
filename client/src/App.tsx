import { useEffect, useState} from "react";
import { useAppDispatch } from "./redux/store";
import './index.css'
import TickerTable from "./components/Table";
import { startSocketListening, stopSocketListening } from "./redux/Slices/contentThunk";
import SettingsModal from "./components/Modal/SettingsModal";
import SettingsBtn from "./components/SettingsBtn";



const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startSocketListening());

    return () => {
      dispatch(stopSocketListening());
    };
  }, [dispatch]);

  return (
    <>
    <SettingsBtn/>
    <TickerTable/>
  </>
  );
};

export default App;
