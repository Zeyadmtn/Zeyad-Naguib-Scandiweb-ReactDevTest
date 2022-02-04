export default function activeCurrencyReducer(state = {activeCurrency: "USD",
                                                       activeCurrencySymbol: "$"}, 
                                                       action) {
    switch (action.type) {
        case "ACTIVE_CURRENCY":
            return {
                ...state,
                activeCurrency: action.payload.label,
                activeCurrencySymbol: action.payload.symbol
             };
        default:
            return state;
    }
}