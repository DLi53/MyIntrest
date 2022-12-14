import './index.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import * as sessionActions from '../../store/session'
import SearchBar from '../SearchBar/searchBar';
import DropDown from '../DropDown/dropdown';
import logo from '../../assets/images/wink-xxl.png'
import logo2 from '../../assets/images/WinkText.png'
import { useState } from 'react';


const NavBar = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const [homeSelected, setHomeSelected] = useState(true)
    // const [createSelected, setCreateSelected] = useState(false)

    let sessionLinks;


    if (sessionUser) {
        sessionLinks = (''
        // <ProfileButton user={sessionUser} />
        );
        
    } else {
        sessionLinks = (
        <div className='sessionButtons'>
            <p><a href="https://danielli.dev/">Portfolio</a></p>
            <p><a href="https://github.com/DLi53">GitHub</a></p>
            <p><a href="https://www.linkedin.com/in/danielli52/">LinkedIn</a></p>
            <div className="sessionbutt">
                <p><LoginFormModal /></p>
                <p><SignUpFormModal/></p>
            </div>
        </div>
        );
    }


    const loggedOutNav = (
        <div className = "navBar" id='loggedOutNav'> 
            <div className='navLogo'>
                <div><Link to="/"><img className="logo" src={logo} /></Link></div>
                <div><Link to="/"><img className="logo2" src={logo2} /></Link></div>

                {/* <div><a href=""><img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png?20160129083321" alt="" /></a></div> */}
            </div>

            {sessionLinks}
            {/* <p><Link to='/login'>Login</Link></p>
            <p><Link to='/signp'>Sign Up</Link></p> */}
        </div>

    )
    const loggedInNav = ( 
        <div className="navBar" id='loggedInNav'>
                {/* <div><a href=""><img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png?20160129083321" alt="" /></a></div> */}
                <div><Link to="/"><img  onClick={() => setHomeSelected(true)} className="logo" src={logo} /></Link></div>


            <div className="frontNav">
                <div id='navLinkHome'  onClick={() => setHomeSelected(true)}><Link to="/" className={ homeSelected ? 'navLinkSelected' : 'navLinkUnSelected'}>Home</Link></div>
                <div className='navLink'><Link to="/pin-builder" onClick={() => setHomeSelected(false)} className={ homeSelected ? 'navLinkUnSelected' : 'navLinkSelected'}>Create</Link></div>
            </div>
            <div className='searchBar'><SearchBar></SearchBar></div>

            <div className='backNav'>
                <div className='icons'><a href="https://danielli.dev/"><i className="fa-solid fa-image"></i></a></div>
                <div className='icons'><a href="https://github.com/DLi53"><i className="fa-brands fa-github"></i></a></div>
                <div className='icons'><a href="https://www.linkedin.com/in/danielli52/"><i className="fa-brands fa-linkedin-in"></i></a></div>
                {/* <div className='icons'><a href=""><i className="fa-solid fa-user"></i></a></div> */}
                <div className='icons' onClick={() => setHomeSelected(true)}><Link to={`/user/${sessionUser && sessionUser.id}`}><i className="fa-solid fa-user"></i></Link></div>

                <div className='icon'><DropDown></DropDown></div>
            </div>
        </div>
     );

     return sessionUser ? loggedInNav : loggedOutNav
}
 
export default NavBar;