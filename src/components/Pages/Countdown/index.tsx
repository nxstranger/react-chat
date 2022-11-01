import React, {useEffect, useState} from "react";
import styled from "styled-components";


const BackgroundDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Holder = styled.div`
  width: 80%;
  height: 80%;
  background: #e7e7e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
  box-shadow: 0 0 5px #e7e7e7;
`;

const MainEventHeader = styled.div`
  margin-bottom: 5%;
  //background: beige;
  width: 500px;
  text-align: center;
  font: 1em Georgia;
`;

const Counter =styled.div`
  font: 1em Georgia;
`

const CenterRing = styled.div`
  width: 30vh;
  height: 30vh;
  border-radius: 50%;
  background: #61dafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0  0 5px #61dafb; 
`

const getValue = (value: number) => {
    if (value === 0) return '00';
    return (value < 10) ? '0' + value : '' + value;
}

const countDownDate = new Date("Sep 9, 2022 17:10:00").getTime();

const CountdownFrame = () => {
    const [days, setDays] = useState<string>('00')
    const [hours, setHours] = useState<string>('00')
    const [minutes, setMinutes] = useState<string>('00')
    const [seconds, setSeconds] = useState<string>('00')
    useEffect(() => {
        let xxx = setInterval(function() {

            let now = new Date().getTime();
            let distance = countDownDate - now;
            let d = Math.floor(distance / (1000 * 60 * 60 * 24));
            let ds = getValue(d);
            setDays(ds);
            let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            let hs = getValue(h);
            setHours(hs);
            let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let ms = getValue(m);
            setMinutes(ms);
            let s = Math.floor((distance % (1000 * 60)) / 1000);
            let ss = getValue(s);
            setSeconds(ss);
            if (distance <= 0) {
                clearInterval(xxx);
            }
        }, 1000);

    }, [])
    return (
        <BackgroundDiv>
            <Holder>
                <MainEventHeader>THE MAIN EVENT OF WEEK IS COMING...</MainEventHeader>
                <CenterRing>
                    <Counter>
                        {days}D : {hours}H : {minutes}M : {seconds}S
                    </Counter>
                </CenterRing>
            </Holder>
        </BackgroundDiv>
    )
}

export default CountdownFrame;
