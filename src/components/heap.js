import React from "react";

class Heap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [...this.setCardsWithRotate(props.heap)]
        };
    }

    componentWillReceiveProps(newProps) {
        const {heap} = newProps,
            {cards} = this.state;

        heap.length !== cards.length && this.setState({
            cards: [...(heap.length !== cards.length ? [...cards, {...heap[heap.length - 1]}] : [...cards.slice(0, -1)])]
        })
    }
    componentDidUpdate(oldProps) {
        const {heap} = oldProps,
              {cards} = this.state;

        heap.length !== cards.length && this.setState({
            cards: [...this.setCardsWithRotate(cards)]
        })
    }

    setCardsWithRotate(cards) {
        return cards.map((card, i) => card.rotate ? card : {...card, rotate: (Math.floor((Math.random() * 50 - 25) * (i / (i + 2))))})
    }

    render() {
        const {cards} = this.state;
        return <div className='pack heap'>
            {cards && cards.map(({type, color, rotate}, i ) => <div key={i + 'heapCard'}
                                                    className="card"
                                                    style={{transform: `rotate(${rotate || 0}deg)`}}
                                                    data-card-type={type}
                                                    data-color={color}/>)}
        </div>
    }
}
export default Heap;