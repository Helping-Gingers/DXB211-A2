// Samples pixels in an image.
let img;
let piece;
let mx = 0;
let my = 0;
let zoomLevel = 100;
let keyLocations = [];
let clickedLocations = [];
let matchingLocations = [0];
let firstDraw = true;

/*
Stuff to do:
* Create an if statement to check what matchingLocations is called, and display information about that location.
* Comment everything.
* Make it prettier.
*/

function preload() { img = loadImage("Brisbane.png"); }

function setup()
{
  createCanvas(750, 500);
  noCursor();
  stroke(0);
  noFill();

  piece = img.get(500,500,1000,1000);
  
  //Setup places on map to be selectable
  keyLocations.push([508-50,43-50]);
  keyLocations.push([1251-25,349-25]);
  keyLocations.push([1296-25,347-25]);
  keyLocations.push([1286-25,390-25]);
  keyLocations.push([181-25,685-25]);
  keyLocations.push([553-25,648-25]);
  keyLocations.push([1012-25,647-25]);
  keyLocations.push([765-25,879-25]);
  keyLocations.push([821-25,961-25]);
  keyLocations.push([501-25,963-25]);
  keyLocations.push([555-25,1037-25]);
  keyLocations.push([1039-25,1201-25]);
  keyLocations.push([945-25,1261-25]);
}

function draw()
{
  
  background(0);
  scale(0.33);
  textSize(50);
  fill("white");
  if(firstDraw)
    {
      text(Intro_Text, 1550, 50, 725);
    }
  image(img, 0, 0);
  for (let i = 0; i < matchingLocations.length; i++)
  {
    
    if (matchingLocations.length >= 2)
      {
        firstDraw = false;
        fill("green");
        square(matchingLocations[i][0] + 25, matchingLocations[i][1] + 25,50);
        noFill();
        testString = matchingLocations[i][0] + ", " + matchingLocations[i][1],
        displayInfo(testString, i);
      }
  }
  
  mouseX = map(mouseX, 0, width-250, 0, 500, true)
  mx = mouseX*3;
  mouseY = map(mouseY, 0, height, 0, 500, true)
  my = mouseY*3;
  
  // If the mouse is over the image,
  // copy that location into the 'piece' variable. 
  if (mx > 0 && mx < img.width*3 && my > 0 && my < img.height*3)
  {
    piece = img.get(mx - zoomLevel/5, my - zoomLevel/5, zoomLevel, zoomLevel);    
  }  

  // Draw a rectangle on the original image to show where
  // the piece was taken from
  fill("black")
  square((mx-(zoomLevel/2)), (my-(zoomLevel/2)), zoomLevel*2);
  
  // Display the piece on the right hand side. Make
  // it display larger, to create a magnification effect. 
  image(piece, (mx-(zoomLevel/2)), (my-(zoomLevel/2)), zoomLevel*2, zoomLevel*2);
  noFill();
}

function displayInfo(inputText, i)
{
  fill("#ffffff")
  textSize(50);
  switch(inputText)
    {
      case "458, -7":
        text(QUTKG, 1550, (i*50), 725);
        break;
      case "920, 1236":
        text(QUTGP, 1550, (i*50), 725);
        break;
      case "1014, 1176":
        text(BBotanicalG, 1550, (i*50), 725);
        break;
      case "1226, 324": //Bakery Ln
        text(BLane, 1550, (i*50), 725);
        break;
      case "1271, 322": //Winn Ln
        text(WLane, 1550, (i*50), 725);
        break;  
      case "1261, 365": //Cali lane
        text(CLane, 1550, (i*50), 725);
        break;  
      case "987, 622":
        text(StJohns, 1550, (i*50), 725)
        break;
      case "796, 936":
        text(QSM, 1550, (i*50), 725)
        break; 
      case "740, 854":
        text(CityHall, 1550, (i*50), 725)
        break;
      case "528, 623":
        text(RomaSt, 1550, (i*50), 725)
        break; 
      case "156, 660":
        text(Suncorp, 1550, (i*50), 725)
        break;
      case "476, 938":
        text(GOMA, 1550, (i*50), 725)
        break; 
      case "530, 1012":
        text(SouthBank, 1550, (i*50), 725)
        break; 
    }
  noFill();
}

function mouseWheel(event) 
{
  if(zoomLevel != 50) { if (event.delta > 0) zoomLevel -= 10; }
  if(zoomLevel != 150) { if (event.delta < 0) zoomLevel += 10; }
}

let n = -1;
function keyPressed()
{
  if (key === "1")
    {
      if(zoomLevel != 150) { zoomLevel += 10; }
    }
  if (key === "2")
    {
      if(zoomLevel != 50) { zoomLevel -= 10; }
    }
  if (key === "3")
    {
      n++;
      clickedLocations.push([mouseX,mouseY]); 
      const lastClicked = clickedLocations[n];
      const matchFound = keyLocations.some(key => isWithinRadius(lastClicked, key));
      
      const matchingKey = keyLocations.find(key => isWithinRadius(lastClicked, key));
      
      if (matchingKey) 
      { 
        console.log("Matched key location:", matchingKey);
        matchingLocations.push([matchingKey[0], matchingKey[1]])
        if(matchingLocations.length >= 3) { matchingLocations = [0]; }
      } 
      else { console.log("No match found."); } 
      
    }

  if (keyCode === LEFT_ARROW) { mouseX -= 10; }
  if (keyCode === RIGHT_ARROW) { mouseX += 10; }
  if (keyCode === UP_ARROW) { mouseY -= 10; }
  if (keyCode === DOWN_ARROW) { mouseY += 10; }
  
}
function isWithinRadius(clicked, key, radius = 23) {
  const dx = clicked[0] - key[0]*0.33;
  const dy = clicked[1] - key[1]*0.33;
  return Math.sqrt(dx * dx + dy * dy) <= radius;
}
function arraysEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) &&
         a.length === b.length &&
         a.every((val, index) => val === b[index]);
}

