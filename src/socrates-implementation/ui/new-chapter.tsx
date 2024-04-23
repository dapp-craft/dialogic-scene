import ReactEcs, { ReactEcsRenderer, UiEntity } from "@dcl/sdk/react-ecs";
import { novelEngine } from "../..";
import { cameraChild, playerChildren } from "../../factory";
import { Transform, engine } from "@dcl/sdk/ecs";
import { Color4, Vector3 } from "@dcl/sdk/math";
import { changeRealm, movePlayerTo } from "~system/RestrictedActions";
import { timers } from "@dcl-sdk/utils";

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
        novelEngine.uiController.overlayController.hideOverlay();
    }, 500)

    ReactEcsRenderer.destroy();
    changeRealm({ realm: 'peer.decentraland.org' })
}
function newChapter(target:string){
    visible = false; 
    novelEngine.uiController.visible = true;
    novelEngine.showFrame(target)
}   
 
let visible = false;
let targetFrame = ""
export function drawNewChapter(target:string){
    visible = true;
    targetFrame = target;
    novelEngine.uiController.visible = false;
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
                uiBackground={{
                 // color:Color4.Red() //pallete.noteBackground
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
                uiBackground={{
                    //color: Color4.Red()//pallete.noteBackground
                }}
              
                onMouseDown={()=>{
                    saveAndQuit();
                }}
                />
        </UiEntity>
)}