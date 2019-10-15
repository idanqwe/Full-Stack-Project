function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    document.getElementsByClassName("submit-form")[0].appendChild(a);
    /*for each item in the array...*/
    var counter = 0;
    for (i = 0; i < arr.length && counter < 5; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].toLowerCase().includes(val.toLowerCase())) {
        var encodedName = encodeURI(arr[i]);
        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.setAttribute("class","dark-background-items onclick-effect");
        /*make the matching letters bold:*/
        // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        // b.innerHTML += arr[i].substr(val.length);
        b.innerHTML = arr[i];
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value=" + encodedName + ">";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          // inp.value = this.getElementsByTagName("input")[0].value;
          location.href = "/TVShows/"+this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
        counter++;
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      location.href = "/TVShows/"+x[currentFocus].innerHTML.slice(0,x[currentFocus].innerHTML.indexOf("<"));
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

// /*An array containing all the country names in the world:*/
var tvShows = ["The Simpsons","Family Guy","Arrow","Fear the Walking Dead","Grey's Anatomy","The Flash","Supernatural","Gotham","Marvel's Agents of S.H.I.E.L.D.","South Park","Law & Order: Special Victims Unit","NCIS: Los Angeles","The I-Land","Hawaii Five-0","Riverdale","The Boys","Game of Thrones","Brooklyn Nine-Nine","Supergirl","American Horror Story","Titans","The 100","Rick and Morty","Sword Art Online","The Good Doctor","Lucifer","The Walking Dead","Breaking Bad","Stranger Things","How to Get Away with Murder","American Dad!","Chicago Fire","The Big Bang Theory","Chicago P.D.","The Blacklist","Criminal Minds","Empire","Suits","The Good Place","Peaky Blinders","Adventure Time","Prison Break","Blue Bloods","NCIS","Young Sheldon","Shameless","Power","Paw Patrol","NCIS: New Orleans","Elementary","Blindspot","This Is Us","DC's Legends of Tomorrow","Skylines","MacGyver","New Amsterdam","Doom Patrol","Murder, She Wrote","Preacher","Élite","It's Always Sunny in Philadelphia","Superstore","The Politician","Chernobyl","Ballers","See No Evil: The Moors Murders","Murdoch Mysteries","La casa de papel","The Office","Godfather of Harlem","The Resident","That '70s Show","Final Space","The Vampire Diaries","Fresh Off the Boat","2 Broke Girls","Mom","The Mentalist","Mr. Robot","Survivor","Chicago Med","How I Met Your Mother","Disenchantment","S.W.A.T.","Black Mirror","Law & Order","Oggy et les Cafards","DEATH NOTE","Van Helsing","Die Rosenheim-Cops","Bull","13 Reasons Why","Miraculous, les aventures de Ladybug et Chat Noir","Teen Wolf","Marvel's Iron Fist","Perry Mason","Doctor Who","CSI: Crime Scene Investigation","Pretty Little Liars","Dexter","Scrubs","Lost","Carnival Row","Baywatch","Charmed","Heartland","Legion","Star Wars: The Clone Wars","Mayans M.C.","Midsomer Murders","Monk","The Orville","Mindhunter","Orange Is the New Black","The Umbrella Academy","iZombie","Sunnyside","Shark Tank","Çukur","Futurama","Henry Danger","Total Divas","CSI: Miami","The Originals","Castle","Black Lightning","The Rookie","Shadowhunters","The Legend of Korra","World on Fire","Legacies","The Sopranos","House","Once Upon a Time","The Handmaid's Tale","Bones","Outlander","Top Gear","True Blood","The Family Man","iCarly","Grimm","Killing Eve","Pennyworth","Frasier","Jane the Virgin","Sherlock","A Million Little Things","The X-Files","The Terror","Magnum P.I.","Singardaan","The Expanse","Queen of the South","Seinfeld","Battlestar Galactica","Scorpion","24","SEAL Team","black-ish","God Friended Me","House of Cards","Euphoria","Downton Abbey","Beverly Hills, 90210","Mr. Mercedes","Undone","Married... with Children","Person of Interest","Better Call Saul","Stargate SG-1","Glitch","Gravity Falls","The Goldbergs","Emergence","Malcolm in the Middle","Big Mouth","Ray Donovan","Polizeiruf 110","Sex Education","Star Trek: Discovery","The Strain","True Detective","Station 19","The King of Queens","Archer","Lethal Weapon","Ghost Whisperer","Stargate Atlantis","Dark","30 Rock","Bewitched","This Old House","Friends","Two and a Half Men","Modern Family","9-1-1","Smallville","Vikings","Doctor Who","Bob's Burgers","Peppa Pig","Homeland","The Good Wife","The Smurfs","American Housewife","Westworld","Goliath","The Deuce","Star Trek","The Magicians","The Fairly OddParents","Star Trek: The Next Generation","Ti Ti Ti","Tatort","Star vs. the Forces of Evil","The Outpost","Pandora","Hunter x Hunter","Private Eyes","Star Trek: Voyager","The Wire","Marvel's Daredevil","Californication","Mayday","Krypton","The Gifted","Hawaii Five-O","Carmen Sandiego","Batman","Columbo","Full House","My Wife and Kids","King of the Hill","BoJack Horseman","New Girl","Almost Family","Tosh.0","Evil","Madam Secretary","Hey Arnold!","Narcos","White Collar","Sons of Anarchy","Batman: The Animated Series","DuckTales","Pokémon Chronicles","Veronica Mars","Designated Survivor","Real Time with Bill Maher","This Is Life with Lisa Ling","Knight Rider","Star Wars Rebels","Star Trek: Deep Space Nine","Batman Beyond","Love, Death & Robots","One Piece Yabai","Mickey Mouse Clubhouse","Dallas","DreamWorks Dragons","Orphan Black","CSI: NY","The Affair","Hart to Hart","Desperate Housewives","Crank Yankers","Crímenes que cambiaron la historia","sailor moon","JAG","Vis a vis","Fremvandrerne","Unbelievable","Heiter bis tödlich - Hubert und Staller","Spartacus","Swamp Thing","Wynonna Earp","Little House on the Prairie","Last Man Standing","Salvation","Gomorra - La serie","The A-Team","Law & Order: Criminal Intent","Seis Manos","Charlie's Angels","Gossip Girl","The Virginian","Tout le monde en parle","Billions","Sense8","Twin Peaks","Marvel's Jessica Jones","The Middle","Fringe","Marvel's The Punisher","Will & Grace","My Little Pony: Friendship Is Magic","Banshee","Big Little Lies","Fargo","Poldark","Marianne","4 Blocks","Scandal","The Ranch","Teenage Mutant Ninja Turtles","The Grand Tour","Stumptown","Hemlock Grove","Ein Fall für zwei","Fleabag","Mad Men","Chuck","Hannibal","Drake & Josh","Psych","SOKO Köln","Strike Back","Desmontando la Historia","American Gods","Buffy the Vampire Slayer","The Man in the High Castle","Ancient Aliens","Sex and the City","The Addams Family","The Haunting","M*A*S*H","Rome","The Last Ship","Totally Spies!","Cobra Kai","Steven Universe","Conan","Salatut elämät","One Tree Hill","Nip/Tuck","Nash Bridges","Magnum, P.I.","Agatha Christie's Poirot","Weeds","FBI","All Elite Wrestling: Dynamite","Timeless","Last Week Tonight with John Oliver","Life Below Zero","Kim Possible","Killjoys","Glee","In aller Freundschaft","Cheers","Continuum","Nature","Catherine the Great","Entourage","Silicon Valley","Get Shorty","Doc Martin","Wanna Have A Good Time","Matlock","Z Nation","Ozark","Band of Brothers","Community","Heroes","The Shannara Chronicles","Spider-Man","Xena: Warrior Princess","Animal Kingdom","Succession","Switched at Birth","Whose Line Is It Anyway?","Sabrina, the Teenage Witch","Warehouse 13","The West Wing","Quantico","Baby Daddy","Airwolf","Party of Five","Jessie","The Neighborhood","Barry","Major Crimes","Dawson's Creek","Maverick","The Amazing World of Gumball","Star Trek: Enterprise","Another Life","Chilling Adventures of Sabrina","Victorious","The Batman","Relic Hunter","He-Man and the Masters of the Universe","Under the Dome","A Discovery of Witches","Home Improvement","The Crown","Raising Dion","Free Rein","Crazy Ex-Girlfriend","Thomas & Friends","Castlevania","American Crime Story","Notruf Hafenkante","Pawn Stars","The O.C.","Siren","Scream Queens","Good Witch","Tom Clancy's  Jack Ryan","Lost Girl","13 Reasons Why: Beyond the Reasons","Curb Your Enthusiasm","Miami Vice","Deadwood","Popeye the Sailor","Rosewood","Dororo Motion Manga","Dynasty","Wizards of Waverly Place","McHale's Navy","The Good Fight","The Adventures of Jimmy Neutron: Boy Genius","BTOOOM!","Sleepy Hollow","Quantum Leap","Good Omens","Trollhunters: Tales of Arcadia","WWE NXT","MythBusters","Impractical Jokers","Good Trouble","Everybody Loves Raymond","Six Feet Under","A Series of Unfortunate Events","Curious George","Lie to Me","Deadliest Catch","Angel","Black Sails","Insatiable","Prodigal Son","We Bare Bears","The Americans","Death in Paradise","ALF","Candice Renoir","The Incredible Hulk","The Last Kingdom","Victoria","RuPaul's Drag Race UK","Shooter","Winx Club","Regular Show","MacGyver","The Jeffersons","90210","Soy Luna","Zoey 101","Mystery Science Theater 3000","Sunset Beach","Firefly","Boston Legal","Dark Angel","Without a Trace","LEGO Ninjago: Masters of Spinjitzu","America's Next Top Model","ThunderCats","Snowfall","The Golden Girls","Batman: The Brave and the Bold","The Beverly Hillbillies","Nashville","Cuéntame cómo pasó","Instinct","The Fosters","Into the Badlands","Parks and Recreation","Young & Hungry","Creepshow","The Wonder Years","Marvel's Agent Carter","The Grim Adventures of Billy and Mandy","Veep","Profilage","Derrick","Happy Tree Friends","Wu Assassins","Silent Witness","Farscape","Marvel's Avengers Assemble","Family Ties","Kono Subarashii Sekai ni Shukufuku wo! Season 1","Power Rangers","The 4400","The New Adventures of Winnie the Pooh","12 Monkeys","Room 104","Whiskey Cavalier","The Conners","Arrested Development","Medium","Castle Rock","Gilmore Girls","Limitless","Babylon 5","Diff'rent Strokes","SOKO Leipzig","Animaniacs","Reign","MasterChef","Atlanta","Cheyenne","Marvel's Runaways","DuckTales","Younger","Lost in Space","Colony","Mickey Mouse","BUNK'D","TaleSpin","Pretty Little Liars: The Perfectionists","Broadchurch","Bates Motel","Code Black","SIX","Santa Clarita Diet","Johnny Bravo","Mad About You","Travelers","Boardwalk Empire","The Saint","Teen Titans","Marvel's Cloak & Dagger","Spin City","Space: 1999","Gold Rush","The Secret Circle","Yellowstone","Sonic Boom","The Last Man on Earth","Galileo","Rebelde","Get Smart","Marvel's Luke Cage","Awkward.","Shaun the Sheep","Doug","Ink Master","Altered Carbon","Charmed","Eureka","Taken","The Thundermans","The Rain","Combat!","Der Alte","Greenleaf","21 Jump Street","Ghost Adventures","Hanna","Young Justice","Numb3rs","Skins","Mission: Impossible","Wentworth","Walker, Texas Ranger","Mujer de Madera","The OA","The Rifleman","Dr. Quinn, Medicine Woman","V","Man with a Plan","Third Watch","The Knick","The Sinner","Dr. Terrible's House of Horrible","Stitchers","Midnight, Texas","Invader Zim","Criminal: UK","Storage Wars","Wanted: Dead or Alive","Jackie Chan Adventures","Distorsions","Trailer Park Boys","Aladdin","The Mick","Ben 10","The Spy","The Mindy Project","Anger Management","The Flintstones","Avatar: The Last Airbender","Próxima Parada","Manifest","Falling Skies","Burke's Law","Scream: The TV Series","Rookie Blue","Aaahh!!! Real Monsters","Bosch","The Twilight Zone","Bonanza","The Unicorn","All in the Family","Light as a Feather","Teen Titans Go!","The Backyardigans","Timon & Pumbaa","The Capture","Justified","Spooks","Brothers and Sisters","Masters of Sex","Danny Phantom","Haven","Faking It","The Righteous Gemstones","Pingu","Baby Looney Tunes","Marvel's The Defenders","Shades of Blue","mixed-ish","Defiance","The Dead Zone","Fuller House","Bering Sea Gold","That's So Raven","G.I. Joe","The Rocky and Bullwinkle Show","Andromeda","A Very English Scandal","The Path","So You Think You Can Dance","The Tudors","Scooby-Doo, Where Are You!","Merlin","Fate/stay night","The InBetween","Rapunzel's Tangled Adventure","Knightfall","American Masters","Bron/Broen","The Transformers","Großstadtrevier","Single Parents","Lux Video Theatre","Revenge","ReLIFE","Pesadilla en la cocina","Andando nas Nuvens","The Real Ghostbusters","Cosmos","Family Matters","Lilo & Stitch: The Series","Humans","Big Brother Canada","Hell's Kitchen","Max and Ruby","The Shield","Primeval","The Act","Blossom","Happy Days","Endeavour","Saving Hope","Future Man","Rocko's Modern Life","Courage the Cowardly Dog","The Closer","Miss Fisher's Murder Mysteries","Ironside","GLOW","Moonlighting","The Dark Crystal: Age of Resistance","According to Jim","3rd Rock from the Sun","Wheeler Dealers","Ash vs Evil Dead","K.C. Undercover","Riviera","Meurtriers sur mesure","Sonic X","Daniel Boone","The Following","The Boondocks","The Avengers: Earth's Mightiest Heroes","Joey","Leverage","SOKO Wismar","A View From The Terrace","Hogan's Heroes","The Pretender","Penny Dreadful","Condor","The Night Shift","Marvel's Inhumans","Girls","It","Ufak Tefek Cinayetler","Call the Midwife","Dark Matter","X-Men","A Confession","Recess","Shameless","Red Dwarf","Bless the Harts","Judging Amy","Pablo Escobar, el patrón del mal","Everybody Hates Chris","Peep Show","Britannia","Lip Sync Battle","8 Simple Rules... for Dating My Teenage Daughter","My Friends Tigger & Pooh","Captain Planet and the Planeteers","Marvel's Ultimate Spider-Man","Jungle Junction","Absentia","The Amazing Race","The League","The Librarians","The Marvelous Mrs. Maisel","Longmire","Bard of Blood","Good Luck Charlie","Monarca","Yu-Gi-Oh! Capsule Monsters","Sliders","Fastest Car","The Chew","Line of Duty","Bob the Builder","Tom & Jerry Kids Show","HarmonQuest","Stargate Universe","Incantesimo","The Worst Witch","Beauty and the Beast","Schooled","Ben 10: Alien Force","Kevin Can Wait","Fantasy Island","The Girlfriend Experience","RuPaul's Drag Race","Torchwood","Millennium","Chesapeake Shores","Highway to Heaven","Rizzoli & Isles","The Loud House","The Lost World","Skam","Explained","Channel Zero","Cain's Hundred","The Penguins of Madagascar","Unbreakable Kimmy Schmidt","Gidseltagningen","Las chicas del cable","Planet Earth","Blue Mountain State","The Pink Panther Show","Any Given Sunday","Cold Case","Unforgettable","Crossing Jordan","Big Time Rush","Zoo","Martin","Oz","Warrior","The Avengers","Extant","Burn Notice","Tin Star","The Glades","Becker","I Love Lucy","SOKO 5113","The Jetsons","Suburgatory","Motive","Nikita","My Name Is Earl","When Calls the Heart","Rectify","CSI: Cyber","Goosebumps","Big Hero 6 The Series","Forever","Teenage Mutant Ninja Turtles","NYPD Blue","The End of the F***ing World","Speechless","Drunk History","Gran Hotel","The Stand","Chip 'n' Dale Rescue Rangers","Sharp Objects","The Curse of Oak Island","In Treatment","Step by Step","Falcon Crest","YOU","Stan Lee's Lucky Man","Schitt's Creek","Her Yerde Sen","The Practice","Alice","Doogie Howser, M.D.","Plebs","Our Boys","Kaamelott","Deception","The Cosby Show","I Dream of Jeannie","Hell on Wheels","The Bachelorette","Lois & Clark: The New Adventures of Superman","MONSTER","Legend of the Seeker","Narcos: Mexico","Gute Zeiten, schlechte Zeiten","Deadly Class","11.22.63","Counterpart","Hot in Cleveland","Minuscule","The Big Valley","The Exorcist","Foyle's War","Liv and Maddie","Below Deck","The Fugitive","The IT Crowd","American Experience","Sanctuary","GTO: Great Teacher Onizuka: Set 2","The Tick","Klan","Sherlock Holmes","Slasher","Jake and the Never Land Pirates","Bubble Guppies","Küstenwache","Blue Heelers","Alma de Hierro","Laramie","The Durrells","Remington Steele","Austin & Ally","Wrecked","The Alienist","The Dukes of Hazzard","CatDog","Impulse","Harlots","The Octonauts","The Andy Griffith Show","Letterkenny","Inspector Morse","SOKO Donau","Transparent","Genius","Taskmaster","Minority Report","Verdades Secretas","Wiseguy","MasterChef Australia","Back at the Barnyard","Lodge 49","Elena of Avalor","Alfred Hitchcock Presents","Philip K. Dick's Electric Dreams","Joia Rara","Good Girls","Father Brown","Game Shakers","VICE News Tonight","Are You Afraid of the Dark?","Freezing","Dick Powell's Zane Grey Theater","Taboo","Brickleberry","Frequency","Living Undocumented","Babylon Berlin","The Wild Wild West","Forensic Files","The Hot Zone","Everwood","Teenage Mutant Ninja Turtles","Criminal: Deutschland","Rocket Power","Scooby-Doo! Mystery Incorporated","Master of None","Luther","Dolunay","El señor de los cielos","Girl Meets World","Vera","Tru Calling","The Scooby-Doo Show","Strike","Private Practice","On the Spot","Duas Caras","Daria","Dominion","Las Vegas","Degrassi: Next Class","The Tomorrow People","Broad City","You're Not a Monster","Diagnosis: Murder","kiss×sis","The Fresh Prince of Bel-Air","In Living Color","H2O: Just Add Water","Marvel's Spider-Man","'Allo 'Allo!","Ghosted","The Blacklist: Redemption","Hart of Dixie","Génial!","Angie Tribeca","Blood & Treasure","Rescue Me","What's New, Scooby-Doo?","Friday Night Lights","Ed, Edd n Eddy","My Kitchen Rules","You're the Worst","Die Harald Schmidt Show","The Young Pope","Ransom","The Fall Guy","The Brady Bunch","Barney Miller","La Casa de al Lado","BLACK LAGOON","Dance Bar","Heroes Reborn","MasterChef","Carol's Second Act","Mr Inbetween","Saved by the Bell","The Bridge","Zone Blanche","Dear White People","Das Traumschiff","SSSS.GRIDMAN","Legends","Made in Chelsea","The L Word","Mister Ed","Planet Earth II","Agatha Christie's Marple","Rhoda","Xiaolin Showdown","Rich House, Poor House","Masters of Horror","Mahou Tsukai no Yome","Samurai Jack","Demain nous appartient","Halt and Catch Fire","The New Batman Adventures","Anthony Bourdain: Parts Unknown","Dance Moms","Blackadder","Bitten","What We Do in the Shadows","Harrow","Freaks and Geeks","Manhunt: Unabomber","Sneaky Pete","Constantine","The Muppet Show","Pose","Roswell","Teen Mom OG","The Spectacular Spider-Man","House of Lies","Wilsberg","The Mary Tyler Moore Show","Versailles","Yes, Dear","Mary Kills People","V.I.P.","Kung Fu: The Legend Continues","Sofia the First","Renegade","Alvin and the Chipmunks","The Munsters","The Pacific","The Looney Tunes Show","American Crime","HAPPY!","Hunter","X-Men: Evolution","Family Affair","Missions","Apocalipse","Comedy Nights with Kapil","Chelsea","Salem","Halloween Baking Championship","Mini Yuri","Taxi","Il Commissario Montalbano","All Rise","Kommissar Rex","Camelot","Berlin Station","Damages","Gargoyles","Life in Pieces","Just Add Magic","Drawn Together","VICE","She-Ra: Princess of Power","Fate/EXTRA Last Encore","Chicago Hope","Rainbow","Who's the Boss?","Dirk Gently's Holistic Detective Agency","Muppet Babies","Punky Brewster","Fast N' Loud","Route 66","El Juego de las Llaves","Newhart","The Boss Baby: Back in Business","Don Matteo","Chrisley Knows Best","War and Peace","Worst Cooks in America","Weird Science","Comedians in Cars Getting Coffee","Wayward Pines","The Catch","Kangoku Gakuen: Prison School","From Dusk Till Dawn: The Series","Quincy, M.E.","Les rivières pourpres","Touched by an Angel","American Pickers","RWBY","Highlander: The Series","Trolls: The Beat Goes On!","Sen Anlat Karadeniz","24: Legacy","Escape at Dannemora","Who Wants to Be a Millionaire? (US)","TableTop","The Met: Policing London","K-Project","APB","L'amica geniale","Graceland","Vice Principals","Grace and Frankie","Sin senos sí hay paraíso","Grand Hotel","You Me Her","The Passage","As Told by Ginger","Fortitude","The Little Mermaid","Lab Rats","UnREAL","The Detail","Highway Thru Hell","Ascension","Utopia","Queer As Folk","Dogs of Berlin","The Rockford Files","Wilfred","V Graham Norton","The Drew Carey Show","The Bionic Woman","El Chapo","Ink Master: Grudge Match","Blue Dragon","Grounded for Life","Les Sauvages","Flikken Maastricht","FlashForward","Jake and the Fatman","NEW GAME!","Insecure","In a Man's World","Biker Mice from Mars","3%","The Listener","El secreto de Puente Viejo","The Client List","The Wayans Bros.","Team Umizoomi","How It's Made","NO.6","Raven's Home","The Secret Life of the American Teenager","SpongeBob SquarePants","Vorstadtweiber","Chance","The Detour","Geordie Shore","Da Vinci's Demons","The Tom and Jerry Show","Girlboss","One Step Beyond","The Brave","Criminal: France","Adam-12","Misfits","Dahoam is Dahoam","The Life and Legend of Wyatt Earp","Underdog","The Lucy Show","Witches of East End","Citrus","Silk Stalkings","Reba","Le Comte de Monte-Cristo","Wonder Woman","Medici: Masters of Florence","Reef Break","Laverne & Shirley","Non Uccidere","Little Women: LA","Saved by the Bell: The New Class","Kingdom","The Real","Finding Justice","Don't Trust the B---- in Apartment 23","Tales of Zestiria the X","Night Court","seaQuest DSV","Kiralik Ask","Explode Coração","TRIGUN","The Real Housewives of Beverly Hills","Helix","The Unit","Hunter Street","Sanditon","Caprica","Extras","ER","Terra Nova","Portlandia","Mr Selfridge","Amagami SS","The Twilight Zone","The Twilight Zone","Lost in Space","Carnivàle","Patriot","Famous in Love","Mike & Molly","Parenthood","Petticoat Junction","Sister Wives","The Dragon Prince","The Haves and the Have Nots","Tom and Jerry Tales","Tour of Duty","The Mist","Why Women Kill","New York Undercover","Inspector Gadget","The Venture Bros.","The Lost Room","Macross 7","Bonding","Abstract: The Art of Design","Still Standing","Being Human","Frontier","Over the Garden Wall","Darkwing Duck","Eli Stone","Robin Hood","Make It or Break It","Casados con Hijos","Estoy Vivo","Kickin' It","Temple","The Borgias","90 Day Fiancé","Kara Sevda","Incorporated","The Killing","The Masked Singer","The Crystal Maze","Grantchester","ACTORS -Songs Connection-","Banana Fish","Perception","Ripper Street","Transporter: The Series","Coroner","Better Things","Boston Public","Baki the Grappler","Duckman","Togetherness","And Then There Were None","Bakugan Battle Brawlers","Tabula Rasa","For The People","Devious Maids","Godless","Criminal Minds: Beyond Borders","Vanderpump Rules","Great News","Greenhouse Academy","Clarence","Cars Toons","Waking the Dead","Puppy Dog Pals","Are You The One?","Mozart in the Jungle","St. Elsewhere","Nancy Drew","The Equalizer","How to Sell Drugs Online (Fast)","Bad Banks","Secrets and Lies","Jack & Jill","Baskets","Reaper","Cuna de lobos","James Gunn's PG Porn","PERSONA5 the Animation","Sam & Cat","Inspector Lewis","Life","Bad Blood","The New Legends of Monkey","La otra mirada","Inside No. 9","The Persuaders!","RELEASE THE SPYCE","The Outer Limits","The Adventures of Tintin","Knight Rider","The Real McCoys","City on a Hill","En nombre del amor","Easy","The A List","Fi","101 Dalmatians: The Series","On My Block","The Office","Perfect Harmony","F is for Family","Project Blue Book","Bloom","Dollhouse","10 Things I Hate About You","Ask the Storybots","Frankie Drake Mysteries","A Different World","Grand Designs","Bullets","Unité 9","Snorks","Instinto","X.X.X: Uncensored","Attila","Raising Hope","La peste","Resurrection","Due South","Ringer","La Reina del Flow","Punk'd","Tanked","Letzte Spur Berlin","13 Geboden","Mission: Impossible","Il capo dei capi","2 Dope Queens","Man vs. Wild","Superior Donuts","Kung Fu Panda: Legends of Awesomeness","Tidelands","Justice League Action","Workaholics","Tales of the Unexpected","Halka","Gentleman Jack","Wings","Jesus","Sugar Rush","Life","Mia and Me","Roman Empire","Disney's House of Mouse","Vivir Sin Permiso","O11CE","Kolchak: The Night Stalker","Westside","Springfloden","The Hogan Family","Thunderbirds Are Go!","Milo Murphy's Law","Falco","The First","Heldt","Gilmore Girls: A Year in the Life","227","The Fall","Childhood's End","Murder Mountain","Queen Sugar","Army Wives","Oteckovia","Pinky and the Brain","Allí abajo","Der Lehrer","NOS4A2","Southland"];



/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), tvShows);
