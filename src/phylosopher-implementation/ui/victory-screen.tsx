import ReactEcs, { UiEntity } from "@dcl/sdk/react-ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { saveAndQuit } from "./new-chapter";
import { canvasHeight, canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { Tween } from "../../dcl-novel-engine/engine/addons/tween";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";
 
let visible = false;
let victoryFunction = ()=>{};

let tweenProps = {a:0, button_y: -50}
let tween = new Tween(tweenProps)
export function showCompletedSplashScreen(onClick: ()=>void, exitAfterClick = true, ){
     if(exitAfterClick) 
        victoryFunction = ()=>{ onClick; saveAndQuit()}
    else 
        victoryFunction = onClick;
    visible = true;
    tween.to({a:1}, 300).onComplete(()=>{
        tween.to({button_y: 0.02}, 1500).start();
    }).start();
}



export let renderVictoryScreen = () => (
   <UiEntity
        uiTransform={{
            width: `100%`,
            height: `100%`,
            display: visible ?'flex':'none', 
            positionType: 'absolute',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center'
        }} 
        uiBackground={{
            color: palette.overlayBackground
        }}
        > 
          <UiEntity // startScreen
        uiTransform={{
            
            width: canvasWidth,
            height: canvasWidth *1150/2048,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: "column"
    
        }}  
        uiBackground={{
            textureMode: 'stretch',
            texture: {
                src: "images/ui/UI_separate png/start_screen.png"
            }
           
        }}>
            <UiEntity
                uiTransform={{
                    width: "35%",
                    height: "12%",
                    position: { bottom: tweenProps.button_y * canvasHeight},
                    //alignSelf: 'center',
                    margin:"2%"
                }}
                uiBackground={{
                    texture:{
                        src: "images/ui/UI_separate png/exit_button.png"
                    }
                }}
              
                onMouseDown={()=>{
                    victoryFunction();
                    visible = false;
                }}
                />
           <UiEntity
                uiTransform={{
                    width: "80%",//2048 - 1024
                    height:"70.4%",//1150 - 512
                    position: { bottom: tweenProps.button_y * canvasHeight * 7},
                    positionType: 'absolute',
                    //alignSelf: 'center',
                    margin:"2%"
                }}
                uiBackground={{
                    textureMode:'stretch',
                    texture: {
                        src: "images/ui/With_text2.png"
                    }
                }}
                />
        </UiEntity>
        
        </UiEntity>
    )