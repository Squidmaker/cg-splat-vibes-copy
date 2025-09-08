import { createSignal } from "solid-js"
import { klona } from "klona/json"

const defaults: {
  currentBlock: {
    name: string
    value: { name: string; twitter: string; pronouns: string }[]
  }
  currentBreakScreen: "maplist" | "casters" | "brb" | string
  currentColors: [string, string]
  currentFlavorText: string
  currentGameScreen: { showScores: boolean; showCommentators: boolean }
  currentMapWinners: (string | undefined)[]
  currentMusic: { song: string; artist: string }
  currentRound: { name: string; value: { map: string; mode: string }[] }
  currentScores: [number, number]
  currentTeams: [
    { name: string; data: string[] },
    { name: string; data: string[] }
  ]
  loadedData: {
    rounds: Record<string, { map: string; mode: string }[]>
    teams: Record<string, string[]>
    blocks: Record<
      string,
      {
        name: string
        twitter: string
        pronouns: string
      }[]
    >
    colors: [{ name: string; value: string }, { name: string; value: string }][]
    maps: string[]
    modes: string[]
  }
} = {
  currentBlock: {
    name: "Test Block",
    value: [
      { name: "Comm 1", twitter: "@Comm1", pronouns: "any" },
      { name: "Comm 2", twitter: "@Comm2", pronouns: "any" },
    ],
  },
  currentBreakScreen: "",
  currentColors: ["#d0be08", "#3a0ccd"],
  currentFlavorText: "Hello World!",
  currentGameScreen: {
    showScores: true,
    showCommentators: true,
  },
  currentMapWinners: [],
  currentMusic: {
    song: "Wave Prism",
    artist: "Chirpy Chips",
  },
  currentRound: {
    name: "Test Round",
    value: [
      {
        map: "Scorch Gorge",
        mode: "Splat Zones",
      },
      {
        map: "Scorch Gorge",
        mode: "Splat Zones",
      },
      {
        map: "Scorch Gorge",
        mode: "Splat Zones",
      },
    ],
  },
  currentScores: [0, 0],
  currentTeams: [
    { name: "Team A", data: [] },
    { name: "Team B", data: [] },
  ],
  loadedData: {
    rounds: {
      "Test Round": [
        { map: "Scorch Gorge", mode: "Splat Zones" },
        { map: "Scorch Gorge", mode: "Splat Zones" },
        { map: "Scorch Gorge", mode: "Splat Zones" },
      ],
    },
    teams: { "Team A": [], "Team B": [] },
    blocks: {
      "Test Block": [
        { name: "Comm 1", twitter: "@Comm1", pronouns: "any" },
        { name: "Comm 2", twitter: "@Comm2", pronouns: "any" },
      ],
    },
    colors: [
      [
        { name: "Blue", value: "#1a1aae" },
        { name: "Yellow", value: "#e38d24" },
      ],
      [
        { name: "Green", value: "#a0c937" },
        { name: "Purple", value: "#ba30b0" },
      ],
      [
        { name: "Lime Green", value: "#becd41" },
        { name: "Purple", value: "#6325cd" },
      ],
      [
        { name: "Orange", value: "#de6624" },
        { name: "Blue", value: "#343bc4" },
      ],
      [
        { name: "Orange", value: "#cd510a" },
        { name: "Purple", value: "#6e04b6" },
      ],
      [
        { name: "Pink", value: "#c12d74" },
        { name: "Green", value: "#2cb721" },
      ],
      [
        { name: "Turquoise", value: "#1bbeab" },
        { name: "Pink", value: "#c43a6e" },
      ],
      [
        { name: "Turquoise", value: "#1ec0ad" },
        { name: "Red", value: "#d74b31" },
      ],
      [
        { name: "Yellow", value: "#d0be08" },
        { name: "Blue", value: "#3a0ccd" },
      ],
      [
        { name: "Yellow", value: "#ceb121" },
        { name: "Purple", value: "#9025c6" },
      ],
    ],
    maps: [
      "(counterpick)",
      "Scorch Gorge",
      "Eeltail Alley",
      "Hagglefish Market",
      "Undertow Spillway",
      "Mincemeat Metalworks",
      "Hammerhead Bridge",
      "Museum d'Alfonsino",
      "Mahi-Mahi Resort",
      "Inkblot Art Academy",
      "Sturgeon Shipyard",
      "MakoMart",
      "Wahoo World",
      "Flounder Heights",
      "Brinewater Springs",
      "Manta Maria",
      "Um'ami Ruins",
      "Humpback Pump Track",
      "Barnacle & Dime",
      "Crableg Capital",
      "Shipshape Cargo Co.",
      "Bluefin Depot",
      "Robo ROM-en",
      "Urchin Underpass",
    ],
    modes: [
      "(counterpick)",
      "Turf War",
      "Splat Zones",
      "Tower Control",
      "Rainmaker",
      "Clam Blitz",
    ],
  },
}

const [replicants, setReps] = createSignal(defaults)

if (nodecg) {
  Object.entries(defaults).map(([name, defaultValue]) => {
    nodecg
      .Replicant(name, "cq-dashboard", { defaultValue })
      .on("change", (value) => {
        console.log("cq-dashboard." + name)
        setReps({ ...replicants(), [name]: klona(value) })
      })
  })
} else {
  console.warn("NodeCG is not injected! Using default data")
}

export default replicants
