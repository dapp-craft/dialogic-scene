import { Color4 } from "@dcl/sdk/math";
import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";
import { canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { timers } from "@dcl-sdk/utils";
import UiStaticMethods from "../../dcl-novel-engine/engine/ui/ui-static-methods";
import { note_button, settings_button } from "../buttonsCanvas";
import { title } from "../ui/title";
import { Tween } from "../../dcl-novel-engine/engine/addons/tween";
import { novelEngine } from "../..";

// #region Loading Splash Screen
export let loadingScreenVisible = true;
let loadingProperties=  {text:"Loading ", stop: true}
export let renderLoadingSplashScreen = ()=>(
    <UiEntity   
       uiTransform={{
           alignSelf: "center",
           width: "100%",
           height: "100%",
           justifyContent : 'center',
           positionType: "absolute",
           display: loadingScreenVisible ? 'flex' :'none'
       }}
       uiBackground={{
        
         // color: Color4.Black()
       color:palette.overlayBackground,
        // textureMode: 'center',
        // texture: {
        //   src: "Assets/Images/realm_bg.png"n
        // }
       }}
       > 
           <UiEntity
               uiTransform={{
                    // position: {right:"10%"},
                   alignSelf: 'center',
                   width: 'auto'
               }}
               uiText={{value: loadingProperties.text, color: palette.textActive, fontSize: canvasWidth* 0.05,
               textAlign: 'middle-center'}}/>
       </UiEntity>
)
function loopedAnim(){ 
  if(loadingProperties.stop)
    return;
  if(loadingProperties.text.length > 10)
    loadingProperties.text = "Loading "
  else
    loadingProperties.text += "."
  timers.setTimeout(()=>{
    loopedAnim();
  }, 500);
} 

export function showLoadingSplashScreen(){
  loadingScreenVisible = true;
  loadingProperties.stop = false;
  if(novelEngine)
    novelEngine.getUiController().blockInput = true;

  loopedAnim();
 } 
 export function hideLoadingSplashScreen(){

  if(novelEngine)
    novelEngine.getUiController().blockInput = true;


  timers.setTimeout(() => {
    loadingScreenVisible = false;
    loadingProperties.stop = true;
  }, 1000);
 }

 
//#endregion
// #region GameOver Splash Screen

let gameOverScreenVisible = false
export let renderGameOverSplashScreen = ()=>(
    <UiEntity   
    uiTransform={{
        alignSelf: "center",
        width: "100%",
        height: "100%",
        justifyContent : 'center',
        positionType: "absolute",
        display: gameOverScreenVisible ? 'flex' :'none'
    }}
    uiBackground={{
        color: Color4.Black()
    }}
    >
        <UiEntity
            uiTransform={{
                alignSelf: 'center'
            }}
            uiText={{value: "/Game Over Splash Screen/", color: palette.textActive, fontSize: canvasWidth* 0.05}}/>
    </UiEntity>
)
export function showGameOverSplashScreen(){
   gameOverScreenVisible = true;
}


export function hideGameOverSplashScreen(){
   gameOverScreenVisible = false;
}


// #endregion

// #region ErrorScreen
let errorVisible = false;
let errorText = "Quest API response error";
let errorScreenProps = {size:0.3}
let errorTween = new Tween(errorScreenProps);
let onExit = ()=>{};
export let renderErrorSplashScreen = ()=>(
  <UiEntity   
  uiTransform={{
      justifyContent: 'center',
      alignContent: 'center',
      width: "100%",
      height: "100%",
      display: errorVisible ? 'flex' :'none',

  }}>
    <UiEntity   
    uiTransform={{
 
        width: errorScreenProps.size * canvasWidth,
        height: errorScreenProps.size * canvasWidth,
        alignSelf: "center",
        justifyContent : 'flex-start',
        positionType: "absolute",
        flexDirection: "column-reverse",

    }}
    uiBackground={{
        color: palette.grayBackground
    }}
    >
            <UiEntity 
            uiTransform={{
              width: "100%",
              height: "25%"
            }}
            uiBackground={{
              color: palette.error
            }}
            uiText={{
              value: "Close",
              color: Color4.White(),
              fontSize: canvasWidth*0.04/0.8 * errorScreenProps.size
            }}
            onMouseDown={()=>{hideErrorSplashScreen()}}
        />
        <UiEntity
            uiTransform={{
                alignSelf: 'center',
                height: "100%"
            }}
            uiText={{value: UiStaticMethods.addNewLine(errorText, 14, 200), color: palette.error, fontSize: canvasWidth* 0.04/0.8 * errorScreenProps.size, textAlign: 'middle-center'}}/>
  
    </UiEntity>
    </UiEntity>
) 
export function showErrorSplashScreen(onDisable: ()=>void, message: string = "" ){
  errorVisible = true;
  errorTween.to({size: 0.3}, 1000).start();
  errorText = message;
  onExit = onDisable;
}

export function hideErrorSplashScreen(){
  errorTween.to({size: 0}, 1000).start().onComplete(()=>{
    errorVisible = false;
    onExit();
  }).start()
}

// #endregion

