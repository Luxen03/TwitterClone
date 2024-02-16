var curUser = localStorage.getItem("curUser");
var tokenG = localStorage.getItem("tokenID");

// import {
//     checkSelfProfile,
//     getAllUsers,
//     checkFollowing,
//     getPosts,
//     likePost,
//     ffUser
// } from './Home_Page.js';

function checkSelfProfile() {
    console.log(curUser);
    window.location.href=`profile.html?username=${curUser}`;
}

async function getAllUsers() {
    let data = await fetch("http://localhost:3000/api/v1/users/", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // return data;
    // console.log(data[0]);

    let ff = await checkFollowing();

    for (var username in data) {
        if (data[username] != curUser) {
            let isFollowed =  ff.includes(data[username])? "Unfollow" : "Follow"
            var toFollow = document.querySelector('.suggested');
            toFollow.innerHTML += `<div class='userContainer'>
            <div class='img_user'>
                <img src='./assets/Icons/blank_profile_icon.png' class='post-pfp'>
                <a href="profile.html?username=${data[username]}" class='usernameField'>${data[username]}</a>
            </div>
            <span class='followUser' onclick='ffUser("${data[username]}")'>${isFollowed}</span>
            </div>`;
        }
    }
}

async function checkFollowing() {
    let followingPeeps = await fetch(`http://localhost:3000/api/v1/users/${curUser}/following/`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    console.log('following: ', followingPeeps);
    return followingPeeps;
}

async function ffUser(userToFollow) {
    let ff = await checkFollowing();

    if (ff.includes(userToFollow)) {
        let data = await fetch(`http://localhost:3000/api/v1/users/${curUser}/following/${userToFollow}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + tokenG,
                'Content-Type': 'application/json'
            }
        });
        console.log("Unfollowed");
        location.reload();
    } else {
        let data = await fetch(`http://localhost:3000/api/v1/users/${curUser}/following/${userToFollow}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokenG,
                'Content-Type': 'application/json'
            }
        });
        console.log("followed");
        location.reload();
    }

}

function AddNewPost(dateTimePosted, username, content, likes, replies, postID) {

    var divider = document.querySelector('.divider');
    var profilePage = document.getElementById("profile");


    let post = document.getElementById("prefab").cloneNode(true);
    post.setAttribute("id", postID);
    post.style.display = "block";
    // document.getElementById("home").appendChild(post);
    divider.insertAdjacentElement('afterend', post)
    post.querySelector(".post-date").textContent = dateTimePosted;
    post.children[0].children[1].innerHTML = username;
    post.children[1].innerHTML = content;
    post.children[2].children[0].children[1].innerHTML = likes;
    // post.children[2].children[1].children[1].innerHTML = replies;

    // location.reload();
}

async function getPosts() {
    const username = new URLSearchParams(window.location.search).get("username")
    let data = await fetch(`http://localhost:3000/api/v1/posts?username=${username}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // console.log('getPosts: ', data);
    data.sort((a, b) => new Date(a.dateTimePosted) - new Date(b.dateTimePosted)); //from  latest to oldest.

    console.log('getPosts: ', data);
    for (post of data) AddNewPost(post.dateTimePosted, post.postedBy, post.content, post.likes.length, 0, post.postId);
}

async function likePost(_post) {

    postID_ = _post.parentNode.parentNode.getAttribute('id');
    console.log(postID_);

    const username = new URLSearchParams(window.location.search).get("username")
    let gg = await fetch(`http://localhost:3000/api/v1/posts?username=${username}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // console.log(gg);
    var action;
    for (const item of gg) {
        if (item.postId == postID_) {
            action = item.likes.includes(curUser) ? 'unlike' : 'like';
            console.log(action);
        }
    }

    let data = await fetch("http://localhost:3000/api/v1/posts/" + postID_, {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: `${action}`
        })
    });

    let getDataUpdated = await fetch(`http://localhost:3000/api/v1/posts?username=${username}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // console.log(postID_);
    for (const item of getDataUpdated) {
        // console.log("contentID:", item.postId);
        if (item.postId == postID_) {
            
            _post.querySelector('p').textContent = item.likes.length;
        }
    }
    // location.reload();
}

document.getElementById("prefab").style.display = "none";

getPosts();
getAllUsers();