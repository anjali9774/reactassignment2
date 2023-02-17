import { useState, useEffect} from 'react';
import Select from "react-select"

import './Form.css'

const options = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'JS', label: 'JS' },
  {value:"NODE",label:"NODE"}
]

const Form = ()=>{
    const [formValues, setFromValues] = useState({"name":"","email":"","password":""})
    const [select, setSelect] = useState([])
    const [selectPlaceHolder, setSelectPlaceHolder] = useState("Choose Skills")
    const [active, setActive] = useState(false)
    const [header,setHeader]= useState("Try it free 7 days then ₹180/mo. thereafter")
    const handleChange = (e)=>{
        setFromValues({...formValues,[e.target.name]:e.target.value})
    }
    const handleSelect = (e)=>{
        
        setSelect([...e])
        console.log(e) 
        console.log(select) 
    }
    const claimTrial= ()=>{
        setHeader("You have subscribed successfully")
        setFromValues({"name":"","email":"","password":""})
        setSelect([])
        setActive(false)
        setSelectPlaceHolder((prev)=>prev)
    }
    const isFromSubmit =()=>{
        for (const value in formValues) {
            if(formValues[value].length===0){
                return false
            }
        }
        return true
    }
    useEffect(()=>{

        if(select.length>0 && isFromSubmit()){
            setActive(true)
        }
    },[select,formValues])
    return(
        <div className='formMain'>
            <div className='formHeader'>{header}</div>
            <div className='formBody'>
                <input name='name'  type="text" placeholder='Name' onChange={handleChange} value={formValues.name}/>
                <input name="email" type="email" placeholder='Email Address' onChange={handleChange} value={formValues.email}/>
                <input name='password' type="password" placeholder='Password' onChange={handleChange} value={formValues.password}/>
                <Select className='formSelect' options={options}  placeholder={selectPlaceHolder} onChange={handleSelect} isMulti value={select}  isClearable={true} hideSelectedOptions={true}/>
                {active?<button className='form-button-active'   onClick={claimTrial}>CLAIM YOUR FREE TRIAL</button>:<button className='form-button'>CLAIM YOUR FREE TRIAL</button>}
            <div className='Disclaimer'>By clicking the button you are agreeing to our <span style={{color:"red"}}>Terms and Services</span></div>
            </div>
        </div>
    )
}

export default Form;