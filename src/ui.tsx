import {
  engine,
  Transform,
  UiBackground,
} from '@dcl/sdk/ecs'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { novelEngine } from '.';
import { notesTab } from './phylosopher-implementation/ui/notes';

import { note_button, settings_button, uiCanvas } from './phylosopher-implementation/buttonsCanvas';
import { debugUI } from './phylosopher-implementation/ui/debug-ui';
import { credibility } from './phylosopher-implementation/ui/credibility';
import { title } from './phylosopher-implementation/ui/title';
import { renderChapter } from './phylosopher-implementation/ui/new-chapter';
import { settings } from './dcl-novel-engine/engine/ui/settings';
import { Color4 } from '@dcl/ecs-math';
import { renderErrorSplashScreen, renderGameOverSplashScreen, renderLoadingSplashScreen } from './phylosopher-implementation/splashScreens/splashScreen';
import { timers } from '@dcl-sdk/utils';
import { renderLobbyScreen } from './phylosopher-implementation/ui/startGame';
import { renderVictoryScreen } from './phylosopher-implementation/ui/victory-screen';


let was = false;



export let RootCanvas = ()=>(
  <UiEntity
    uiTransform={
      {
        width: "100%",
        height: "100%",
      }
    }
   >
      {
        renderChapter()
      }
      {
        novelEngine?.getUiController()?.dialogWithOverlays()
      }
      {
         uiCanvas() 
      }
      {
        notesTab?.render()
      }
      {
        credibility()
      }
      {
        renderLobbyScreen()
      }
      
      {
         settings?.render()// ближе всего к игроку
      }
      {
        debugUI()
      }
      
      
      {
        renderGameOverSplashScreen()
      }
       {
        renderVictoryScreen()
      } 
  
      {
        renderLoadingSplashScreen()
      }
      {
        renderErrorSplashScreen()
      }
    
    </UiEntity>
)

// export function getUiComponents(){
//   return uiComponents;
// }

