import ReactEcs, { ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs";
import { cameraChild, playerChildren } from "../../dcl-novel-engine/factory";
import { Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { changeRealm, movePlayerTo } from "~system/RestrictedActions";
import { timers } from "@dcl-sdk/utils";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";
import { hideLoadingSplashScreen, showLoadingSplashScreen } from "../splashScreens/splashScreen";
import { createContinueButton } from "./startGame";
import { continueGame, novelEngine } from "../..";
import { soundController } from "../../dcl-novel-engine/engine/util/sound-controller";


// this function needs to move player on new location and remove all resources.
export function saveAndQuit(){
    visible = false;

    let entity = engine.addEntity()
    
    Transform.create(entity, {
        position: Transform.get(engine.CameraEntity).position,
        rotation: Transform.get(engine.CameraEntity).rotation,
        scale: Vector3.One()
    })
    Transform.getMutable(cameraChild).parent = entity;

    movePlayerTo({
        newRelativePosition: Vector3.create(20, 1, 20),
        cameraTarget: Vector3.create(2, 2 , 2),  
    })
    timers.setTimeout(()=>{
        engineInstance.getUiController().overlayController.hideOverlay();
        hideLoadingSplashScreen();
        ReactEcsRenderer.destroy();
    }, 2500)
    showLoadingSplashScreen();

    changeRealm({ realm: 'peer.decentraland.org' })
}

function newChapter(target:string){
    engineInstance.getUiController().visible = true;
    engineInstance.showFrame(target)
}   
 
let visible = false;
let targetFrame = ""

export function drawNewChapter(target:string){
    visible = true;
    targetFrame = target;
    engineInstance.getUiController().visible = false;
}
export function renderChapter(){

    return(<UiEntity
        uiTransform={{
            width: "100%",
            height: "100%",
            alignItems: 'center',
            positionType: 'absolute',
            justifyContent: 'center',
            pointerFilter: 'block',
            display: visible ? 'flex':'none'
        }}>
              <UiEntity
                uiTransform={{
                    width: "30%",
                    height: "30%",
                    position: { bottom: "-10%"},
                    alignSelf: 'center',
                    margin: "2%"
                }}
               
                onMouseDown={()=>{
                    visible = false; 
                    soundController.playSound("Assets/Audio/click.wav", false, Vector3.create(0, 2, 0));
                    newChapter(targetFrame);
                }}
                />
            <UiEntity
                uiTransform={{
                    width: "30%",
                    height:"30%",
                    position: { bottom: "-10%"},
                    alignSelf: 'center',
                    margin:"2%"
                }}
              
                onMouseDown={()=>{
                    visible = false; 
                    soundController.playSound("Assets/Audio/click.wav", false, Vector3.create(0, 2, 0));
                    saveAndQuit();
                }}
                /> 
             <UiEntity
                uiTransform={{
                    width: "30%",
                    height:"50%",
                    position: { top: "0%", right:"5%"},
                    alignSelf: 'center',
                    positionType: 'absolute',
                    margin:"2%",
                }}
                onMouseDown={()=>{ 
                    visible = false; 
                    soundController.playSound("Assets/Audio/click.wav", false, Vector3.create(0, 2, 0));
                    createContinueButton(continueGame);
                }}
                />
       
        </UiEntity>
)}

