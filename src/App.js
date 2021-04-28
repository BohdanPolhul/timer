import React from "react";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import { interval, Subject, Observable } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import './App.css'
export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
 
  useEffect(() => {
    const unsub$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsub$))
      .subscribe(() => {
        if (status === "run") {
          setSec(val => val + 1000);
        }
      });
    return () => {
      unsub$.next();
      unsub$.complete();
    };
  }, [status]);
 
  const start = React.useCallback(() => {
    setStatus("run");
  }, []);
 
  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);
  let timer;
  const wait = React.useCallback(() => {
    if(timer){
      setStatus("wait");
      clearTimeout(timer)
      timer=0;
      return;
    }
    timer = setTimeout(function(){
      timer=0;
    },300)
  }, []);
  const reset = React.useCallback(() => {
    setSec(0);
  }, []);
  return (
    <div className="App">
      <h1>Таймер</h1>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <div>
        <button className="start" onClick={start}>Start</button>
        <button className="stop" onClick={stop}>Stop</button>
        <button className="wait" onClick={wait}>Wait</button>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
      
      
    </div>
  );
}
 
render(<App />, document.getElementById("root"));