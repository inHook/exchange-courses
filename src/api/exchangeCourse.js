import axios from "axios";

import {GET_RATES} from "../constants/apiExchangeRates";

export const getCourseQuantityDays = (quantityDays) => {
    if (!quantityDays) return null;

    let count = 0;
    const date = new Date();
    date.setDate(date.getDate() - quantityDays);

    return async () => {
        if (count !== 0) {
            date.setDate(date.getDate() + 1);
        } else {
            count++;
        }

        const dateForRequest = date.toJSON().slice(0, 10);

        return await axios.get(GET_RATES.dateCourse(dateForRequest));
    }
};