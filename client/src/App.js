
import React, { useEffect, useState } from "react";

function App() {

  const [file, setfile] = useState()
  const [list, setlist] = useState([])
  const [change, setchange] = useState(0)
  const [del, setdel] = useState(0)
  const [image, setimage] = useState("14-img.png")

  useEffect(()=>{
    fetch("/images/get")
    .then(res => res.json())
    .then(res => setlist(res))
  },[change])

  return (
    <div>
      
      

      <div className="container-fluid">
      <div className="row mg">
      <button className="secret" onClick={()=>{
        let pass = prompt("")
        if (pass === "tom-crude")
        {window.localStorage.setItem("password", "on")}

    }}>.</button>
    
      <h1 className="col-12 text-center mt-4 mb-4 display-2">Select an image</h1>
      <form onSubmit={async(e)=>{e.preventDefault();

      if (file == null){alert("You can't send an empty file"); return}
      if (file.size > 1000000){alert("The image must not weigh more than 1 mb"); return}
      if (file.type !== "image/jpeg" &&  file.type !== "image/png"){alert("You can only upload PNG or JPG images"); return}


      setfile(null)
      document.querySelector(".imag").value = ""
      const formdata = new FormData()
      formdata.append("image", file)


      await fetch("/images", {
        method: "POST",
        body: formdata
      })
      .then(res =>{res.text()})
      .then(res => console.log(res))
      .catch(err => console.error(err))

      setchange(change + 1)
      window.alert("Images may take a while to load")
      
      }} className="col-12 bg-light">
          <input className="imag col-12 mb-4 mb-xl-1 bb col-xl-8" onChange={(e)=>{setfile(e.target.files[0]); console.log(e.target.files[0])}} required type="file" />
          <input className="col-12 bb col-xl-3 blue" type="submit"/>
      </form>
      </div>
     <h2 className={list.length === 0 ? "text-center mt-4 load" : "inactive"}>loading images...</h2>
      
      <div className="mt-4 col-12 text-center con">
        {list.map((stat) => {

          const ids = stat.split("-")
          const id =parseInt(ids[0])
          
          if (window.localStorage.getItem("password") === "on"){
          
            return (
            <div className="mt-5">
              <div className="del">
            <img onClick={()=>{
              setimage(stat)
              setdel(1);
            }} className="imgs" src={`/${stat}`} alt={stat}/>
            </div>
            <div className="col-12 del mt-2">
            <button className=" col-2 delete" onClick={async()=>{
               await fetch(`/images/delete/` + id, {
                method: "DELETE"
              })
              .then(res =>{res.text()})
              .then(res => console.log(res))
            .catch(err => console.error(err))
             setchange(change + 1)

            window.alert("Image deleted")
              }}>🗑</button>
            </div>
            </div>
          )}
            else {
              return (
                <div className="mt-5">
                  <div className="del">
            <img onClick={()=>{
              setimage(stat)
              setdel(1);
            }} className="imgs" src={`/${stat}`} alt={stat}/>
            </div>
            </div>
              )
            }

        })}
      </div>
      
      </div>

          </div>
    
  );
}

export default App;
