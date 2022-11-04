const search = document.getElementById('search');
const seachBtn = document.getElementById('searchBtn');
const mesage = document.getElementById('mesage');
const background = document.getElementById('background');
const youMensagem = document.querySelector(".you-mesage");
const sendBtn = document.getElementById("send");

//user perfil
const userProfile = document.querySelector(".user-profile");
const username = document.querySelector(".user-name");
const userMsg = document.querySelector(".user-msg");
const configBtn = document.getElementById("configBtn");
const user = document.querySelector(".user");

    //BUSCAR

    //configuração

    configBtn.addEventListener("click", () => {

        const configIcon = document.getElementById("configIcon");
        const config = document.getElementById("config");
        config.classList.toggle("hide");
        configBtn.classList.toggle("focus")
    });
    configBtn.addEventListener("blur", () =>{
        const config = document.getElementById("config");
        config.classList.toggle("hide");
    })

    // função de alterar papel de parede

    const wallpaperScreen = document.getElementById("wallpaperScreen")
    const paperBtn = document.getElementById("paperBtn")

    paperBtn.addEventListener("click", () => {
        wallpaperScreen.classList.toggle("hide");
        const config = document.getElementById("config");
        config.classList.toggle("hide");
        configBtn.classList.toggle("focus")
    })
    //adicionando wallpaper
    const filewallpaper = document.getElementById("filewallpaper")
    const submitFilepaper = document.getElementById("submitwallpaper")
    const photopaper = document.getElementById("apresention-wallpaper")

    filewallpaper.addEventListener('change', (event) => {
        let reader = new FileReader();

        reader.onload = () => {
            photopaper.src = reader.result;
        }

        reader.readAsDataURL(filewallpaper.files[0]);

        submitFilepaper.addEventListener('click', () => {
            background.style.backgroundImage = 'url(' + reader.result + ')';
            wallpaperScreen.classList.add("hide");
        })
    })
    //sair do enviar wallpaper
    const closewallpaper = document.getElementById("close-wallpaper");
        closewallpaper.addEventListener("click", () => {
        wallpaperScreen.classList.toggle("hide");
    })


    // função de mudar perfil

    const profileScreen = document.getElementById("profileScreen")
    const profileBtn = document.getElementById("profileBtn")

    profileBtn.addEventListener("click", () => {
        profileScreen.classList.toggle("hide");
        const config = document.getElementById("config");
        config.classList.toggle("hide");
        configBtn.classList.toggle("focus")
    })
    // adicionando foto de perfil
    const fileprofile = document.getElementById("fileprofile")
    const submitFile = document.getElementById("submit")
    const photo = document.getElementById("apresention-profile")

    fileprofile.addEventListener('change', (event) => {
        let reader = new FileReader();

        reader.onload = () => {
            photo.src = reader.result;
        }

        reader.readAsDataURL(fileprofile.files[0]);

        submitFile.addEventListener('click', () => {
            userProfile.src = reader.result;
            profileScreen.classList.add("hide");
        })
    })
    //sair do enviar perfil
    const closeprofile = document.getElementById("close-profile");
        closeprofile.addEventListener("click", () => {
        profileScreen.classList.toggle("hide");
    })

    // função de apelido
    // função modo escuro
    const modeBtn = document.getElementById("modeBtn");
    const indicationMode = document.getElementById("indication-mode");

    modeBtn.addEventListener("click", () => {
        const config = document.getElementById("config");
        config.classList.toggle("hide");
        configBtn.classList.toggle("focus")
    })

    // função escolher cor de conversa

    // função de adicionar mensagem

function addMensage (user) {
    // cria um novo elemento div
    // e dá à ele conteúdo
    var yourmesage = document.createElement("div");//creando campo da msg
    yourmesage.setAttribute('class','your-mesage');//campo da msg
    var youname = document.createTextNode("você");//creando nome voce
    var divmensagem = document.createElement("div");
    //h5
    var h5 = document.createElement("h5");
    h5.appendChild(youname);
    divmensagem.setAttribute('class','user-text');
    var mensagem = document.createTextNode(user);
    //p
    var p = document.createElement("p");
    p.appendChild(mensagem);
    yourmesage.appendChild(divmensagem);
    divmensagem.appendChild(h5);
    divmensagem.appendChild(p);
    background.appendChild(yourmesage);
  }

mesage.addEventListener('keydown', function(event) {
    if(event.keyCode === 13 & mesage.value != ""){
        var user = mesage.value;
        addMensage(user);
        mesage.value = "";
    }
})
sendBtn.addEventListener('click', function(){
    if(mesage.value != ""){
        var user = mesage.value;
        addMensage(user);
        mesage.value = "";
    }
})
    //Sistema de busca
    const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";
    
    const main = document.getElementById("main");
    const form = document.getElementById("form");
    const usuarios = document.querySelector(".user");
    
    getMovies(APIURL);
    
    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
    
        showMovies(respData.results);
    }
    
    function showMovies(movies) {
        //clear main
        main.innerHTML = "";
        movies.forEach((movie) => {
            const { poster_path, title } = movie;
            //raja
            const movieEl = document.createElement("div");
            movieEl.classList.add("user");
    
            movieEl.innerHTML = `
            <div class="user">
            <div class="user-img">
            <img src="${IMGPATH + poster_path}" class="user-profile"/>
            </div>

            <div class="user-text">
            <h5 class="user-name">${title}</h5>
            <p class="user-msg">me adicione e vamos conversar!</p>
            </div>
            </div>
            `;

            const usercontainer = document.querySelector(".container-users");
            main.appendChild(movieEl)
            movieEl.addEventListener("click", () => {
                usercontainer.appendChild(movieEl);
            })
        });}
    
        search.addEventListener('keyup', (e)=> {
            e.preventDefault();
            const searchTerm = search.value;
    
            if(searchTerm) {
                getMovies(SEARCHAPI + searchTerm);
            }
        } );

        search.addEventListener('keypress', () => {
            if(search.value != "") {
                main.classList.remove('hide');
                usuarios.classList.add('hide');
            }
        });
        search.addEventListener('blur', () => {
            usuarios.classList.remove('hide');
            main.classList.add('hide');
            search.value = "";
        });


        //Trocando os usuarios de conversa
        user.addEventListener("click", ()=> {
            const userView = document.querySelector(".user-view");
            const conversa = document.getElementById("conversa");
            const usernameView = document.getElementById("user-name-view");
            const userimgView = document.getElementById("user-img-view");
            userimgView.src = userProfile.src;          
            usernameView.innerText = username.innerText;
            userView.classList.remove("hide");
            background.classList.remove("hide");
            conversa.classList.remove("hide");
            user.classList.add("focus")
        });