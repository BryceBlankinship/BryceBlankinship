// Written by Bryce Blankinship
// This script toggles between sign in and sign on

//show sign in by default by disabling signup
document.getElementById("signup").style.display = "none";

function displaySignin(){
    document.getElementById("signup").style.display = "none";
    document.getElementById("signin").style.display = "flex";
}

function displaySignup(){
    document.getElementById("signup").style.display = "flex";
    document.getElementById("signin").style.display = "none";
}
