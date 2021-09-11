// ==UserScript==
// @name         AMQ Background changer
// @namespace    https://animemusicquiz.com/
// @version      1.0
// @description  Change AMQ Background
// @author       arch
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

// ---------- CONFIG ---------- //

const bgImages = {
    login: "https://images8.alphacoders.com/116/1166274.jpg",
    loading: "https://images8.alphacoders.com/116/1166274.jpg",
    hub: "https://images8.alphacoders.com/116/1166274.jpg",
    roomsList: "https://images8.alphacoders.com/116/1166274.jpg",
    waitRoom: "https://images8.alphacoders.com/116/1166274.jpg",
    looting: "https://images8.alphacoders.com/116/1166274.jpg",
    inGameQuestion: "https://images8.alphacoders.com/116/1166274.jpg",
    inGameAnswer: "https://images8.alphacoders.com/116/1166274.jpg"
}

const colors = {
    xp: "#e77aff",
    xpShadowColor: "#e77aff",
    userMenu: "#e77aff",
    userMenuBorder: "#9c00bf",
};

// ---------- CONFIG ---------- //

(function() {
    function changeBgImg(query, url=null) {
        const imgToChange = document.querySelector(query)
        if (imgToChange) {
            if (url) imgToChange.style.backgroundImage = `url("${url}")`
            else imgToChange.style.backgroundImage = "none"
        }
    }

    function changeBgColor(query, color=null) {
        const colorToChange = document.querySelector(query)
        if (colorToChange) {
            if (color) colorToChange.style.background = color
            else colorToChange.style.background = "none"
        }
    }

    function updateImages () {
        changeBgImg("#gameChatPage > .col-xs-9")

        const bgDivsQuery = ["#startPage", "#gameContainer", "#loadingScreen"]

        for (const bgDivQuery of bgDivsQuery) {
            let bg;

            if (bgDivQuery === "#startPage") bg = bgImages.login
            else if (bgDivQuery === "#loadingScreen") bg = bgImages.loading
            else if (document.querySelector("#gameChatPage") != null) {
                // rooms list
                if (document.querySelector("#roomBrowserPage").className != "gamePage text-center hidden") bg = bgImages.roomsList
                // waiting room - in game (guessing/result) - looting
                else if (document.querySelector("#gameChatPage").className == "gamePage") {
                    // waiting room
                    if (document.querySelector("#lobbyPage").className == "text-center") {
                        bg = bgImages.waitRoom
                    } else {
                        // looting
                        if (document.querySelector("#battleRoyalPage").className == "text-center") bg = bgImages.looting
                        else {
                            // answer
                            if (document.querySelector("#qpHiderText").textContent == "Answers") bg = bgImages.inGameAnswer
                            // question
                            else bg = bgImages.inGameQuestion
                        }
                    }
                }
                // default (hub)
                else bg = bgImages.hub
            } else bg = bgImages.hub

            changeBgImg(bgDivQuery, bg)
        }
    }

    function updateColors () {
        // userMenu
        changeBgColor(".menuBarMainButton", colors.userMenu)
        // userMenuBorders
        const userMenuBorders = document.querySelector("#avatarUserImgContainer")
        if (userMenuBorders) {
            userMenuBorders.style.borderTop = `solid ${colors.userMenuBorder}`
            userMenuBorders.style.borderLeft = `solid ${colors.userMenuBorder}`
        }
        // xp
        changeBgColor("#xpBarInner", colors.xp)
        const xpShadow = document.querySelector("#xpBarInner")
        if (xpShadow) xpShadow.style.boxShadow = `1px 0px 15px 1px ${colors.xpShadowColor}`
    }

    function updateAMQ () {
        updateImages()
        updateColors()
    }

    updateAMQ()
    setInterval(() => updateAMQ(), 0.1 * 1000)
})();