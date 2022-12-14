import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session'
import './dropdown.css'


const DropDown = () => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    const [redirect, setRedirect] = useState(false)


    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
        setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
     }, [showMenu]);

    const logoutClick = (e) => {
        e.preventDefault();
        // console.log('yoo');
        dispatch(sessionActions.logout())
        // .then(()=> { history.push("/")})
        setTimeout(setRedirect(true), 5000)


    }

    if (redirect) {

        return ( 
        <Redirect to={`/`} />
    )}


    //make function to show dropdown or nah

    return ( 
           <div className="dropdown">
                <button className='dropbtn' onClick={openMenu}><i className="fa-solid fa-angle-down"></i></button>
                {showMenu && (
                    <div className='dropdown-content'>
                        <div className="currentlyIn"> Currently in</div>
                        <br />
                        <img className="dropdownProfilePic" src={sessionUser.profilePicUrl} alt="" />
                        <br />
                        <Link className="dropdownProfile" to={`/user/${sessionUser.id}`}>
                            Profile of {sessionUser.username} 
                        </Link>
                        <Link to="/" onClick={logoutClick}>Log Out</Link>
                    </div>
                )}
            </div>
     );
}
 
export default DropDown;