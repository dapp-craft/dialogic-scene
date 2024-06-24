import { createQuestsClient } from '@dcl/quests-client'
// frame to debug 0x010000000001EF0A
export class Quest { 

    private QUEST_ID: string
    private ws: string
    private quests: Awaited<ReturnType<typeof createQuestsClient>> | undefined
    private ready: Promise<void>
    private resolveReady!: () => void
    private rejectReady!: (arg: any) => void
    public currentStep: string | null | undefined

    constructor() {
        // f13a4848-0493-4bdb-8db3-9368fe45ccb0 NEW
        // b253fd1b-32de-4d51-85b0-0b33263e20a1 REWARD
        this.QUEST_ID = '3aefcfaf-3b96-4fcb-aebb-2515f75b770e'
        this.ws = 'wss://quests-rpc.decentraland.org'
        this.ready = new Promise((res, rej) => {this.resolveReady = res; this.rejectReady = rej})
        this.connect()
    }

    private async connect() {
        try {
            this.quests = await createQuestsClient(this.ws, this.QUEST_ID)
            let questInstance = this.quests.getInstances().find((instance: any) => instance.quest.id === this.QUEST_ID)
            if (questInstance) this.currentStep = Object.keys(questInstance.state.currentSteps)[0] ?? null
            // console.log('QuestAPI: connected', questInstance)
        } catch (error) {
            console.error(`Error initializing quests: ${error}`)
            this.rejectReady("QuestAPI critical error")
            return
        }
        this.quests.onStarted((questInstance: any) => {
            if (questInstance.quest.id === this.QUEST_ID) {
                // console.log('QuestAPI: begin confirmed', questInstance)
                this.currentStep = Object.keys(questInstance.state.currentSteps)[0] ?? null
                this.resolveReady()
            }
        })
        this.quests.onUpdate((questInstance: any) => {
            if (questInstance.quest.id === this.QUEST_ID) {
                // console.log('QuestAPI: advance confirmed', questInstance)
                this.currentStep = Object.keys(questInstance.state.currentSteps)[0] ?? null
                this.resolveReady()
            }
        })
        this.resolveReady()
    }

    public async begin() {
        await this.ready
        if (this.currentStep !== undefined) return false
        // console.log('QuestAPI: begin')
        if (!await this.quests!.startQuest()) {
            this.ready = Promise.reject("QuestAPI critical error")
            return false
        }
        this.ready = new Promise(r => this.resolveReady = r)
        return true
    }

    public async abortQuest() {
        let questInstance = this.quests?.getInstances().find((instance: any) => instance.quest.id === this.QUEST_ID)
        if (questInstance?.quest.id === this.QUEST_ID) {
            this.quests!.abortQuest().then(r => console.log("QUEST is ABORTED: ", r))
            this.ready = new Promise((res, rej) => {this.resolveReady = res; this.rejectReady = rej})
        }
    }

    public async getCurrentChapter() {
        await this.ready
        return this.currentStep
    }

    public async advance() {
        await this.ready
        if (!this.currentStep) return false
        // console.log('QuestAPI: advance', this.currentStep)
        this.ready = new Promise(r => this.resolveReady = r)
        this.quests!.sendEvent({
            action: {
                type: 'CUSTOM',
                parameters: { id: this.currentStep }
            }
        })
        return true
    }

    public async getNextChapter() {
        await this.ready
        let questInstance = this.quests!.getInstances().find((instance: any) => instance.quest.id === this.QUEST_ID)
        const connection = questInstance?.quest.definition?.connections.find(c => c.stepFrom === this.currentStep)
        return connection ? connection.stepTo : null
    }
}
