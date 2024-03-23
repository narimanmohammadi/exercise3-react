import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../style/Style.scss'

const Stage = () => {

    const [chairs, setChair] = useState();
    const [chairsClassA, setChairsClassA] = useState([]);
    const [chairsClassB, setChairsClassB] = useState([]);
    const [chairsClassC, setChairsClassC] = useState([]);
    const [chairsClassD, setChairsClassD] = useState([]);
    const [count, setCount] = useState(0);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        fetch('/json/chairs.json')
            .then(response => response.json())
            .then(data => setChair(data.chairs))
    }, [])

    useEffect(() => {
        if (chairs !== undefined) {
            getData();
        }
    }, [chairs])

    const getData = () => {
        chairs.map((chair) => {
            var section = "";
            section = chair.section;
            switch (section) {
                case "A":
                    setChairsClassA(chairsClassA => [...chairsClassA, chair])
                    break;
                case "B":
                    setChairsClassB(chairsClassB => [...chairsClassB, chair])
                    break;
                case "C":
                    setChairsClassC(chairsClassC => [...chairsClassC, chair])
                    break;
                case "D":
                    setChairsClassD(chairsClassD => [...chairsClassD, chair])
                    break;
                default:
                    break;
            }
        })
    }
    const changeButton = (event) => {
        var classname = event.target.className;
        switch (classname) {
            case '':
                event.target.className = 'selected'
                break;
            case 'selected':
                event.target.className = 'Temporary'
                break;
            case 'Temporary':
                event.target.className = 'reservation'
                break;

            default:
                break;
        }
        chairs.map((chair) => {
            var chairNumber = chair.number;
            var chairEvent = event.target.value;
            if (chairNumber == chairEvent) {
                switch (chair.state) {
                    case "unselected":
                        chair.state = "selected"
                        break;
                    case "selected":
                        chair.state = "Temporary"
                        break;
                    case "Temporary":
                        chair.state = "reservation"
                        setCount((prevCount) => prevCount + 1)
                        setSum((prevSum) => prevSum + chair.price)
                        break;
                    case "reservation":
                        alert(`صندلی شماره ${chair.number} رزرو شده است`)
                        break;
                    default:
                        break;
                }
            }
        }
        )
    }

    return (
        <>
            <div>
                <Header count={count} sum={sum} />
            </div>
            <div className='main'>
                <div className='stage'>
                    <div className='classB'>
                        {chairsClassB.map((chair) => (
                            <div key={chair.number.toString()} className='buttonContainer'>
                                <button value={chair.number} onClick={changeButton}>{chair.number}</button>
                                <span> price :{chair.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className='classA'>
                        {chairsClassA.map((chair) => (
                            <div key={chair.number.toString()} className='buttonContainer'>
                                <button value={chair.number} onClick={changeButton}>{chair.number}</button>
                                <span> price :{chair.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className='classC'>
                        {chairsClassC.map((chair) => (
                            <div key={chair.number.toString()} className='buttonContainer'>
                                <button value={chair.number} onClick={changeButton}>{chair.number}</button>
                                <span> price :{chair.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='classD'>
                    {chairsClassD.map((chair) => (
                        <div key={chair.number.toString()} className='buttonContainer'>
                            <button value={chair.number} onClick={changeButton}>{chair.number}</button>
                            <span> price :{chair.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>


    )
}

export default Stage