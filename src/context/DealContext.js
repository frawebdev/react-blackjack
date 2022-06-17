import { createContext, useState } from "react"

export const DealContext = createContext()

// const dealReducer = (state, action) => {
//     switch(action.type) {
//         case 'CHANGE_AMOUNT': 
//             return { ...state, amount: action.payload }
//         default:
//             return state
//     } 
// }

export function DealProvider({ children }) {

    // const [state, dispatch] = useReducer(dealReducer, { money: 100 })

    // const changeAmount = (amount) => {
    //     dispatch({ type: 'CHANGE_AMOUNT' , payload: amount })
    // }

    const [ moneyAmount, setMoneyAmount ] = useState(100)

    return (
        <DealContext.Provider value={{ moneyAmount, setMoneyAmount }}>
            {children}
        </DealContext.Provider>
    )
}