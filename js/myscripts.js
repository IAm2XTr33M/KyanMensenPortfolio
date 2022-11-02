//DONT OPEN
const firebaseConfig = {
    apiKey: "AIzaSyDAmdaJ_mO7ugGoe7jS8xBOdd-LPEtjvcA",
    authDomain: "portfolio-d1b06.firebaseapp.com",
    projectId: "portfolio-d1b06",
    storageBucket: "portfolio-d1b06.appspot.com",
    messagingSenderId: "973862884520",
    appId: "1:973862884520:web:a77530912949f93505de9d",
    measurementId: "G-L9STRS7NK1"
};

const Projects = [[]];

let Language = "en";

window.onload = function() {
    GetProjects();
    CheckTab();
}

function GetProjects(){
    if(window.location.href.includes("nl")){
        Language = "nl"
    }
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    var i = 0;

    db.collection("Projects").orderBy("updated", "desc").get().then(documents => {

        Projects.length = documents.size;

        for(var o = 0; o < Projects.length; o++){
            Projects[o] = [];
        }

        documents.forEach(doc => {
            var data = doc.data();

            Projects[i][0] = data.title
            Projects[i][1] = data.image1
            Projects[i][2] = data.image2
            if(Language=="en"){
                Projects[i][3] = data.desc
            }
            else{
                Projects[i][3] = data.desc_nl
            }
            Projects[i][4] = data.learned
            Projects[i][5] = data.github

            MakeProjects(i);

            i++;
        });
    });
}

let isExpanded = false;
let ShowingMore = false;
let CurrentExpandedNum;

function MakeProjects(Number){
    if(Number < 6){
        var DivEl = document.getElementById("ProjectsDiv");
    }
    else{
        var DivEl = document.getElementById("ProjectsDiv2");
    }

    const node = document.getElementById("ProjectTemplate");
    const clone = node.cloneNode(true);

    clone.id = Number;
    clone.classList.remove("hidden");

    //Change Image1
    clone.childNodes[3].childNodes[1].src = Projects[Number][1];

    //Change Title
    clone.childNodes[3].childNodes[3].childNodes[1].innerHTML = Projects[Number][0];

    //Change ID div to hide
    clone.childNodes[5].id = Number + "expand";

    //Change Description
    clone.childNodes[5].childNodes[1].innerHTML = Projects[Number][3];

    //Change Learned
    if(Language=="en"){
        clone.childNodes[5].childNodes[3].innerHTML = "I Learned: " + Projects[Number][4];

    }
    else{
        clone.childNodes[5].childNodes[3].innerHTML = "Wat ik heb geleerd: " + Projects[Number][4];
    }

    //Change Image 2
    clone.childNodes[5].childNodes[5].src = Projects[Number][2];

    //Change Link
    clone.childNodes[5].childNodes[7].innerHTML = Projects[Number][5];
    clone.childNodes[5].childNodes[7].href = Projects[Number][5];

    DivEl.appendChild(clone);

}



function ExpandProject(Number){

    if(!isExpanded){
        document.getElementById("ProjectsDiv").classList.remove("grid-cols-3");
        document.getElementById("ProjectsDiv2").classList.remove("grid-cols-3");

        document.getElementById(Number+"expand").classList.remove("hidden");

        if(Language=="en"){
            document.getElementById("ExpandButton").innerHTML = "Back to projects.";
        }
        else{
            document.getElementById("ExpandButton").innerHTML = "Terug naar projecten.";
        }


        for(var i = 0; i < Projects.length ; i++){
            var element = document.getElementById(i);  
            if(i != Number){
                element.style.display = "none";
            }            else{
                CurrentExpandedNum = Number;
                element.classList.remove("projectContainer");
                element.classList.add("projectSelected");
            }
        }
        isExpanded = true;
    }
}
 
function ClickedButton(){
    if(isExpanded){
        window.location.href = "#ProjectsPage";
        
        document.getElementById("ProjectsDiv").classList.add("grid-cols-3");
        document.getElementById("ProjectsDiv2").classList.add("grid-cols-3");

        document.getElementById(CurrentExpandedNum+"expand").classList.add("hidden");

        for(var i = 0; i < Projects.length ; i++){
            var element = document.getElementById(i);  
            if(i != CurrentExpandedNum){
                element.style.display = "block";
            }
            else{
                element.classList.remove("projectSelected");
                element.classList.add("projectContainer");
            }            
        }
        isExpanded = false;
        if(ShowingMore){
            if(Language=="en"){
                document.getElementById("ExpandButton").innerHTML = "Collapse all projects.";
            }
            else{
                document.getElementById("ExpandButton").innerHTML = "Vouw al de projecten in.";
            }
        }
        else{
            if(Language=="en"){
                document.getElementById("ExpandButton").innerHTML = "See all projects.";
            }
            else{
                document.getElementById("ExpandButton").innerHTML = "Zie al de projecten.";
            }
        }
    }
    else{
        PDiv2El = document.getElementById("ProjectsDiv2");
        if(!ShowingMore){
            if(Language=="en"){
                document.getElementById("ExpandButton").innerHTML = "Collapse all projects.";
            }
            else{
                document.getElementById("ExpandButton").innerHTML = "Vouw al de projecten in.";
            }
            PDiv2El.classList.remove("ShowLess");
            PDiv2El.classList.add("ShowMore");
            ShowingMore = true;
        }
        else{
            if(Language=="en"){
                document.getElementById("ExpandButton").innerHTML = "See all projects.";
            }
            else{
                document.getElementById("ExpandButton").innerHTML = "Zie al de projecten.";
            }            
            PDiv2El.classList.remove("ShowMore");
            PDiv2El.classList.add("ShowLess");
            ShowingMore = false;
        }
    }
}
















//On Scroll Function
window.addEventListener("scroll", function() {
    CheckTab()
  });

  //Check on what tab you are
  let LastTab = 6;
  function CheckTab(){
    names = ["homeDiv","aboutDiv","projectsDiv","socialDiv","contactDiv"]
    CurrentTab = 0

    for(var i = 0; i < names.length; i++){
        El =  document.getElementById(names[i])
        if (window.scrollY+window.scrollY/6.5  > (El.offsetTop + El.offsetHeight)) {
            CurrentTab = i + 1
        }
    }

    if(CurrentTab>4){CurrentTab = 4}

    if(CurrentTab != LastTab){
        ChangeMenuTab(CurrentTab)
        LastTab = CurrentTab
    }

    let ProjectDivEl = document.getElementById("ProjectsDiv");
    if(CurrentTab == 2 || CurrentTab == 3){
        ProjectDivEl.classList.add("slide-in-blurred-left");
        ProjectDivEl.style.visibility = "visible"
    }
  }


  //Change menu to right tab  
  function ChangeMenuTab(tab){
    SwitchId = ["HomeID","AboutId","ProjectsId","SocialId","ContactId"]
    href = ["#HomePage","#AboutPage","#ProjectsPage","#SocialPage","#ContactPage"]

    for(i = 0; i < SwitchId.length; i++){
        if(i==tab){
            document.getElementById(SwitchId[tab]).classList.add("selected")

            document.getElementById(SwitchId[tab] + "2").classList.add("selected")
            document.getElementById(SwitchId[tab]  + "3").classList.add("selected")

        }
        else{
            RemoveEl = document.getElementById(SwitchId[i])
            if(RemoveEl.classList.contains("selected")){
                RemoveEl.classList.remove("selected")
                document.getElementById(SwitchId[i] + "2").classList.remove("selected")
                document.getElementById(SwitchId[i]  + "3").classList.remove("selected")
            }
        }
    }
  }

  