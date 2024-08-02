import render from "./render"
import replicants from "./replicants"
import assetGameplayScores from "./assets/Gameplay - Scores.png"
import assetGameplayCasters from "./assets/Gameplay - Casters.png"
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import gsap from "gsap"

const teams = createMemo(() => replicants().currentTeams)
const scores = createMemo(() => replicants().currentScores)
const scoreA = createMemo(() => scores()[0].toString())
const scoreB = createMemo(() => scores()[1].toString())
const teamNameA = createMemo(() => teams()[0].name)
const teamNameB = createMemo(() => teams()[1].name)
const round = createMemo(() => replicants().currentRound)
const showScores = createMemo(() => replicants().currentGameScreen.showScores)
const showCommentators = createMemo(
  () => replicants().currentGameScreen.showCommentators
)

const App = () => {
  return (
    <div class="absolute inset-0 flex flex-col items-stretch font-[Gilroy] font-bold whitespace-nowrap">
      <GameScene />
    </div>
  )
}

const GameScene = () => {
  let scoreboard: HTMLDivElement | undefined
  let casters0: HTMLDivElement | undefined
  let casters1: HTMLDivElement | undefined
  let casters2: HTMLDivElement | undefined

  createEffect(() => {
    let ctx = gsap.context(() => {
      if (showScores()) {
        gsap.to(scoreboard!, { opacity: 1, x: 0 })
      } else {
        gsap.to(scoreboard!, { opacity: 0, x: -50 })
      }
    })
    onCleanup(() => ctx.kill())
  })

  createEffect(() => {
    let ctx = gsap.context(() => {
      if (showCommentators()) {
        gsap.to([casters0, casters1, casters2], {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        })
      } else {
        gsap.to([casters0, casters1, casters2], {
          opacity: 0,
          x: 50,
          stagger: 0.1,
        })
      }
    })
    onCleanup(() => ctx.kill())
  })

  return (
    <>
      <div
        ref={scoreboard}
        class="relative font-[Gilroy] font-bold pt-5 opacity-0"
      >
        <img src={assetGameplayScores} />
        <div class="absolute inset-0 flex flex-col justify-center pr-[calc(1920px-500px)]">
          <div class="h-full pt-5 flex flex-col justify-center">
            <div class="h-[70px] flex items-center gap-[20px]">
              <div class="flex-1 text-4xl pl-4">
                <FadeSpan>{teamNameA()}</FadeSpan>
              </div>
              <div class="shrink-0 text-5xl w-[72px]">
                <FadeSpan>{scoreA()}</FadeSpan>
              </div>
            </div>
            <div class="h-[70px] flex items-center gap-[20px]">
              <div class="flex-1 text-4xl pl-4">
                <FadeSpan>{teamNameB()}</FadeSpan>
              </div>
              <div class="shrink-0 text-5xl w-[72px]">
                <FadeSpan>{scoreB()}</FadeSpan>
              </div>
            </div>
          </div>
          <div class="shrink-0 text-4xl h-[81px] pl-[168px] flex items-center">
            <FadeSpan>{round().name}</FadeSpan>
          </div>
        </div>
      </div>
      <div class="absolute text-5xl inset-0 flex flex-col h-full justify-end items-end p-5 gap-[27px]">
        <div ref={casters0} class="w-[353px] text-center opacity-0">
          Casters
        </div>
        <CasterBlock i={0} ref={casters1} />
        <CasterBlock i={1} ref={casters2} />
      </div>
    </>
  )
}

const CasterBlock = (props: { i: 0 | 1; ref?: HTMLDivElement }) => {
  return (
    <div
      ref={props.ref}
      class="opacity-0 h-[154px] w-[353px] rounded-[29px] bg-primary flex flex-col items-stretch p-[12px] gap-[12px] text-center text-white"
    >
      <div class="h-full flex flex-col justify-center flex-1">
        <div class="text-5xl leading-3">
          <FadeSpan>{replicants().currentBlock.value[props.i].name}</FadeSpan>
        </div>
      </div>
      <div class="text-4xl flex flex-col justify-center h-[89px] rounded-[calc(29px-12px)] bg-white/25">
        <FadeSpan>{replicants().currentBlock.value[props.i].pronouns}</FadeSpan>
        <FadeSpan>{replicants().currentBlock.value[props.i].twitter}</FadeSpan>
      </div>
    </div>
  )
}

const FadeSpan = (props: { children: string }) => {
  const [text, setText] = createSignal(props.children)
  return (
    <span
      ref={(ref) => {
        createEffect(() => {
          const val = props.children
          if (text() !== val) {
            gsap
              .timeline()
              .to(ref, {
                opacity: 0,
              })
              .call(() => {
                setText(val)
              })
              .to(ref, { opacity: 1 })
          }
          return val
        })
      }}
    >
      {text()}
    </span>
  )
}
render(App)
