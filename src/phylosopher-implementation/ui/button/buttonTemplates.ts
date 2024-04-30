import { InputAction } from "@dcl/sdk/ecs";
import { Resources } from "../../../dcl-novel-engine/resources";
import { ButtonTemplate } from "../../../dcl-novel-engine/engine/ui/button/renderedButton";
import { Color4 } from "@dcl/ecs-math";
import { buttonConfig } from "../../../dcl-novel-engine/engine/ui/button/buttonConfig";

/// <reference path="../../../dcl-novel-engine/engine/ui/button/buttonConfig.ts" />
/// <reference path="../../../dcl-novel-engine/engine/ui/button/renderedButton.tsx" />
/// This file is responsible for the button templates in the game. Don't forget to add the buttonConfig.addTemplates(buttonTemplates) at the end of the file.
export const buttonTemplates: ButtonTemplate[] = [
    { 
    
      id: "",
      markable: false,
      ui: {
      uiTransform: {
        width: "70%",
        height: "70%",
        alignSelf:'center',
        position: {left: "370%", bottom: "10%"},
        positionType: 'absolute'
      },
      uiBackground:{ 
        textureMode: 'stretch',  
        texture: {
          src: Resources.ui.small_forward
        }
      }
      },
      hotKey: InputAction.IA_PRIMARY
    },{
    
    id: "Next",
    markable: false,
    ui: {
    uiTransform: {
      width: "70%",
      height: "70%",
      alignSelf:'center',
      position: {left: "370%", bottom: "10%"},
      positionType: 'absolute'
    },
    uiBackground:{ 
      textureMode: 'stretch',  
      texture: {
        src: Resources.ui.small_forward
      }
    }
    },
    hotKey: InputAction.IA_PRIMARY
  },{
    
    id: "Back",
    markable: false,
    ui: {
    uiTransform: {
      width: "70%",
      height: "70%",
      position: {left: "310%", bottom: "10%"},
      positionType: 'absolute',
      alignSelf: 'center'
    },
    uiBackground:{ 
      textureMode: 'stretch',  
      texture: {
        src: Resources.ui.small_backward
      }
    }
  },
    hotKey: InputAction.IA_SECONDARY
  
  },{
    
      id: "Clarification",
      markable: true,
      ui: {
      uiTransform: {
        width: "100%",
        height: "20%",
        position: {right: "180%", bottom: "10%"},
        positionType: 'absolute',
        alignSelf: 'flex-end'
      },
      uiBackground:{ 
        textureMode: 'stretch',  
        texture: {
          src: "images/ui/UI_separate png/CLARIFICATION.png",
        }
      }
    },
    hotKey: InputAction.IA_ACTION_3
  },{
    
    id: "Backing",
    markable: true,
    ui: {
      uiTransform: {
        width: "100%",
        height: "20%",
        position: {right: "70%", bottom: "10%"},
        positionType: 'absolute',
        alignSelf: 'flex-end'
      },
      uiBackground:{ 
        textureMode: 'stretch',  
        texture: {
          src: "images/ui/UI_separate png/BACKING.png",
        } } },
    hotKey: InputAction.IA_ACTION_4
    },{
    
    id: "Relevance",
    markable: true,
    ui: {
    uiTransform: {
      width: "100%",
      height: "20%",
      position: {right: "-40%", bottom: "10%"},
      positionType: 'absolute',
      alignSelf: 'flex-end'
    },
    uiBackground:{ 
      textureMode: 'stretch',  
      texture: {
        src: "images/ui/UI_separate png/RELEVANCE.png",
      }
    }
  },
    hotKey: InputAction.IA_ACTION_5
  },{
    
    id: "Idea",
    markable: false,
    ui: {
    uiTransform: {
      width: "100%",
      height: "20%",
      position: {right: "200%", bottom: "-105%"},
      positionType: 'absolute',
      alignSelf: 'flex-end'
    }, 
    uiBackground:{ 
      color: Color4.Clear()
    }
  }
  
  },{
    
    id: "Challenge",
    markable: true,
    ui: {
    uiTransform: {
      width: "100%",
      height: "20%",
      position: {right: "-150%", bottom: "10%"},
      positionType: 'absolute',
      alignSelf: 'flex-end'
    }, 
    uiBackground:{ 
      textureMode: 'stretch',  
      texture: {
        src: "images/ui/UI_separate png/NEVER MIND....png",
      }
    }
  },
  hotKey: InputAction.IA_ACTION_6
  },
  { 
    
    id: "Return",
    markable: false,
    ui: {
    uiTransform: {
      width: "40%",
      height: "60%",
      alignSelf:'center',
      position: {left: "380%", bottom: "15%"},
      positionType: 'absolute'
    },
    uiBackground:{ 
      textureMode: 'stretch',  
      texture: {
        src: "images/ui/UI_separate png/arrowLoopBrown.png"
      }
    }
    }
  },
  
  // // 0x0100000000005358
  ]
  
buttonConfig.addTemplates(buttonTemplates);