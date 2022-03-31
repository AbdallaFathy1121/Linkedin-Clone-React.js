import styled from "styled-components";
import PostModal from './PostModal';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from "jquery";
import { getArticleAPI } from "../actions";
import ReactPlayer from 'react-player';


const Main = () => {

    const user = useSelector( state => state.userState.user );
    const loading = useSelector( state => state.articleState.loading );
    const articles = useSelector( state => state.articleState.articles );
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState("close");

    const handleClick = (e) => {
        e.preventDefault();
        
        if (e.target !== e.currentTarget) {
            return;
        }

        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }

    }

    useEffect(() => {

        dispatch(getArticleAPI());

        $(".start_post").on("click", function() {
            $("#start_post").click();
        });

    }, [])

    

    return (
        <>
                <Container>
                    <ShareBox>
                        <div>
                            {user && user.photoURL ? (<img src={user.photoURL} />) 
                                : (<img src="/images/user.svg" alt="" />)
                            }
                            <button id="start_post" onClick={handleClick} disabled={loading ? true : false }>Start a post</button>
                        </div>

                        <div>

                            <button className="start_post">
                                <img src="/images/photo-icon.svg" alt="" />
                                <span>Photo</span>
                            </button>

                            <button className="start_post">
                                <img src="/images/video-icon.svg" alt="" />
                                <span>Video</span>
                            </button>

                            <button className="start_post">
                                <img src="/images/photo-icon.svg" alt="" />
                                <span>Event</span>
                            </button>

                            <button className="start_post">
                                <img src="/images/article-icon.svg" alt="" />
                                <span>Write article</span>
                            </button>

                        </div>
                    </ShareBox>

                    { articles.length === 0 ? (
                        <p>There are no articles</p>
                        )   :   (
                            <Content>
                                { loading &&  (<img src="/images/spin-loader.svg" />) }

                                { articles.length > 0 && articles.map((article, key) => (
                                    <div>
                                    <Article key={key}>
                                        <ShareActor>
                                            <a>
                                                <img src={article.actor.image} alt="" />
                                                <div>
                                                    <span>{article.actor.title}</span>
                                                    <span>{article.actor.description}</span>
                                                    <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                                </div>
                                            </a>
                                            <button>
                                                <img src="/images/ellipsis.svg" alt="" />
                                            </button>
                                        </ShareActor>
                                        <Description>{article.description}</Description>
                                        <SharedImg>
                                            <a>
                                                { article.sharedImg ? (
                                                    <img src={article.sharedImg} />
                                                ) : (
                                                    <ReactPlayer width={"100%"} url={article.video} />
                                                )}
                                            </a>
                                        </SharedImg>
                                        <SocialCounts>
                                            <li>
                                                <button>
                                                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                                    <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                                                    <span>75</span>
                                                </button>
                                            </li>
                                            <li>
                                                <a>2 comments</a>
                                            </li>
                                        </SocialCounts>
                                        <SocialAction>
                                            <button>
                                                <img src="/images/like-icon.svg" alt="" />
                                                <span>Like</span>
                                            </button>
                                            <button>
                                                <img src="/images/comments-icon.svg" alt="" />
                                                <span>Comments</span>
                                            </button>
                                            <button>
                                                <img src="/images/share-icon.svg" alt="" />
                                                <span>Share</span>
                                            </button>
                                            <button>
                                                <img src="/images/send-icon.svg" alt="" />
                                                <span>Send</span>
                                            </button>
                                        </SocialAction>
                                    </Article>
                                    </div>
                                ))}  
                            </Content>
                    )}


                    <PostModal showModal={showModal} handleClick={handleClick} />

                </Container>

        </>
    );
};


const Container = styled.div`
    grid-area: main;
`;

const commonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(commonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background-color: white;

    div {
        button {
            outline: none;
            color: rgba(0,0,0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button {
                margin: 4px 0;
                flex-grow: 1;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0, 0.15);
                border-radius: 35px;
                background-color: white;
                text-align: left;
            }
        }

        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button {
                img {
                    margin: 0 4px 0 -2px;
                    width: 30px;
                    height: 30px;
                }
                span {
                    color: #70b5f9;
                }
            }
        }
    }
`

const Article = styled(commonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`

const ShareActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;

    a {
        margin-right: 12px;
        flex-grow: 1;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span {
                text-align: left;
                
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0, 1)
                }

                &:nth-child(n + 1) {
                    font-size: 12px;
                    color: rgba(0,0,0, 0.6)
                }
            }
        }
    }

    button {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;

        img {
            width: 27px;
            
        }
    }
`

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 16px;
    text-align: left;
`

const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background: #f9fafb;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;

    li {
        margin-right: 5px;
        font-size: 12px;
    }   
    
    button {
        display: flex;
    }
`

const SocialAction = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
        
    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        background: white;
    }

    img {
        width: 30px;
    }

    @media (min-width: 768px) {
        span {
            margin-left: 8px;
        }
    }
`

const Content = styled.div`
    text-align: center;
    & > img {
        width: 70px;
    }
`






export default Main;
