//css
import './PlayerDeck.scss'

export default function PlayerDeck(deck) {

     return(
        <div className='game__table__player'>
            {deck.deck.map(card => (
                <div className='game__table__player__card' key={card.code}>
                    <img className='game__table__player__card__image' src={card.image} />
                </div>
            ))}
        </div>
     )
}