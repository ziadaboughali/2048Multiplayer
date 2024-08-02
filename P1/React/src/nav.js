import './App.css';
export default function Nav() {
    return (
        <nav className="navbar" style={{width: '100%', height: '100%', background: '#D9D9D9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}} >
                    {/* <img src="logo.png" alt="Logo" /> */}
                    
                        {<div className="logo" >
                            <div style={{width: 97, height: 29, left: 48, top: 5, position: 'absolute', background: '#3C566C', borderRadius: 20}} />
                            <div style={{width: 79, height: 29, left: 57, top: 3, position: 'absolute', color: '#D9DCD2', fontSize: 28, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '900', wordWrap: 'break-word'}}>2048</div>
                        </div>}
                    

                        {/* { <h1 >My Portfolio</h1 >  } */}
                </nav>
            );
        }
            
            
            

        
         
        
        

        
        
        
    //     </nav>
    // );
    // }
