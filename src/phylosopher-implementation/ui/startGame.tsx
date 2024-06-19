import { Entity, UiBackground } from "@dcl/sdk/ecs";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";
import { getPlayerPosition, playSound, timers } from "@dcl-sdk/utils";
import { Vector3 } from "@dcl/ecs-math";
import { Color4 } from "@dcl/sdk/math";
import { canvasHeight, canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { Tween } from "../../dcl-novel-engine/engine/addons/tween";
import { saveAndQuit } from "./new-chapter";
import { soundController } from "../../dcl-novel-engine/engine/util/sound-controller";
import { setUiCanvas } from "../buttonsCanvas";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";


// Here you can see the implementation of the Start Game screen. 
// You can add a new screen by following the same pattern.
// Just use visible = false to hide the screen and start the game!

let theme_sound: Entity|undefined = undefined;
let continueVisible = false;
let startVisible = false;
let quitVisible = false;

let startButtonFunction = ()=>{};
let continueButtonFunction = ()=>{};
let lobbyParams = {size: 1};
let lobbyAnimation = new Tween(lobbyParams);

export function createQuitButton(){
    quitVisible = true;
    lobbyParams.size = 1;
}
export function createContinueButton(action:()=>void)
{
    continueVisible = true;
    theme_sound = soundController.playMusicSound("Assets/Audio/Decentraland_Philosophy Game_Reflection Theme.mp3", true, Vector3.create(0, 11, 0));
    continueButtonFunction = action;
}
export function createStartButton(action:()=>void){
    startVisible = true;
    theme_sound = soundController.playMusicSound("Assets/Audio/Decentraland_Philosophy Game_Reflection Theme.mp3", true, Vector3.create(0, 11, 0));
    startButtonFunction = action;
}

function onButtonClick(onStartAnim: ()=>void, onEndAnim: ()=>void){
    onStartAnim();
    timers.setTimeout(()=>{
    lobbyAnimation.to({size: 0}, 1000).start().onComplete(onEndAnim);
    }, 400)
    playSound("Assets/Audio/click.wav", false, Vector3.subtract(getPlayerPosition(), Vector3.create(0, 2, 0)))
} 
let button =(onStartAnim: ()=>void, onEndAnim: ()=>void, texture:string) =>
(  
    <UiEntity
    uiTransform={{ 
        width: "34%",
        height: "10%",
        position: {top: "18%"},
        margin: '0.8%'
    }}
    uiBackground={{ 
        texture: {
            src: texture
        },
        textureMode: "stretch"
    }}

    onMouseDown={()=>{
        onButtonClick(onStartAnim, onEndAnim)}}
    />
)
export let continueFrameId = "0x0100000000003A26";
let locked = false;
export function renderLobbyScreen(){
    return (<UiEntity
    uiTransform={{
        width: `${lobbyParams.size*100}%`,
        height: `${lobbyParams.size*100}%`,
        display: continueVisible || startVisible || quitVisible ?'flex':'none', 
        positionType: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    }} 
    uiBackground={{
       color: palette.overlayBackground,
    // color: Color4.create(0.2, 0.2, 0.2, 1),
    //   textureMode: 'stretch',
    //   texture: {
    //    src: "Assets/Images/realm_bg.png"
    //  }
    }}
    > 
      <UiEntity // startScreen
    uiTransform={{ 
        
        width: canvasWidth  *lobbyParams.size,
        height: canvasWidth *1150/2048 *lobbyParams.size,
        display: startVisible ? 'flex':'none', 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"

    }}  
    uiBackground={{
        textureMode: 'stretch',
        texture: {
            src: "images/ui/UI_separate png/start_screen.png"
        }
       
    }}>
    { // start new game 
        button(()=>{
            
            if(!locked){
                locked = true;
                if(theme_sound)
                soundController.stopMusicSound(theme_sound);
                startButtonFunction();
                setUiCanvas(true);
                timers.setTimeout(()=>{
                    startVisible = false; 
                    locked = false;
                }, 500)
            }
          
            
        }, ()=>{ },  "images/ui/UI_separate png/new_game_button.png")
    }
      {
    // exit
        button(()=>{saveAndQuit();
        }, ()=>{
            if(theme_sound)
            soundController.stopMusicSound(theme_sound);
            startVisible = false;},  "images/ui/UI_separate png/exit_button.png")
    }
    </UiEntity>

    <UiEntity // continue screen
    uiTransform={{
        width: canvasWidth  *lobbyParams.size,
        height: canvasWidth *1150/2048 *lobbyParams.size,
        display: continueVisible ? 'flex':'none',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        positionType: 'absolute',
        
    }} 
    uiBackground={{
        textureMode: 'stretch',
        texture: {
            src: "images/ui/UI_separate png/start_screen.png"
        }
    }}>
    { // start new game
        button(()=>{
            if(!locked){
                if(theme_sound)
                soundController.stopMusicSound(theme_sound);
                locked = true;
                continueButtonFunction();
                setUiCanvas(true);
                timers.setTimeout(()=>{
          
                    locked = false;
                    startVisible = false; 
                }, 500)
                
            }
        
        }, ()=>{ }, "images/ui/UI_separate png/continue_button.png")
    }
      {
    // exit
        button(()=>{
            if(theme_sound)
            soundController.stopMusicSound(theme_sound);
            saveAndQuit();
        }, ()=>{continueVisible = false; startVisible = false; quitVisible = false},  "images/ui/UI_separate png/exit_button.png")
    }
    </UiEntity>


    <UiEntity // continue screen
    uiTransform={{
        width: canvasWidth  *lobbyParams.size,
        height: canvasWidth *1150/2048 *lobbyParams.size,
        display: quitVisible ? 'flex':'none',
        alignItems: 'center',
        positionType: 'absolute',
        justifyContent: 'center',
        flexDirection: "column"
        
    }} 
    uiBackground={{
        textureMode: 'stretch',
        texture: {
            src: "images/ui/UI_separate png/start_screen.png"
        }
    }}>
      {
    // exit
        button(()=>{
            if(theme_sound)
            soundController.stopMusicSound(theme_sound);
            saveAndQuit();
        }, ()=>{continueVisible = false; startVisible = false; quitVisible = false},  "images/ui/UI_separate png/exit_button.png")
    }
    </UiEntity>

    </UiEntity>
)}