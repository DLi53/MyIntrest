import SplashPics from "./splashpics";
import './SplashPage.css'
import splash from './ezgif.com-gif-maker.gif'
import { useState } from "react";
import SignUpForm from "../SignUpFormModal/SignUpForm";
import SplishCss from "./splishCSS";
import Video from './PinterestCover.mov'

const SplashPage = () => {


    const [currentRow , setCurrentRow] = useState(4)

    // setInterval(setCurrentRow(3) ,3000)

    let pg2 = document.getElementsByClassName('splashPage')
    const handleClick = () => {
        // <LoginFormModal></LoginFormModal>
        window.scrollTo({top: 1000,left: 0, behavior:'smooth'})
        // pg2.scrollIntoView()
    }

    return ( 
        <div className="splashPage" >

            <section className="pg1" >
                {/* <img className="SPLISH" src={splash} alt="" /> */}
            {/* {currentRow} */}

            <SplishCss/>

            </section>

            <section className="pg2">
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/scenic-sunrise-above-bagan-in-myanmar-royalty-free-image-1658261755.jpg" alt="" />
                
                <h1 className="pg2h1">Dreams, Goals, Ambitions</h1>
                <br />
                {/* <p>Winner, winner, Chicken Dinner?</p> */}
            </section>

            <section className="pg3">
                <img src="https://images.asiahighlights.com/allpicture/2018/03/b308a1bf551e489b8b89d7d2_cut_600x800_61.jpg" alt="" />
                <br />
                <div className="pg3div">
                    <h1 className="pg3h1">Save, Share, Pin</h1>
                    <p>Collect your favorites so you can get back to them...</p>
                </div>
            </section>

            <section className="pg4">
                <div className="pg4img"  />

                <h1>Sign Up Here!</h1>
                <h2><SignUpForm></SignUpForm></h2>
            </section>



        </div>
     );
}
 
export default SplashPage;