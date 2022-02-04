export default function activeCategoryReducer(state = {activeCategory: "all"}, action) {
    switch (action.type) {
        case "ACTIVE_CATEGORY":
            return {
                ...state,
                activeCategory: action.payload
             };
        default:
            return state;
    }
}