import './App.css';



export default function Gamezone() {

    return (

    <div style={{width: '100%', height: '100%', background: '#B1AC9F',paddingTop: 150,  justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{width: 498, height: 498, position: 'relative'}}>
            <div style={{width: 498, height: 498, left: 0, top: 0, position: 'absolute', background: 'rgba(60, 86, 108, 0.74)', borderRadius: 10, backdropFilter: 'blur(10px)'}} />
            <div style={{width: 466, height: 466, left: 16, top: 28, position: 'absolute', background: 'rgba(212, 194, 252, 0.74)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.50)', borderRadius: 10}} />
            
            
            <div>
            
                <div style={{width: 111, height: 17, left: 251, top: 7, position: 'absolute'}}>
                    <div style={{width: 53, height: 13, left: 0, top: 2, position: 'absolute', background: '#D9D9D9', borderRadius: 20, border: '0.50px rgba(165, 136, 102, 0.20) solid'}} />
                    <div style={{width: 68, height: 17, left: 43, top: 0, position: 'absolute', background: 'linear-gradient(105deg, rgba(60, 86, 108, 0.70) 0%, rgba(60, 86, 108, 0.20) 100%)', borderRadius: 20, border: '0.50px rgba(165, 136, 102, 0.20) solid'}} />
                    <div style={{width: 35, height: 17, left: 62, top: 0, position: 'absolute', color: 'white', fontSize: 16, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '900', wordWrap: 'break-word'}}>456</div>
                    <div style={{width: 40, height: 10, left: 6, top: 3, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '900', wordWrap: 'break-word'}}>SCORE</div>
                </div>
                <div style={{width: 110, height: 17, left: 136, top: 7, position: 'absolute'}}>
                    <div style={{width: 52, height: 13, left: 0, top: 2, position: 'absolute', background: '#D9D9D9', borderRadius: 20, border: '0.50px rgba(177, 172, 159, 0.20) solid'}} />
                    <div style={{width: 68, height: 17, left: 42, top: 0, position: 'absolute', background: 'linear-gradient(105deg, rgba(60, 86, 108, 0.70) 0%, rgba(60, 86, 108, 0.20) 100%)', borderRadius: 20, border: '0.50px rgba(177, 172, 159, 0.20) solid'}} />
                    <div style={{width: 44, height: 17, left: 56, top: 0, position: 'absolute', color: 'white', fontSize: 16, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '900', wordWrap: 'break-word'}}>15:16</div>
                    <div style={{width: 34, height: 10, left: 6, top: 3, position: 'absolute', color: '#050000', fontSize: 10, fontFamily: 'Inter', fontStyle: 'italic', fontWeight: '900', wordWrap: 'break-word'}}>TIMER</div>
                </div>

            </div>






        </div>
    </div>
    
    );

}



