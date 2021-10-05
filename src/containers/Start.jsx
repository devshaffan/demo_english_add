import React from 'react';
import Button from '../components/Button';
// import Input from '../components/Input';
import { Session } from '../utils/storage'
import ReactTypingEffect from 'react-typing-effect';

class Start extends React.Component {

    state = {
        player: "player"
    }

    setNameOfPlayer = (event) => {
        this.setState({ player: event.target.value })
    }

    clicked = () => {
        Session.set("onlinePlayer", this.state.player)
        this.props.startPressed();
    }

    render() {
        return (
            <div>
                <div className="App-brandname">
                    <i className="fas fa-graduation-cap"></i>
                    <br />
                    <ReactTypingEffect
                        text={["Today we will be solving some fun Math Problems!!!"]}
                        cursorRenderer={cursor => <h1>{cursor}</h1>}
                        speed={70}
                        eraseSpeed={70}
                        eraseDelay={200}
                        displayTextRenderer={(text, i) => {
                            return (
                                <h3>
                                    {text.split('').map((char, i) => {
                                        const key = `${i}`;
                                        return (
                                            <span
                                                key={key}
                                                style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                            >{char}</span>
                                        );
                                    })}
                                </h3>
                            );
                        }}
                    />
                    {/* <h3>Do You Know</h3>
                    <h1>Math?</h1> */}
                </div>
                <p>
                    Press to start the game
                </p>
                <Button isClicked={this.clicked}>Start</Button>
            </div>
        )
    }
}
export default Start;