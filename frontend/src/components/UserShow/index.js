import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBoards } from "../../store/boards";
import './index.css'
import ImageListItem from "../ImageIndexPage/ImageListItem";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import BoardList from "../Boards/boardList";
import { fetchUsers } from "../../store/users";
import Loading from "../Loading/Loading";
import { fetchImages } from "../../store/images";
import { Modal } from '../Modal/modal.jsx';
import LoginForm from "../LoginFormModal/LoginForm";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";
import FollowButton from "../FollowButton";
import { fetchFollows } from "../../store/follows";


const UserShow = ({message}) => {
    // console.log(message);
    const dispatch = useDispatch()
    const {id} = useParams()
    const currentuserdeets = useSelector(state => state.session.user)
    const userdeets = useSelector(state => state.users[id])
    const boarddeets = useSelector(state => state.boards[id])
    const [createShow, setCreateShow] = useState("Show")
    const [loading, setLoading] = useState(true)
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    // const userdeetsfollowernum = useSelector(state => state.users[id].followers.length+1)
    // const userdeetsfollowingnum = useSelector(state => state.users[id].following.length+1)
    


    const userImages = useSelector(state => {
        let arr = []   
        Object.values(state.images).forEach(image => {
            if(image.uploaderId === parseInt(id)) {
                arr.push(image)
            }
        })
        return arr
    })

    const boardCreateLink = <Link to='/board-builder' className="plusCreateBoard"><i className="fa-solid fa-plus"></i></Link>
    const pinCreateLink = <Link to='/pin-builder' className="plusCreateBoard"><i className="fa-solid fa-plus"></i></Link>
   
    const createIt = createShow === "Create" ? pinCreateLink : boardCreateLink




    useEffect(() => {

        dispatch(fetchUsers())
        dispatch(fetchFollows())
        dispatch(fetchImages())
        .finally(() => {setLoading(false)})
    },[id])

    const breakpointColumnsObj = {
        default: 7,
        1700: 6,
        1500: 5,
        1200: 4,
        1000: 3,
        700: 2,
        500: 1
    };

    const allImages = userImages.map(image => {return <ImageListItem image={image} key={image.id} user={userdeets}/>})
    const imageListItems =                 
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {allImages}
                </Masonry>



    const shown = createShow === "Show" ? <BoardList userId={userdeets && userdeets.id}/> :  imageListItems

    return loading ? <Loading/> : ( 

        <div className="userShow">
            {message && message}
            <img className="userShowPic" src={userdeets && userdeets.profilePicUrl} alt="" />
            <h1>{userdeets && userdeets.username}</h1>
            <p>@{userdeets && userdeets.username}</p>
            <div className="userShowFollows">
                <h4 className="userShowFollowsLinks" onClick={() => setShowFollowerModal(true)}>{userdeets && userdeets.followers.length+ 1} Followers </h4> 
                    {showFollowerModal && (
                        <Modal onClose={() => setShowFollowerModal(false)}>
                            <FollowerModal followers={userdeets.followers}/>
                        </Modal>
                    )}
                <h4> · </h4>
                <h4 className="userShowFollowsLinks" onClick={() => setShowFollowingModal(true)}>{userdeets && userdeets.following.length+ 1} Following </h4>
                    {showFollowingModal && (
                        <Modal onClose={() => setShowFollowingModal(false)}>
                            <FollowingModal followings={userdeets.following} closingModal={() => setShowFollowingModal(false)}/>
                        </Modal>
                    )}
            </div>

            <div className="userShowFollowButton" >{currentuserdeets.id === userdeets.id ? "" : <FollowButton user={userdeets}/>}</div>
            <br />

            <div className="createshow">
                <div 
                    className="createdButton"
                    value = "Create"
                    onClick = {(e) => setCreateShow("Create")}
                >Created</div>

                <div className="showButton"
                    value = "Show"
                    onClick = {(e) => setCreateShow("Show")}
                    >Show</div>
            </div>
            {currentuserdeets.id === userdeets.id ? createIt : '' }
            <br />
            <div className="CreateShowSection">
                {shown}
            </div>

        </div>
     );
}
 
export default UserShow;