//On Scroll Function
window.addEventListener("scroll", function() {
    CheckTab()
  });

  //Start Function
  function start(){
    CheckTab()
  }



  //Check on what tab you are
  let LastTab
  function CheckTab(){
    names = ["homeDiv","aboutDiv","projectsDiv","socialDiv","contactDiv"]
    CurrentTab = 0

    for(var i = 0; i < names.length; i++){
        El =  document.getElementById(names[i])
        if (window.scrollY+window.scrollY/5  > (El.offsetTop + El.offsetHeight)) {
            CurrentTab = i + 1
        }
    }

    if(CurrentTab>4){CurrentTab = 4}

    if(CurrentTab != LastTab){
        ChangeMenuTab(CurrentTab)
        LastTab = CurrentTab
    }
  }


  //Change menu to right tab  
  function ChangeMenuTab(tab){
    SwitchId = ["HomeID","AboutId","ProjectsId","SocialId","ContactId"]
    href = ["#HomePage","#AboutPage","#ProjectsPage","#SocialPage","#ContactPage"]

    for(i = 0; i < SwitchId.length; i++){
        if(i==tab){
            CurrentEl = document.getElementById(SwitchId[tab])
            CurrentEl.classList.add("selected")
            // document.location.hash = href[i]
        }
        else{
            RemoveEl = document.getElementById(SwitchId[i])
            if(RemoveEl.classList.contains("selected")){
                RemoveEl.classList.remove("selected")
            }
        }
    }
  }