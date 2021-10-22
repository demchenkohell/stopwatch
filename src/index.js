import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import './styles.css';
import {interval, Observable} from "rxjs";


//initialize variables for click counter
let wasClicked = false;
let timeout;

//function Timer
export default function Stopwatch() {
    //states for button types and time counting
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState("stop");

    //first button text changing depends on status
    const button_text = () =>{
        if (status === "start"){return "Stop"}
        else{return "Start"}
    };

    //onClick functions
    const start_stop = () => {
        if (status==="start"){setTime(0);setStatus("stop")}
        else{setStatus("start")}
    };
    const reset = () => setTime(0);
    const wait = () => setStatus("wait");

    //double click realization
    const double_click = () =>{
        click$.subscribe()
    };
    const click$ = new Observable(subscriber => {
        if(wasClicked) {
            wasClicked = false
            clearTimeout(timeout)
            wait()
            subscriber.unsubscribe()
        }
        wasClicked = true;
        timeout = setTimeout(() => {
            wasClicked = false;
        }, 300);
    });

    //main re-render timer loop
    useEffect(() => {
        const timer$ = interval(100)
            .subscribe(() => {
                if (status === "start") {
                    setTime(time => time + 1000);
                }
            });
        return () => {
            timer$.unsubscribe()
        };
    }, [status, time]);

    //return function
    return (
        <>
            <div className="timer"> {new Date(time).toISOString().slice(11, 19)}</div>
            <div className="buttons">
                <button className={status} onClick={start_stop}>{button_text()}</button>
                <button className="wait_permanent" onClick={double_click}>Wait</button>
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </>
    );
}

ReactDOM.render(<Stopwatch />, document.getElementById('root'));
