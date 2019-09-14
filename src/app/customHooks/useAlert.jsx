import React, { useEffect, useState } from 'react';
import { delay } from "../utils/utils";

const useAlert = () => {
    const [showAlert, setStatusAlert] = useState(false);
    const toggleAlert = async () => {
        setStatusAlert(true);
        await delay(3000);
        setStatusAlert(false);
    }
    return [showAlert, toggleAlert];
}
export default useAlert
