import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Chart, CategoryScale,LinearScale ,PointElement,LineElement} from 'chart.js';
import styled from "styled-components";
Chart.register(CategoryScale,LinearScale,PointElement,LineElement);


export const SinglePage=()=>{

    const { id } = useParams();
    const [coin, setCoin] = useState();
    const[days,setdays]=useState(365);
   const [currency,setCurrency]=useState("INR")
    const[historyData,setHistoryData]=useState([]);
   

    const fetchDataSingleCoin=async(id)=>{
        let res=await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        let val=await res.json();
        console.log(val);
        setCoin(val)

    }
    const fetchHistoryData=async(id,currency,days)=>{
        let res=await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        let val=await res.json();
        setHistoryData(val.prices)
    }

    useEffect(()=>{
        fetchHistoryData(id,currency,days);
        fetchDataSingleCoin(id);

    },[days])
   




    return(
        <DIV>

            <div className="navbar">

            <p className="heading">Crypto Monitor</p>

            <select name="curr" id="" onChange={(e)=>{setCurrency(e.target.value)}}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            </select>

            </div>
       
        <div style={{display:"flex",flexDirection:"row"}}>
        <div className="detailsDiv" style={{width:"30%"}}>
      
        <div>
        <img
          src={coin?.image.large}
          alt={coin?.name}
         
        />
        <h2>{coin?.name}</h2>
        </div>

        <p>{coin?.description.en.split(". ")[0]}</p>
        <div></div>
        <div></div>
        <div></div>
        <p> <b>Rank </b>:  {coin?.market_cap_rank}</p>
        <p><b>Current Price </b>:   {currency=="INR"?"₹":"$"} {coin?.market_data.current_price[currency.toLowerCase()]}</p>
        <p><b>Market Cap </b>:  {currency=="INR"?"₹":"$"} {coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)}</p>


        </div>
        <div style={{width:"65%"}}>

    <div className="chartDiv" style={{width:"100%",margin:"auto",padding:"20px",borderRadius:"10px"}}>

    {historyData.length>0 && <Line
                data={{
                    labels: historyData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                    {
                        data: historyData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "green",
                    },
                    ],
                }}
                options={{
                    elements: {
                    point: {
                        radius: 1,
                    },
                    },
                }}
                />}
    </div>
    <div className="buttonsDiv">
        <button style={{backgroundColor:days==1?"#0775f3":""}} onClick={()=>{setdays(1)}}>24 Hours</button>
        <button style={{backgroundColor:days==30?"#0775f3":""}} onClick={()=>{setdays(30)}}>30 Days</button>
        <button style={{backgroundColor:days==90?"#0775f3":""}} onClick={()=>{setdays(90)}}>3 Months</button>
        <button style={{backgroundColor:days==365?"#0775f3":""}} onClick={()=>{setdays(365)}}>1 Year</button>
    </div>
        </div>
        </div>
        </DIV>
    )
}

export const DIV=styled.div`
    .navbar{
    display: flex;
    width: 100%;
    margin: auto;
    justify-content:space-around ;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    height: 80px;
    align-items: center;
    margin-bottom: 50px;
    background-color: #222831;
    color: #EEEEEE;
}
.heading{
    color: white;
    font-size: 24px;
}

select{
        border: 1px solid lightgray;
        padding:10px ;
        width: 100px;
        border-radius: 5px;
    }
    .detailsDiv{
        padding-left: 25px;
       
    }

    .detailsDiv div{
        display: flex;
        align-items: center;
        justify-content: space-around;
       gap: 20px;
       width: 50%;
       /* margin: auto; */
    }
    .detailsDiv div img{
      width: 50%;
    } 

    p{
        text-align: left;
        width: 70%;
        display: flex;
        
        color: #4f4d4d;
        line-height: 25px;
    }

    .buttonsDiv{
        margin-top: 20px;
  
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
    }

    .buttonsDiv button{ 
       background-color: white;
       height: 50px;
       width: 100px;
       border: 1px solid #0775f3;
       font-size: 16px;
       border-radius: 5px;

    }

    .chartDiv{
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }


`