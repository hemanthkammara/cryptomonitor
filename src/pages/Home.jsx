import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Home=()=>{
    const [data,setData]=useState([]);
    const[curr,setCurr]=useState("INR");
    const [page, setPage] = useState(1);
    const[search,setSearch]=useState("")
    const navigate=useNavigate();


    const handleClick=(e)=>{
  console.log(e)
    }

    const fetchData=async(currency)=>{
        let res=await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
        let arr=await res.json();
        console.log(arr)
        setData(arr)
    }

    const handleSearch = () => {
        if(search==""){
           return data
        }else{

            return data.filter(
              (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
            );
        }
      };

    useEffect(()=>{
   fetchData(curr)
    },[curr])
console.log(handleSearch())
    return(
        <DIV>

            <div className="navbar">

                <p className="heading">Crypto Monitor</p>

        <select name="curr" id="" onChange={(e)=>{setCurr(e.target.value)}}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
        </select>

            </div>


        <input type="text" placeholder="Search Crypto" onChange={(e)=>{setSearch(e.target.value)}} />
      
      <table  >
        <thead>
           <tr className="trr">
            <th style={{width:"7%"}}>coin</th>
            <th></th>
            <th>price</th>
            <th>24h change</th>
            <th>Market cap</th>
           </tr>
        </thead>
        <tbody>
            {data.length>0 && handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((el,i)=>{
                return <tr key={i} onClick={()=>{navigate(`singlecoin/${el.id}`)}}>
                    <td style={{width:"6%"}}><img style={{width:"90%"}} src={el.image} alt="" /></td>
                    <td> <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {el.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {el.name}
                            </span>
                          </div></td>

                          <td>{curr=="INR"?"₹":"$"} {el.current_price.toFixed(2)}</td>
                          <td style={{color:el.price_change_percentage_24h > 0?"green":"red"}}>{el.price_change_percentage_24h > 0?"+":""}{el.price_change_percentage_24h.toFixed(2)}</td>
                          <td>{curr=="INR"?"₹":"$"} {el.market_cap.toString().slice(0, -6)}</td>
                </tr>
            })}
        </tbody>
      </table>
      <div className="pagination">
      {new Array(Math.max(0, Math.ceil(handleSearch()?.length / 10))).fill().map((e,i)=>{
        return <button key={i} style={{color:page==i+1?"blue":"",border:page==i+1?"1px solid blue":""}} onClick={()=>{setPage(i+1)}}>{i+1}</button>
      })}

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

    input{
        display: block;
        width: 30%;
        padding: 15px;
        border: 1px solid lightgray;
        border-radius: 5px;
        outline: none;
        margin: auto;
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 10px;

    }
    p{
        width: 70%;
    }

    table{
        border-collapse: collapse;
        width: 80%;
        margin: auto;
        border: 1px solid lightgray;
        padding: 30px;
        border-radius: 30px;
    }
    tr{
      //  background-color: lightgray;    
       //border: 1px solid red;
       
    }

    table td{
        padding: 10px;
        //border: 1px solid #ccc;
        border-bottom: 1px solid lightgray;
       margin: 0px;
       //text-align: center;
       
    }
    table th{
        padding: 15px;
        border-bottom: 1px solid lightgray;
        margin: 0px;
        text-align: left;
        height: 50px;
        text-transform: uppercase;
        color: #EEEEEE;
        background-color: #31363F;


    }

    .pagination{
     
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
    .pagination button{
        width: 40px;
        height: 40px;
        border: none;
        background-color: white;
        border-radius: 25px;
    }

`