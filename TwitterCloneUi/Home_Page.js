var curUser = localStorage.getItem("curUser");
var tokenG = localStorage.getItem("tokenID");
// document.addEventListener('DOMContentLoaded', function() {
//     var profileName = document.getElementById('changeName');
//     console.log(curUser);
//     profileName.innerHTML = curUser;
// });

function checkSelfProfile() {
    window.location.href=`profile.html?username=${curUser}`;
}

// document.addEventListener('DOMContentLoaded', function() {
//     const navLinks = document.querySelectorAll('nav ul li a');
//     navLinks.forEach(function(link) {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetId = link.getAttribute('href').substring(1);
//             const targetSection = document.getElementById(targetId);
//             console.log(targetId);
//             console.log(targetSection);
//             if (targetSection) {
//                 document.querySelectorAll('main section').forEach(function(section) {
//                     section.classList.add('hidden');
//                 });
//                 targetSection.classList.remove('hidden');
//             }
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const navLinks = document.querySelectorAll('nav ul li a');
//     const notificationOptions = document.querySelectorAll('.notification-option');

//     function toggleActive(option) {
//         notificationOptions.forEach(opt => opt.classList.remove('active'));
//         option.classList.add('active');
//         sessionStorage.setItem('activeNotificationOption', option.dataset.option);
//     }

//     function hideAllSectionsExcept(targetId) {
//         document.querySelectorAll('.feed section').forEach(function(section) {
//             section.classList.add('hidden');
//         });
//         document.getElementById(targetId).classList.remove('hidden');
//     }

//     document.getElementById('notifications').classList.add('hidden');

//     navLinks.forEach(function(link) {
//         link.addEventListener('click', function(e) {
//             e.preventDefault(); 
//             const targetId = link.getAttribute('href').substring(1);
//             if (targetId !== 'notifications') {
//                 hideAllSectionsExcept(targetId);
//                 document.querySelector('.notification-bar').classList.add('hidden'); 
//             } else {
//                 hideAllSectionsExcept(targetId);
//                 document.querySelector('.notification-bar').classList.remove('hidden'); 
//             }
//         });
//     });

//     notificationOptions.forEach(option => {
//         option.addEventListener('click', function() {
//             toggleActive(option);
//         });
//     });

//     const activeOption = sessionStorage.getItem('activeNotificationOption');
//     if (activeOption) {
//         const activeOptionElement = document.querySelector(`[data-option="${activeOption}"]`);
//         if (activeOptionElement) {
//             toggleActive(activeOptionElement);
//         }
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
//     toggleSwitches.forEach(switchInput => {
//         switchInput.addEventListener('change', function() {
//             const isChecked = this.checked;
//             const settingName = this.parentNode.previousElementSibling.textContent.trim();
//             updateSetting(settingName, isChecked);
//         });
//     });

//     const languageSelect = document.querySelector('.language-select');
//     languageSelect.addEventListener('change', function() {
//         const selectedLanguage = this.value;
//         updateSetting('Language', selectedLanguage);
//     });

//     const notificationPreferencesSelect = document.querySelector('.notification-preferences');
//     notificationPreferencesSelect.addEventListener('change', function() {
//         const selectedPreference = this.value;
//         updateSetting('Notification Preferences', selectedPreference);
//     });

//     const soundSelect = document.querySelector('.sound-select');
//     soundSelect.addEventListener('change', function() {
//         const selectedSound = this.value;
//         updateSetting('Notification Sound', selectedSound);
//     });

//     function updateSetting(settingName, value) {
//         console.log(`Setting '${settingName}' updated to: ${value}`);
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const toggleDarkModeSwitch = document.querySelector('#dark-mode-switch');
//     const body = document.querySelector('body');

//     const isDarkMode = localStorage.getItem('darkMode') === 'true';
//     if (isDarkMode) {
//         enableDarkMode();
//     }

//     toggleDarkModeSwitch.addEventListener('change', function() {
//         if (this.checked) {
//             enableDarkMode();
//         } else {
//             disableDarkMode();
//         }
//     });

