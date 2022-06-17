import { createContext, useReducer } from "react"

export const DealContext = createContext()

const dealReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_AMOUNT': 
            return { ...state, amount: action.payload }
        default:
            return state
    } 
}

export function DealProvider({ children }) {

    const [state, dispatch] = useReducer(dealReducer, { money: 100 })

    const changeAmount = (amount) => {
        dispatch({ type: 'CHANGE_AMOUNT' , payload: amount })
    }

    return (
        <DealContext.Provider value={{ ...state, changeAmount }}>
            {children}
        </DealContext.Provider>
    )
}