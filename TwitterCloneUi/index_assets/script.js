var isSignUpToggled = false;

document.addEventListener('DOMContentLoaded', function () {
    var movingP = document.querySelector('.moving_panel.m1');
    var loginF = document.querySelector('.login_form');
    window.addEventListener('resize', function() {
        if (isSignUpToggled) {
            if (window.innerWidth <= 768) {
                console.log("anim not working?");
                movingP.style.transform = 'translateX(100%)';
                loginF.style.transform = 'translateX(0%)';
            } else {
                loginF.style.transform = 'translateX(-100%)';
            }
        } else {
            movingP.style.transform = 'translateX(0%)';
        }
    });
    


    document.querySelector('.subtext.sign_up').addEventListener('click', function() {
        isSignUpToggled = !isSignUpToggled;

        if (window.innerWidth >= 768) {
            if (isSignUpToggled) {
                movingP.style.transform = 'translateX(100%)';
                loginF.style.transform = 'translateX(-100%)';
        
                setTimeout(function() {
                    loginF.querySelector('.login_text').textContent = 'Sign-Up';
                    loginF.querySelector('.button_field').textContent = 'SIGN UP';
                    loginF.querySelector('.subtext.forgot').style.display = 'none';
                    loginF.querySelector('.subtext.sign_up').textContent = 'Back to Login';
    
                }, 400);
    
            } else {
                movingP.style.transform = 'translateX(0%)';
                loginF.style.transform = 'translateX(0%)';   
    
                setTimeout(function() {
                    loginF.querySelector('.login_text').textContent = 'Log-in';
                    loginF.querySelector('.button_field').textContent = 'LOGIN';
                    loginF.querySelector('.subtext.forgot').style.display = 'flex';
                    loginF.querySelector('.subtext.sign_up').innerHTML = 'No account? <span>Sign Up</span>';
                }, 400);
    
            }
        } else {
            let m2 = loginF.querySelector('.moving_panel.m2');
            if (isSignUpToggled) {
                m2.style.transform = 'translateY(100%)';
        
                setTimeout(function() {
                    loginF.querySelector('.login_text').textContent = 'Sign-Up';
                    loginF.querySelector('.button_field').textContent = 'SIGN UP';
                    loginF.querySelector('.subtext.forgot').style.display = 'none';
                    loginF.querySelector('.subtext.sign_up').textContent = 'Back to Login';
                }, 400);

                setTimeout(function() {
                    m2.style.transform = 'translateY(0%)';
                }, 1300);
    
            } else {
                m2.style.transform = 'translateY(100%)';
    
                setTimeout(function() {
                    loginF.querySelector('.login_text').textContent = 'Log-in';
                    loginF.querySelector('.button_field').textContent = 'LOGIN';
                    loginF.querySelector('.subtext.forgot').style.display = 'flex';
                    loginF.querySelector('.subtext.sign_up').innerHTML = 'No account? <span>Sign Up</span>';
                }, 400);

                setTimeout(function() {
                    m2.style.transform = 'translateY(0%)';
                }, 1300);
    
            }
        }

        
    });
});

