const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var r;

var engine, world;

var bg;
var kid,kid_i;

var health1,health2,health3,health;

var gameState="STORY";

var  monster,monstersGroup,monster_i;

var dungeon_i;

var hearts=3;

var killed=0;

var inv=[];

var thing;

var crystal,crystalsGroup;

var time=0,count=0,gamestate=0;

var monsterFight;

function preload()
{
    health=loadImage("Images/Heart.png");
    dungeon_i=loadImage("Images/Dungeon.jpg");
    kid_i=loadImage("Images/1620210894696.png");
    monster_i=loadImage("Images/1620211016360.png");
}

function setup()
{
    var canvas = createCanvas(400,400);
    engine = Engine.create();
    world = engine.world;
    kid=createSprite(200,200,15,15);
    kid.addImage(kid_i);
    health1=createSprite(25,25,50,50);
    health1.addImage(health);
    health2=createSprite(75,25,50,50);
    health2.addImage(health);
    health3=createSprite(125,25,50,50);
    health3.addImage(health);
    monstersGroup=new Group();
    crystalsGroup=new Group();
}

function draw()
{
    bg=dungeon_i;
    background(bg);
    fill("black");
    //text(mouseX + " ," + mouseY ,mouseX ,mouseY );
    if(hearts===3)
    {
        health1.visible=true;
        health2.visible=true;
        health3.visible=true;
    }
    if(gameState==="STORY")
    {
        fill(rgb(255,255,255));
        text("Press space to start",147.5,350);
        textSize(15);
        text("You were going on a ship when a storm raged",47.25,50);
        text("and all your crewmates died",107,65);
        text("When you opened your eyes you were on an island",29,80);
        text("populated with people.",124,95);
        text("The elder of the village told you to find",71.5,110);
        text("the 3 parts of the legendary oar(blade,shaft and grip)",24,125);
        text("Move using the w,a,s,d keys",106.5,150);
        text("If you touch a monster you have to fight him",56.5,165)
        text("Fighting is easy, you just have to press space and then click",1.5,180);
        text("on him rapidly to win the fight",101.5,195);
        kid.visible=false;
        if(keyCode===32)
        {
            gameState="START";
        }
        hearts=3;
        health1.visible=true;
        health2.visible=true;
        health3.visible=true;
    }
    if(gameState==="START")
    {
        kid.visible=true;
        spawnHealth();
        textSize(15);
        fill("white");
        text("Level 1",200,50);
        text("Kill 10 monsters in total to finish this level",10,100);
        text("Killed:"+killed,10,125);
        text("Your Health:"+hearts,10,150);
        if(keyDown("w"))
        {
            kid.y-=3;
        }
        else
        {
            kid.y-=0;
        }
        if(keyDown("a"))
        {
            kid.x-=3;
        }
        else
        {
            kid.x-=0;
        }
        if(keyDown("s"))
        {
            kid.y+=3;
        }
        else
        {
            kid.y+=0;
        }
        if(keyDown("d"))
        {
            kid.x+=3;
        }
        else
        {
            kid.x+=0;
        }
        spawnMonsters();

        if(killed===10)
        {
            gameState="WON";
            console.log(gameState);
        }
        if(kid.isTouching(monstersGroup))
        {
            gameState="FIGHT";
            monstersGroup.destroyEach();
            monsterFight=createSprite(kid.x+100,kid.y,100,100);
            monsterFight.addImage(monster_i);
        }
        if(hearts===2)
        {
            health3.visible=false;
        }
        if(hearts===1)
        {
            health2.visible=false;
        }
        if(hearts<=0)
        {
            health1.visible=false;
            gameState="END";
        }
        if(kid.isTouching(crystalsGroup))
        {
            crystalsGroup.destroyEach();
            hearts+=0.5;
        }
    }
    if(gameState==="END")
    {
        hearts=3;
        text("Press r to restart",147.5,250);
        fill("white");
        textSize(25);
        monstersGroup.destroyEach();
        text("Game Over",135,200);
        kid.x=200;
        kid.y=200;
        if(keyDown("r"))
        {
            gameState="START";
            console.log(gameState);
        }
        killed=0;
        crystalsGroup.destroyEach();
    }
    if(gameState==="WON")
    {
        textSize(20);
        fill("white");
        text("You have completed this level",100,200);
        killed=0;
        hearts=3;
        /*var thing;
        if(r===1)
        {
            thing="blade";
        }
        else if(r===2)
        {
            thing="shaft";
        }
        else if(r===3)
        {
            thing="grip";
        }
        text("As a reward take this "+thing+ " of the oar",100,250);*/
        text("As a reward take this blade",100,250);
        text("Press n to continue",100,300);
        monstersGroup.destroyEach();
        if(keyDown("n"))
        {
            gameState="START2";
        }
        kid.visible=false;
        crystalsGroup.destroyEach();
    }

    if(gameState==="START2")
    {
        kid.visible=true;
        textSize(15);
        fill("white");
        text("Level 2",200,50);
        text("Kill 15 monsters in total to finish this level",10,100);
        text("Killed:"+killed,10,125);
        text("Your Health:"+hearts,10,150);
        if(keyDown("w"))
        {
            kid.y-=3;
        }
        else
        {
            kid.y-=0;
        }
        if(keyDown("a"))
        {
            kid.x-=3;
        }
        else
        {
            kid.x-=0;
        }
        if(keyDown("s"))
        {
            kid.y+=3;
        }
        else
        {
            kid.y+=0;
        }
        if(keyDown("d"))
        {
            kid.x+=3;
        }
        else
        {
            kid.x+=0;
        }

        spawnMonsters();

        if(killed===15)
        {
            gameState="WON2";
            console.log(gameState);
        }
        if(kid.isTouching(monstersGroup))
        {
            gameState="FIGHT2";
            monstersGroup.destroyEach();
            monsterFight=createSprite(kid.x+100,kid.y,100,100);
            monsterFight.addImage(monster_i);
        }
        if(hearts===2)
        {
            health3.visible=false;
        }
        if(hearts===1)
        {
            health2.visible=false;
        }
        if(hearts<=0)
        {
            health1.visible=false;
            gameState="END2";
        }
        spawnHealth();
        if(kid.isTouching(crystalsGroup))
        {
            crystalsGroup.destroyEach();
            hearts+=0.5;
        }
    }
    if(gameState==="END2")
    {
        hearts=3;
        text("Press r to restart",147.5,250);
        fill("white");
        textSize(25);
        monstersGroup.destroyEach();
        text("Game Over",135,200);
        kid.x=200;
        kid.y=200;
        if(keyDown("r"))
        {
            gameState="START2";
            console.log(gameState);
        }
        killed=0;
        crystalsGroup.destroyEach();
    }

    if(gameState==="WON2")
    {
        textSize(20);
        fill("white");
        text("You have completed this level",100,200);
        killed=0;
        hearts=3;
        /*var thing;
        if(r===1)
        {
            thing="blade";
        }
        else if(r===2)
        {
            thing="shaft";
        }
        else if(r===3)
        {
            thing="grip";
        }
        text("As a reward take this "+thing+ " of the oar",100,250);*/
        text("As a reward take this grip",100,250);
        text("Press n to continue",100,300);
        if(keyDown("n"))
        {
            gameState="START3";
            kid.visible=true;
        }
        kid.visible=false;
        crystalsGroup.destroyEach();
    }

    if(gameState==="START3")
    {
        kid.visible=true;
        textSize(15);
        fill("white");
        text("Level 3",200,50);
        text("Kill 20 monsters in total to finish this level",10,100);
        text("Killed:"+killed,10,125);
        text("Your Health:"+hearts,10,150);
        if(keyDown("w"))
        {
            kid.y-=3;
        }
        else
        {
            kid.y-=0;
        }
        if(keyDown("a"))
        {
            kid.x-=3;
        }
        else
        {
            kid.x-=0;
        }
        if(keyDown("s"))
        {
            kid.y+=3;
        }
        else
        {
            kid.y+=0;
        }
        if(keyDown("d"))
        {
            kid.x+=3;
        }
        else
        {
            kid.x+=0;
        }

        spawnMonsters();

        if(killed===20)
        {
            gameState="WON3";
            console.log(gameState);
        }
        if(kid.isTouching(monstersGroup))
        {
            gameState="FIGHT3";
            monstersGroup.destroyEach();
            monsterFight=createSprite(kid.x+100,kid.y,100,100);
            monsterFight.addImage(monster_i);
        }
        if(hearts===2)
        {
            health3.visible=false;
        }
        if(hearts===1)
        {
            health2.visible=false;
        }
        if(hearts<=0)
        {
            health1.visible=false;
            gameState="END3";
        }
        spawnHealth();
        if(kid.isTouching(crystalsGroup))
        {
            crystalsGroup.destroyEach();
            hearts+=0.5;
        }
    }
    if(gameState==="END3")
    {
        hearts=3;
        text("Press r to restart",147.5,250);
        fill("white");
        textSize(25);
        monstersGroup.destroyEach();
        text("Game Over",135,200);
        kid.x=200;
        kid.y=200;
        if(keyDown("r"))
        {
            gameState="START3";
            console.log(gameState);
        }
        killed=0;
        crystalsGroup.destroyEach();
    }

    if(gameState==="WON3")
    {
        textSize(20);
        text("You have completed this level",100,200);
        killed=0;
        hearts=3;
        /*var thing;
        if(r===1)
        {
            thing="blade";
        }
        else if(r===2)
        {
            thing="shaft";
        }
        else if(r===3)
        {
            thing="grip";
        }
        text("As a reward take this "+thing+ " of the oar",100,250);*/
        text("As a reward take this shaft",100,250);
        if(keyDown("n"))
        {
            gameState="ENDGAME";
            kid.visible=true;
        }
        kid.visible=false;
        crystalsGroup.destroyEach();
    }

    if(gameState==="ENDGAME")
    {
        textSize(20);
        fill("white");
        text("You have found all the parts of the legendary oar",50,100);
        text("You can go home now",50,125);
        text("You have completed the game :)",50,150);
    }

    if(gameState==="FIGHT")
    {
        fill("white");
        textSize(15);
        text("Fighting mode",150,100);
        if(keyDown("space"))
        {
            gamestate=1;
        }
        if(gamestate===1)
        {   time+=1;
            console.log(count);
            if(mousePressedOver(monsterFight))
            {
                count+=1;
            }
            if(count===55&&time<150)
            {
                killed+=1;
                monsterFight.destroy();
                gamestate=0;
                gameState="START";
                count=0;
                time=0;
            }
            else if(count!==55&&time>150)
            {
                hearts-=1;
                gameState="START";
                gamestate=0;
                monsterFight.destroy();
                count=0;
                time=0;
            }
        }
    }
    if(gameState==="FIGHT2")
    {
        fill("white");
        textSize(15);
        text("Fighting mode",150,100);
        if(keyDown("space"))
        {
            gamestate=1;
        }
        if(gamestate===1)
        {   time+=1;
            console.log(count);
            if(mousePressedOver(monsterFight))
            {
                count+=1;
            }
            if(count===55&&time<150)
            {
                killed+=1;
                monsterFight.destroy();
                gamestate=0;
                gameState="START2";
                count=0;
                time=0;
            }
            else if(count!==55&&time>150)
            {
                hearts-=1;
                gameState="START2";
                gamestate=0;
                monsterFight.destroy();
                count=0;
                time=0;
            }
        }
    }
    if(gameState==="FIGHT3")
    {
        fill("white");
        textSize(15);
        text("Fighting mode",150,100);
        if(keyDown("space"))
        {
            gamestate=1;
        }
        if(gamestate===1)
        {   time+=1;
            console.log(count);
            if(mousePressedOver(monsterFight))
            {
                count+=1;
            }
            if(count===55&&time<150)
            {
                killed+=1;
                monsterFight.destroy();
                gamestate=0;
                gameState="START3";
                count=0;
                time=0;
            }
            else if(count!==55&&time>150)
            {
                hearts-=1;
                gameState="START3";
                gamestate=0;
                monsterFight.destroy();
                count=0;
                time=0;
            }
        }
    }

    drawSprites();
}

function spawnMonsters()
{
    if(frameCount%30===0)
    {
        var rx=Math.round(random(1,400));
        var ry=Math.round(random(1,400));
        var rvx,rvy,rx,ry;
        if(gameState==="START")
        {
            rvx=Math.round(random(-20,20));
            rvy=Math.round(random(-20,20));
        }
        if(gameState==="START2")
        {
            rvx=Math.round(random(-30,30));
            rvy=Math.round(random(-30,30));
        }
        if(gameState==="START3")
        {
            rvx=Math.round(random(-40,40));
            rvy=Math.round(random(-40,40));
        }
        if(gameState==="FIGHT")
        {
            rvx=0;
            rvy=0;
        }
        monster=createSprite(rx,ry,100,1);
        monster.addImage(monster_i);
        monster.velocityX=rvx;
        monster.velocityY=rvy;
        monstersGroup.add(monster);
    }
}

function spawnHealth()
{
    x=Math.round(random(1,400));
    y=Math.round(random(1,400));
    if(hearts<3)
    {
        if(frameCount%160===0)
        {
            crystal=createSprite(x,y,30,30);
            crystal.addImage(health);
            crystal.scale=0.5;
            crystal.lifetime=160;
            crystalsGroup.add(crystal);
        }
    }
}