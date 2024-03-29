import { Button, ButtonGroup, MenuItem, Select,InputLabel } from "@mui/material"
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { FormControl } from "@mui/material"
import Groups2Icon from '@mui/icons-material/Groups2';
import "./LeftGuard.css"
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios"
function LeftGuard(props){
    useEffect(()=>{
        console.log(props)
    })
    const [comm,setComm]=useState("comm 1")
    const [commType,setCommType]=useState("Select Community")
    const [Alert,setAlert]=useState("none")
    const navigate=useNavigate()
    const clicked=(e)=>{
        // console.log("hi")
        setComm(e)
        navigate(`/chats?name=${props.name}&comm=${e}`)  
    }
    const navigateCreate=()=>{
        navigate('/create?name='+props.name+'&comm='+props.comm)
    }
    const navigateJoin=()=>{
        navigate('/join?name='+props.name+'&comm='+props.comm)
    }
    const Leave=()=>{
        setAlert("block")
    }
    const LeaveCanceld=()=>{
        setAlert("none")
    }
    const LeaveConformed=()=>{
        setAlert("none")
        axios.post("https://backend-production-c9c7.up.railway.app/LeaveConformed",{user:props.name,comm:props.comm})
        navigate("/chats?name="+props.name)
    }
    if(props.Communities===[]){
        return <div className="leftGuard-Container">
        <img className="logo" src="" alt=""></img>
        <p style={{"width":"100%","height":"0.4vh","backgroundColor":"#1976d2"}}></p>
        <div style={{"style":"flex","alignItems":"center"}}>
        <ButtonGroup orientation="vertical" style={{"margin":"10px"}}>
            <Button style={{"color":"white"}} onClick={navigateCreate}>Create Community</Button>
            <Button style={{"color":"white"}} onClick={navigateJoin}>Join Community</Button>
            <Button>No Community Joined yet</Button>
            <Button style={{"color":"white"}}>Leave Community</Button>
        </ButtonGroup>
        </div>
    </div>
    }
    return <div className="leftGuard-Container">
        
        <p style={{"width":"100%","height":"0.4vh","backgroundColor":"#1976d2"}}></p>
        <div style={{"display":"flex","alignItems":"center","height":"60vh",'flexDirection':'column','justifyContent':"center"}}>
        <ButtonGroup orientation="vertical" style={{'width':'95%'}}>
            <Button style={{"color":"white"}}  startIcon={<AddIcon color="white" />} onClick={navigateCreate}>Create Community</Button>
            <Button startIcon={<Groups2Icon color="white" />} style={{"color":"white"}} onClick={navigateJoin}>Join Community</Button>
            <select style={{"padding":"9px","width":"100%","color":"white","border":"3px solid #0d47a1","background":"transparent","textAlign":"center"}} value={comm} onChange={(e)=>clicked(e.target.value)}>
                <option style={{"background":"#1a237e"}} default >Select Community</option>
                {props.Communities.map((e)=>(
                    <option style={{"background":"#1a237e"}} >{e}</option>
                ))    }    </select> 
            <Button style={{"color":"white"}} startIcon={<ExitToAppIcon color="white" />} onClick={Leave}>Leave Community</Button>
        </ButtonGroup>
        <div style={{"color":"white","display":Alert}}>
            <p>Do you want to leave {props.comm}</p>
            <ButtonGroup style={{"width":"auto"}}>
                <Button color="success"  onClick={LeaveConformed} variant="outlined">Leave</Button>
                <Button color="error" onClick={LeaveCanceld} variant="outlined">Cancle</Button>
            </ButtonGroup>
        </div>
        </div>
    </div>
}
export default LeftGuard