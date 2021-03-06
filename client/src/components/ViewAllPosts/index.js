import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";


function ViewAllPosts() {

    const [state, setState] = useState({
        posts: []
    });



    useEffect(() => {
        Axios.get('/api/post')
            .then(res => {
                setState({ posts: res.data });
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <h2 className="text-center intro-h2">Posts from the community</h2>
            <p className="intro-post-p">View all of users created post here</p>

            {
                state.posts.map((post, index) => {
                    return (
                        <div key={index} className="border border-warning box post-boouuxx" style={{ margin: "0 auto", marginBottom: "20px" }}>
                            <h1 className=" text-center post-title">{post.title}</h1>
                            <div className="card-body post-boux-boudeh">
                                <p>{post.body}</p>
                                <Link className="nav-item" to="/reply">
                                    <button type="button" className="btn btn-outline-dark btn-lg">Reply</button>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ViewAllPosts;