let Intro_Text = 
`Hello! Welcome to this interactive experience to learn about Brisbane's Inner City! To begin, use the joystick to move your interaction field around the screen. This field can be magnified using the "1" key, or zoomed out using the "2" key. To select one of the regions on the map, highlighted by a black square, hover over the object and hit "3". To hide the description of a location, simply hit "3" on a highlighted region again :). I hope you enjoy learning in this experience, and enjoy exploring Brisbane, Queensland!`;
let QUTKG =
`QUT Kelvin Grove, a Campus bustling with creative minds galore. The Creative Industries, Education, Social Sciences, Health, and Journalism degrees are on Campus. With a myriad of shops on the main street, there's plenty to explore at QUT Kelvin Grove!`;
let QUTGP = 
`QUT Gardens Point, a campus just off the Brisbane River, which is host to a majority of the Sciences, Technologies, Maths, and Engineering Courses, as well as Business, and Law Degrees. With the proximity to the Brisbane CBD, and Botanical Gardens, this campus is great to explore for the general public and students alike!`;

//NOTE, as stated in the references, the following text was generated through the use of CHAT GPT. The QUTKG and QUTGP, as well as Intro_Text above, were written by me.
let BBotanicalG = 
`Located at Mt Coot-tha, the Brisbane Botanic Gardens offer 56 hectares of subtropical and international plant collections, a tropical dome, and Japanese garden. They're a key space for environmental education, recreation, and research, and serve as Brisbane’s premier botanic garden, distinct from the City Botanic Gardens in the CBD.`;
let BLane = 
`Bakery Lane is a vibrant laneway featuring indie boutiques, coffee shops, and creative studios. It forms part of Fortitude Valley’s revitalized laneway network, linking to Winn and California Lanes. Together, these lanes support local artists and small businesses, reinforcing Brisbane’s reputation for fostering grassroots creativity and culture.`;
let WLane = 
`Winn Lane is a narrow alleyway tucked off Ann Street, known for its bold street art, quirky fashion outlets, and alternative cafés. It connects directly to Bakery and California Lanes, forming a cultural corridor in Fortitude Valley that highlights Brisbane’s support of youth culture, emerging creatives, and independent enterprise.`;
let CLane = 
`California Lane brings a West Coast vibe with colourful murals, lively bars, and casual dining. It completes the trio with Bakery and Winn Lanes, creating a walkable, dynamic precinct in Fortitude Valley that merges nightlife, art, and fashion — contributing to the Valley’s role as Brisbane’s entertainment and cultural hotspot.`;
let StJohns = 
`St John’s Cathedral is a landmark of neo-Gothic architecture, still under completion since the early 1900s. Located in the CBD, it serves as a place of worship, heritage, and community events. Its sandstone towers and stained glass windows make it a spiritual and cultural icon within the Brisbane skyline.`;
let QSM = 
`Now also branded as Uptown, Queen Street Mall is Brisbane’s central shopping and dining precinct, home to over 700 retailers. As a pedestrian mall in the heart of the CBD, it’s a commercial and social epicentre that draws locals and tourists, playing a major role in the city’s economic and cultural life.`;
let CityHall= 
`City Hall, with its towering dome and historic clock tower, is one of Brisbane’s most significant civic buildings. It houses the Museum of Brisbane and hosts major public events. Located in King George Square, it symbolizes local governance and is a hub of cultural and community life.`;
let RomaSt = 
`Roma Street is a key transport interchange, connecting train, bus, and regional rail. Beside it, Roma Street Parklands offer lush gardens, walking tracks, and public art. Together, they blend infrastructure with nature, serving as a vital green space and transport gateway for the greater Brisbane area.`;
let Suncorp = 
`Located in Milton, Suncorp Stadium is Brisbane’s premier venue for rugby, soccer, and major concerts. With a 50,000-seat capacity, it hosts the Broncos, Queensland Maroons, and international acts. It plays a central role in Brisbane’s sporting identity and large-scale entertainment scene.`;
let GOMA = 
`GOMA is one of Australia’s most prominent contemporary art institutions, located in the Cultural Centre at South Bank. It showcases cutting-edge exhibitions, film, and installations from Australia and beyond, elevating Brisbane’s status on the global art stage and enriching local creative culture.`;
let SouthBank = 
`South Bank Parklands is a riverside precinct featuring gardens, the Streets Beach lagoon, eateries, and major cultural institutions like QPAC and GOMA. Originally the site of Expo 88, it’s now a central gathering space offering recreation, arts, and dining — defining Brisbane’s lifestyle and identity.`;