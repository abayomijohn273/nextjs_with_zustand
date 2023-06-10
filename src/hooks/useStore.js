import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";

const useStore = (store, callback) => {
    const result = store(callback, shallow);
    const [data, setData] = useState();

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
}

export default useStore;