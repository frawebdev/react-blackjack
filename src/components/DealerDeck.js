//css
import { useEffect } from 'react'
import './DealerDeck.scss'

export default function DealerDeck(props) {

     useEffect(() => {
        console.log(props.flipped)
     }, [props.flipped])

     const isFlipped = (flip) => {
        if(flip) {
            return 'is-flipped'
        }
        else {
            return ''
        }
     }

     return(
        <div className='game__table__dealer'>
            {props.deck.map((card, index) => (
                <div className={`game__table__dealer__card ${isFlipped(props.flipped)}`} key={card.code}>
                    <img className='game__table__dealer__card__face game__table__dealer__card__face--front' src={card.image}/>
                    <div className={`game__table__dealer__card__face game__table__dealer__card__face--back`}></div>
                </div>
            ))}
        </div>
     )
}