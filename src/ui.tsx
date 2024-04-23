import {
  engine,
  Transform,
  UiBackground,
} from '@dcl/sdk/ecs'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { novelEngine } from '.';
import { notesTab } from './socrates-implementation/ui/notes';

import { note_button, settings_button } from './engine/ui/button/buttonsCanvas';
import { debugUI } from './socrates-implementation/ui/debug-ui';
import { credibility } from './socrates-implementation/ui/credibility';
import { title } from './socrates-implementation/ui/title';
import { renderChapter } from './socrates-implementation/ui/new-chapter';
import { settings } from './engine/ui/settings';
import { Color4 } from '@dcl/ecs-math';
import { renderErrorSplashScreen, renderGameOverSplashScreen, renderLoadingSplashScreen, uiCanvas } from './socrates-implementation/splashScreens/splashScreen';
import { timers } from '@dcl-sdk/utils';
import { renderLobbyScreen } from './socrates-implementation/ui/startGame';
import { renderVictoryScreen } from './socrates-implementation/ui/victory-screen';


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
        novelEngine?.uiController?.dialogWithOverlays()
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

