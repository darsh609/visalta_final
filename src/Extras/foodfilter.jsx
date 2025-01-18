import React, { useEffect, useState } from 'react'
import { filterData } from '../datas/filters'
import { Sidebar } from './Sidebar'
import food from '../datas/food.json'
import Food from './food'
import { Searchbarr } from './Searchbarr'
import { Foodcompo } from './Foodcompo'


const Foodfilter = () => {

    const[restaurants,setrest]=useState([]) 
    const[search, setSearch] = useState("")
    const[allfilt,setfilt]=useState([])
    // const [is,setis]=useState(true)
    // const filterHandler((ele)=>{
    // })

   

    useEffect(() => {
       setrest([])
      food.map((ele)=>{
        // console.log(ele,"->")
        setrest(old=>[...old,ele])

        allfilt?.map((e)=>{
          // console.log(ele.fil
          
          if(!ele.filters
            .includes(e)){
              setrest(l => l.filter(item => item !== ele))
          }
        })

    
        

      })

    },[allfilt])
    


  return (
    <div>
      hloo bhai
      <div className=' ml-[1200px]'><Searchbarr search={search} setSearch={setSearch} restaurants={restaurants} allfilt = {allfilt} setrest={setrest}/></div>
    
    <div>
       
       
       
 <div className=' bg-teal-500   w-80 text-left'>
        <Sidebar restaurants={restaurants} allfilt={allfilt} filterData={filterData}
        setfilt={setfilt} setrest={setrest}/>
        
            

 </div>
 <div>
  {
    allfilt?.length>0?
    /////////////////////////////if filter exist
    search?<div>
      <div className=' bg-amber-500'>
                    {
                    restaurants.filter((ele)=>{
                        const searchTerm=search.toLowerCase()
                          const ans=ele.Name.toLowerCase()
                          return( searchTerm && ans.startsWith(searchTerm)&& ans!==searchTerm);
                      }
                      ).slice(0,10).map((ele,i)=>(
                        <div key={i}>

                        <div className=''>
                        <img src={ele.Img}></img>
                          {/* IMage */}
                          {/* <img src="icon1.png"> </img>  */}
                        </div>
                    
                    
                        <div>
                          {/* Name */}
                            {ele.Name}
                            <div className='  bg-blue-500'>
                              {/* arrow  for visit */}
                           <a href={ele.Visit} target="_blank"> 
                           {/* arrow */}
                           click here
                           </a>
                              </div>
                    
                              <div>
                                {ele.Timing}
                                </div>
                            
                          
                            </div>
                    
                    
                        <div className=''>
                          {/* tags */}
                            <div className=''>
                            {ele.filters + " "}
                            </div>
                           
                         </div>
                    
                    
                          </div>
                      ))
                    }

                </div>
    </div>: 
   <div><Foodcompo food={restaurants}/> </div>
    
    :
    ///////////////////////if no filter exist
    search?<div>
                    
                    
    {
    food.filter((ele)=>{
        const searchTerm=search.toLowerCase()
          const ans=ele.Name.toLowerCase()
          return( searchTerm && ans.startsWith(searchTerm));
      }
      ).slice(0,5).map((ele,i)=>(
        <div key={i}>

        <div className=''>
        <img src={ele.Img}></img>
          {/* IMage */}
          {/* <img src="icon1.png"> </img>  */}
        </div>
    
    
        <div>
          {/* Name */}
            {ele.Name}
            <div className='  bg-blue-500'>
              {/* arrow  for visit */}
           <a href={ele.Visit} target="_blank"> 
           {/* arrow */}
           click here
           </a>
              </div>
    
              <div>
                {ele.Timing}
                </div>
            
          
            </div>
    
    
        <div className=''>
          {/* tags */}
            <div className=''>
            {ele.filters + " "}
            </div>
           
         </div>
    
    
          </div>

      ))
    }
    
    </div>:
    <div className=' mt-60'>
      <Foodcompo food={food}/>
       </div>
    
  }

 </div>


    </div>








    </div>
  )
}
export default Foodfilter
