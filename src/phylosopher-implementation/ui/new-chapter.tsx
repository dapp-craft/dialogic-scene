import ReactEcs, { ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs";
import { cameraChild, playerChildren } from "../../dcl-novel-engine/factory";
import { Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { changeRealm, movePlayerTo } from "~system/RestrictedActions";
import { timers } from "@dcl-sdk/utils";
import { engineInstance } from "../../dcl-novel-engine/engine/engine";
import { hideLoadingSplashScreen, showLoadingSplashScreen } from "../splashScreens/splashScreen";


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
    visible = false; 
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
            pointerFilter: 'block',
            justifyContent: 'center',
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
                    saveAndQuit();
                }}
                />
        </UiEntity>
)}

