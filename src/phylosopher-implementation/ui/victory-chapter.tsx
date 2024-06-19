import ReactEcs, { ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs";
import { cameraChild, playerChildren } from "../../dcl-novel-engine/factory";
import { Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { changeRealm, movePlayerTo } from "~system/RestrictedActions";
import { timers } from "@dcl-sdk/utils";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";
import { hideLoadingSplashScreen, showLoadingSplashScreen } from "../splashScreens/splashScreen";
import { canvasHeight, canvasWidth } from "../../dcl-novel-engine/engine/ui/canvasConstants";
import { palette } from "../../dcl-novel-engine/engine/ui/palette";


 
let visible = false;
let _onClaim: ()=>void 
export function drawVictoryScreenButton(onClaim: ()=>void ){

    visible = true;
    
    engineInstance.getUiController().visible = false;
    _onClaim = onClaim;
}
export function hideVictoryScreenButton( ){
    visible = false;
}
export function renderVictoryScreenButton(){
    return(<UiEntity
        uiTransform={{
            width: "100%",
            height: "100%",
            alignItems: 'center',
            positionType: 'absolute',
            justifyContent: 'center',
            display: visible ? 'flex':'none'
        }}>

             
              
            <UiEntity
                uiTransform={{
                    width: "20%",
                    height:"10%",
                    positionType: 'absolute',
                    position: { bottom: "5%"},
                    alignSelf: 'center',
                    margin:"2%"
                }}
                uiBackground={{
                    textureMode: "nine-slices",
                    texture:{
                        src:"images/ui/UI_separate png/Credibility_back.png"
                    }
                }}
                uiText={{
                    value: "CLAIM",
                    fontSize: 40,
                    textAlign:'middle-center',
                    color: palette.textColor
                }}  
                onMouseDown={()=>{
                    _onClaim();
                }}
                />
    </UiEntity>
)}

