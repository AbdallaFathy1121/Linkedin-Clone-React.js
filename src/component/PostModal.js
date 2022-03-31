import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import { postArticleAPI } from '../actions';

const PostModal = ({ handleClick, showModal }) => {

    const user = useSelector( state => state.userState.user );
    const dispatch = useDispatch();
    
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [switchArea, setSwitchArea] = useState("");
    const [post, setPost] = useState(false);


    useEffect(() => {
        if (editorText.length == 0 && shareImage.length == 0 && videoLink.length == 0) {
            setPost(true);
        } else {
            setPost(false)
        }
    }, [editorText, shareImage, videoLink])

    const handleChange = (e) => {
        const image = e.target.files[0];

        setShareImage(image);
    }

    const postArticle = (e) => {
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        }

        dispatch(postArticleAPI(payload));
        reset(e);
    }

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setSwitchArea("");
        handleClick(e);
    }



    return (
        <>

        {showModal === "open" &&

        <Container>
            <Content>
                
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(e) => reset(e)}>
                        <img src="/images/close-icon.svg" alt="" />
                    </button>
                </Header>
                
                <SharedContent>
                    
                    <UserInfo>
                        {user.photoURL ? 
                            (<img src={user.photoURL} />)
                            :
                            (<img src="/images/user.svg" alt="" />)
                        }
                        <span>{user ? user.displayName : "user"}</span>
                    </UserInfo>

                    <Editor>
                        <textarea 
                            value={editorText} 
                            onChange={(e) => setEditorText(e.target.value)}
                            placeholder="What do you want to talk about?"
                            autoFocus={true}
                            >
                        </textarea>

                        <UploadImage>
                            {switchArea === 'image' &&
                                <>
                                    <input 
                                        type="file" 
                                        name="image" 
                                        id="file" 
                                        style={{ display: "none" }} 
                                        onChange={handleChange}
                                    />
                                    <p>
                                        <label htmlFor="file">Select an image to share</label>
                                    </p>
                                    {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                                </>
                            }
                            {switchArea === 'media' &&
                                <>
                                    <input 
                                        type="text"
                                        placeholder="Please input a video link"
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                    {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                                </>
                            }
                        </UploadImage>


                    </Editor>
                
                </SharedContent>

                <ShareCreation>

                    <AttachAssets>
                        <AssetButton onClick={() => setSwitchArea("image")}>
                            <img src="/images/share-image.svg" alt="" />
                        </AssetButton>
                        <AssetButton onClick={() => setSwitchArea("media")}>
                            <img src="/images/share-video.svg" alt="" />
                        </AssetButton>
                    </AttachAssets>

                    <ShareComment>
                        <AssetButton>
                            <img src="/images/share-comment.svg" alt="" />
                            Anyoune
                        </AssetButton>
                    </ShareComment>

                    <PostButton 
                        disabled={post  ? true : false}
                        onClick={(e) => postArticle(e)}
                    >
                        Post
                    </PostButton>

                </ShareCreation>

            </Content>
        </Container>
        }
        </>
    )
}


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    color: black;
    background-color: rgba(0,0,0, 0.8);
    animation: fadeIn 0.3s;
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            pointer-events: none;
            width: 23px;
        }
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }

    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const ShareCreation = styled.div`
    display: flex;
    padding: 12px 24px 12px 16px;
`

const AssetButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    height: 40px;
    min-width: auto;
    background-color: rgba(0,0,0, 0.2);
    cursor: pointer;

    img {
        width: 23px;
    }
`

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
        margin-right: 1px;
    }
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0, 0.15);

    ${AssetButton} {
        padding: 0 8px;
        img {
            margin-right: 5px;
        }
    }
`

const PostButton = styled.div`
    margin-left: auto;
    border-radius: 20px;
    padding-left: 22px;
    padding-right: 22px;
    background: #0a66c2;
    color: white;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    display: flex;
    align-items: center;

    background: ${(props) => (props.disabled ? "rgba(0,0,0, 0.8)" : "#0a66c2")};

    &:hover {
        background: ${(props) => (props.disabled ? "rgba(0,0,0, 0.8)" : "#004182")};
    }
`

const Editor = styled.div`
    padding: 12px 24px;

    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        font-size: 16px;
        font-weight: 500;
        padding: 8px;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`

const UploadImage = styled.div`
    text-align: center;
    cursor: pointer;

    img {
        width: 100%;
    }

`



export default PostModal;
