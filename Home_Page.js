document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                document.querySelectorAll('main section').forEach(function(section) {
                    section.classList.add('hidden');
                });
                targetSection.classList.remove('hidden');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const notificationOptions = document.querySelectorAll('.notification-option');

    function toggleActive(option) {
        notificationOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        sessionStorage.setItem('activeNotificationOption', option.dataset.option);
    }

    function hideAllSectionsExcept(targetId) {
        document.querySelectorAll('.feed section').forEach(function(section) {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
    }

    document.getElementById('notifications').classList.add('hidden');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = link.getAttribute('href').substring(1);
            if (targetId !== 'notifications') {
                hideAllSectionsExcept(targetId);
                document.querySelector('.notification-bar').classList.add('hidden'); 
            } else {
                hideAllSectionsExcept(targetId);
                document.querySelector('.notification-bar').classList.remove('hidden'); 
            }
        });
    });

    notificationOptions.forEach(option => {
        option.addEventListener('click', function() {
            toggleActive(option);
        });
    });

    const activeOption = sessionStorage.getItem('activeNotificationOption');
    if (activeOption) {
        const activeOptionElement = document.querySelector(`[data-option="${activeOption}"]`);
        if (activeOptionElement) {
            toggleActive(activeOptionElement);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleSwitches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const isChecked = this.checked;
            const settingName = this.parentNode.previousElementSibling.textContent.trim();
            updateSetting(settingName, isChecked);
        });
    });

    const languageSelect = document.querySelector('.language-select');
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        updateSetting('Language', selectedLanguage);
    });

    const notificationPreferencesSelect = document.querySelector('.notification-preferences');
    notificationPreferencesSelect.addEventListener('change', function() {
        const selectedPreference = this.value;
        updateSetting('Notification Preferences', selectedPreference);
    });

    const soundSelect = document.querySelector('.sound-select');
    soundSelect.addEventListener('change', function() {
        const selectedSound = this.value;
        updateSetting('Notification Sound', selectedSound);
    });

    function updateSetting(settingName, value) {
        console.log(`Setting '${settingName}' updated to: ${value}`);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleDarkModeSwitch = document.querySelector('#dark-mode-switch');
    const body = document.querySelector('body');

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        enableDarkMode();
    }

    toggleDarkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }


    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});
//HOMEPAGE API//////////////////////////////////////////////////////////////////////////////////
let postArray = [];
let username = "";
let token = 0;
document.getElementById("prefab").style.display = "none";

function AddNewPost(username, content, likes, replies) {
    let post = document.getElementById("prefab").cloneNode(true);
    post.setAttribute("id", "newPost");
    post.style.display = "block";
    document.getElementById("home").appendChild(post);
    post.children[0].children[1].innerHTML = username;
    post.children[1].innerHTML = content;
    post.children[2].children[0].children[1].innerHTML = likes;
    post.children[2].children[1].children[1].innerHTML = replies;
}
async function register(_username, _password) {
    const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: _username,
            password: _password
        })
    })
    return await res.text()
}

async function login(_username, _password) {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: _username,
            password: _password
        })
    })
    username = _username;
    token = await res.text()
    console.log(token);
}

async function makePost() {
    let _content = document.getElementById("Text-Box").value;
    console.log(_content);
    let data = await fetch("http://localhost:3000/api/v1/posts", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: _content
        })
    });
    AddNewPost(username, _content, 0, 0);
}

async function getPosts() {
    let data = await fetch("http://localhost:3000/api/v1/posts", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    console.log(data);
    for (post of data) AddNewPost(post.postedBy, post.content, post.likes.length, 0);
}
//TEMPORARY ID FOR LIKE
async function likePost(_id) {
    let data = await fetch("http://localhost:3000/api/v1/posts/" + _id, {
        method: "PATCH",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "like"
        })
    })
}
//temporary actions
async function start() {
    await register("joblipat", "password");
    await login("joblipat", "password");
    await getPosts();
    await likePost("nVk5ws2BxX8sHKaKq_Pbx");
}
start();
//HOMEPAGE API//////////////////////////////////////////////////////////////////////////////////