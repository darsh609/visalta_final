import React from 'react'
import worship from '../datas/worship.json'
import { Link, Navigate, useNavigate } from 'react-router-dom';
 const Worship = () => {
  const navigate=useNavigate();
  return (
    <div>
      {
        worship.map((ele,i)=>(
          <div key={i}>
            <div>
            {ele.GodName}
            </div>
            

          </div>
        ))

        
      }
    </div>
  )
}
export default Worship




