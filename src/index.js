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
function calcularGanador(cuadrado) {
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
        if (cuadrado[a] && cuadrado[a] === cuadrado[b] && cuadrado[a] === cuadrado[c]) {
            return cuadrado[a];
        }
    }
    return null;
}
function Cuadrado(props) {
    return (
        <button className="cuadrado" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
   /* constructor(props) {
        super(props);
        this.state = {
            cuadrado: Array(9).fill(null),
            turno: true,
        };
    }*/

    renderSquare(i) {
       /* return <Cuadrado value={this.state.cuadrado[i]}
        onClick={() => this.handleClick(i)}/>;*/
       return ( <Cuadrado value={this.props.cuadrado[i]}
        onClick={() => this.props.onClick(i)}/>
    );

    }

    render() {
        /*const winner = calcularGanador(this.state.cuadrado);
        let status;
        if (winner) {
            status = 'Jugador Ganador : ' + winner + ' Perderdor '+(this.state.turno ? '1 = X' : '2 = O');
        } else {
            status = 'Turno del Jugador: ' + (this.state.turno ? 'X' : 'O');
            status = 'Turno del Jugador: ' + (this.state.turno ? '1 = X' : '2 = O');
        }*/


        return (
           /* <div className="status">{status}</div>*/
            <div>

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
            historia: [{
                cuadrado: Array(9).fill(null),
            }],
            stepNumber: 0,
            turno: true,
        };
    }
    handleClick(i) {
        const historia = this.state.historia.slice(0, this.state.stepNumber +1);
        const current = historia[historia.length - 1];
        const nuevoCuadrado = current.cuadrado.slice();
        if (calcularGanador(nuevoCuadrado) || nuevoCuadrado[i]) {
            return;
        }
        //newsquares[i] = this.state.xIsNext ? 'X' : 'O';
        if(this.state.turno){
            nuevoCuadrado[i] = 'X';
        }else{
            nuevoCuadrado[i] = 'O';
        }

        console.log(nuevoCuadrado[i])


        this.setState({
            historia: historia.concat([{
                cuadrado: nuevoCuadrado,
            }]),
            stepNumber: historia.length,
            turno: !this.state.turno,
        });

    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            turno: (step % 2) === 0,
        });
    }
    render() {

        const historia = this.state.historia;
        const current = historia[this.state.stepNumber];
        const ganador = calcularGanador(current.cuadrado);
        const movimiento = historia.map((step, movimiento) => {
            const desc = movimiento ?
                'Siguiente movimiento #' + movimiento :
                'Iniciar el juego';
            return (
                <li key={movimiento}>
                    <button onClick={() => this.jumpTo(movimiento)}>{desc}</button>
                </li>
            );
        });



        let estado;
        if (ganador) {
            estado = 'Jugador Ganador : ' + ganador + ' Perderdor jugador'+(this.state.turno ? '1 = X' : '2 = O');
        } else {
            estado = 'Siguiente Judador: ' + (this.state.turno ? 'X' : 'O');
        }
        return (
            <div className="game">

                <div className="game-board">
                    <Board
                        cuadrado={current.cuadrado}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{estado}</div>
                    <ol>{movimiento}</ol>
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
