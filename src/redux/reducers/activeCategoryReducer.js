export default function activeCategoryReducer(state, action) {
    switch (action.type) {
        case "ACTIVE_CATEGORY":
            console.log("active cateogry reducer HERE");
            return {
                ...state,
                activeCategory: action.payload
             };
        default:
            console.log("DEFAULT active cateogry action HERE");
            return {...state};
    }
}