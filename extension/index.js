const OBSWebSocket = require("obs-websocket-js")

const scenes = ["brb", "maplist", "casters"]
const ip = `ws://localhost:4455`

module.exports = (nodecg) => {
  const scene = nodecg.Replicant("currentBreakScreen", "cq-dashboard", {
    defaultValue: 123,
  })
  const obs = new OBSWebSocket.default()

  const setObsScene = () =>
    obs.call("GetSceneList").then((data) => {
      const newScene = scenes.find((scene) =>
        data.currentProgramSceneName.toLowerCase().includes("#" + scene)
      )
      if (newScene) {
        scene.value = newScene
      }
    })

  obs.connect(ip).then(() => {
    obs.on("ConnectionOpened", () => {
      console.log(`Connected to OBS at ${ip}`)
    })
    obs.on("CurrentProgramSceneChanged", setObsScene)
    obs.on("Identified", setObsScene)
    obs.on("SceneListChanged", setObsScene)
    obs.on("CurrentSceneCollectionChanged", setObsScene)
  })
}
