import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}*/
function calcularGanador(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            turno: true,
        };
    }
    handleClick(i) {
        const newsquares = this.state.squares.slice();
        if (calcularGanador(newsquares) || newsquares[i]) {
            return;
        }
        //newsquares[i] = this.state.xIsNext ? 'X' : 'O';
        if(this.state.turno){
            newsquares[i] = 'X';
        }else{
            newsquares[i] = 'O';
        }

        console.log(newsquares[i])
        this.setState({
            squares: newsquares,
            turno: !this.state.turno,
        });
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}/>;

    }

    render() {
        const winner = calcularGanador(this.state.squares);
        let status;
        if (winner) {
            status = 'Jugador Ganador : ' + winner + ' Perderdor '+(this.state.turno ? '1 = X' : '2 = O');
        } else {
            status = 'Turno del Jugador: ' + (this.state.turno ? 'X' : 'O');
            status = 'Turno del Jugador: ' + (this.state.turno ? '1 = X' : '2 = O');
        }


        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
