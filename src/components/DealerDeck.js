//css
import { useEffect } from 'react'
import './DealerDeck.scss'

export default function DealerDeck(props) {

     useEffect(() => {
        console.log(props.flipped)
     }, [props.flipped])

     const isFlipped = (flip, index) => {
        console.log(index)
        if(flip || index === 0) {
            return 'is-flipped'
        }
        else {
            return ''
        }
     }

     return(
        <div className='game__table__dealer'>
            {props.deck.map((card, index) => (
                <div className={`game__table__dealer__card ${isFlipped(props.flipped, index)}`} key={card.code}>
                    <img className='game__table__dealer__card__face game__table__dealer__card__face--front' src={card.image}/>
                    <div className={`game__table__dealer__card__face game__table__dealer__card__face--back`}></div>
                </div>
            ))}
        </div>
     )
}