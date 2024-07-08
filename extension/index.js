const OBSWebSocket = require("obs-websocket-js")

module.exports = (nodecg) => {
  const scene = nodecg.Replicant("currentBreakScreen", "cq-dashboard", {
    defaultValue: 123,
  })
  const obs = new OBSWebSocket.default()

  const setObsScene = () =>
    obs.call("GetSceneList").then(() => {
      scene.value = data.currentProgramSceneName.toLowerCase()
    })

  obs.connect(`ws://192.168.1.158:4455`).then(() => {
    obs.on("CurrentProgramSceneChanged", (data) => {
      if (data) {
        scene.value = data.sceneName.toLowerCase()
      } else {
        setObsScene()
      }
    })
    obs.on("Identified", setObsScene)
    obs.on("SceneListChanged", setObsScene)
    obs.on("CurrentSceneCollectionChanged", setObsScene)

    scene.on("change", (sceneName) =>
      obs.call("SetCurrentProgramScene", { sceneName })
    )
  })
}