//     function enableDarkMode() {
//         body.classList.add('dark-mode');
//         localStorage.setItem('darkMode', 'true');
//     }


//     function disableDarkMode() {
//         body.classList.remove('dark-mode');
//         localStorage.setItem('darkMode', 'false');
//     }
// });
//HOMEPAGE API//////////////////////////////////////////////////////////////////////////////////
let postArray = [];
let username = "";
let token = 0;
document.getElementById("prefab").style.display = "none";

function AddNewPost(datePosted, username, content, likes, replies, postID) {

    var postElem = document.querySelector('.post');
    var homePage = document.getElementById("home");


    let post = document.getElementById("prefab").cloneNode(true);
    post.setAttribute("id", postID);
    post.style.display = "block";
    // document.getElementById("home").appendChild(post);
    postElem.insertAdjacentElement('afterend', post)
    post.querySelector(".post-date").textContent = datePosted;
    post.children[0].children[1].innerHTML = username;
    post.children[1].innerHTML = content;
    post.children[2].children[0].children[1].innerHTML = likes;
    // post.children[2].children[1].children[1].innerHTML = replies;

    // location.reload();
}

async function makePost() {
    let _content = document.getElementById("Text-Box").value;
    console.log(_content);
    let data = await fetch("/api/v1/posts", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: _content
        })
    });
    
    // console.log("posts:", data.posted);
    AddNewPost(data.dateTimePosted.substring(0, 10), curUser, _content, 0, 0);
    location.reload();
}

async function getAllUsers() {
    let data = await fetch("/api/v1/users/", {
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
    let followingPeeps = await fetch(`/api/v1/users/${curUser}/following/`, {
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
        let data = await fetch(`/api/v1/users/${curUser}/following/${userToFollow}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + tokenG,
                'Content-Type': 'application/json'
            }
        });
        console.log("Unfollowed");
        location.reload();
    } else {
        let data = await fetch(`/api/v1/users/${curUser}/following/${userToFollow}`, {
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

async function getPosts() {
    let data = await fetch("/api/v1/posts", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    // console.log('getPosts: ', data);
    data.sort((a, b) => new Date(a.dateTimePosted) - new Date(b.dateTimePosted)); //from  latest to oldest.

    console.log('getPosts: ', data);
    for (post of data) AddNewPost(post.dateTimePosted.substring(0, 10), post.postedBy, post.content, post.likes.length, 0, post.postId);
}
//TEMPORARY ID FOR LIKE
async function likePost(_post) {

    postID_ = _post.parentNode.parentNode.getAttribute('id');
    console.log(postID_);

    let getData = await fetch(`/api/v1/posts/`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    var action;
    for (const item of getData) {
        if (item.postId == postID_) {
            action = item.likes.includes(curUser) ? 'unlike' : 'like';
        }
    }

    let data = await fetch("/api/v1/posts/" + postID_, {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: `${action}`
        })
    });

    let getDataUpdated = await fetch(`/api/v1/posts/`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenG,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    for (const item of getDataUpdated) {
        if (item.postId == postID_) {
            _post.querySelector('p').textContent = item.likes.length;
        }
    }
    // location.reload();
}
//temporary actions
async function start() {
    await getPosts();
    await getAllUsers();
}

function enforceMaxLength() {
    var textarea = document.getElementById("Text-Box");
    var charCount = document.querySelector(".charCount");
    var textLength = textarea.value.length;
    var percent = 360 * ((160 - textLength) / 160);
    charCount.style.backgroundImage = `conic-gradient(var(--m_col3) ${percent}deg, var(--m_col2) 0deg)`
}

    // charCount.textContent = (160 - textarea.value.length);


//exports
// module.exports = {
//     checkSelfProfile,
//     getAllUsers,
//     checkFollowing,
//     getPosts,
//     likePost,
//     ffUser
// };





start();
//HOMEPAGE API//////////////////////////////////////////////////////////////////////////////////
