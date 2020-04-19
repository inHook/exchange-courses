export const URL = "https://api.exchangeratesapi.io/";

export const PARAMS = {
    RUB: "RUB",
    EUR: "EUR",
    USD: "USD",
    SYMBOLS: "symbols",
    BASE: "base",
};

export const GET_RATES = {
    dateCourse(date) {
        return `${URL}${date}?${PARAMS.SYMBOLS}=${PARAMS.USD},${PARAMS.EUR}&${PARAMS.BASE}=${PARAMS.RUB}`;
    }
};