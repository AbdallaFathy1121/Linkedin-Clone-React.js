import { auth, provider, storage } from "../Firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./ActionType"; 
import db from './../Firebase';


const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})

const signAPI = () => {
    return (dispatch) => {
        auth.
        signInWithPopup(provider)
        .then((payload) => {
            dispatch(setUser(payload.user))
        })
        .catch((error) => alert(error.message));
    }
}

const getUserAuth = () => {
    return (dispatch) => {
        auth.
        onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    }
}

const signOutAPI = () => {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null))
        })
    }
}

const postArticleAPI = (payload) => {
    return (dispatch) => {

        dispatch(setLoading(true));

        if (payload.image !== "") {

            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);

            upload.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress: ${progress}%`)

                if (snapshot.state === 'RUNNING') {
                    console.log(`Progress: ${progress}%`)
                }
            }, error => console.log(error.code),
            
            async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                db.collection('articles').add({
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        image: payload.user.photoURL,
                        date: payload.timestamp,
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
                })
                dispatch(setLoading(false));
            });

        } else if (payload.video) {
            db.collection("articles").add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    image: payload.user.photoURL,
                    date: payload.timestamp,
                },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
            })
            dispatch(setLoading(false));
        }

    }
} 


const getArticleAPI = () => {
    return (dispatch) => {
        
        let payload;

        db.collection("articles")
            .orderBy("actor.date", "desc")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                dispatch(getArticles(payload))
            })

    }
}




export { signAPI, setUser, getUserAuth, signOutAPI, postArticleAPI, setLoading, getArticleAPI }