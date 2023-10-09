import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

import { Header } from "../components/header";
import { Module } from "../components/module";
import { Video } from "../components/video";
import { useCurrentLesson, useStore } from "../zustand-store";

// import { useAppDispatch, useAppSelector } from "../store";
// import { loadCourse, useCurrentLesson } from "../store/slices/player";

export function Player() {
  // const dispatch = useAppDispatch();

  // const modules = useAppSelector((store) => store.player.course?.modules);
  // const { currentLesson } = useCurrentLesson();

  // useEffect(() => {
  //   dispatch(loadCourse());
  // }, []);

  // useEffect(() => {
  //   if (!!currentLesson) {
  //     document.title = `Assistindo: ${currentLesson.title}`;
  //   }
  // }, [currentLesson]);

  const { course, load } = useStore((store) => ({
    course: store.course,
    load: store.load,
  }));

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!!currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 border-l absolute top-0 right-0 bottom-0 divide-y-2 divide-zinc-700 border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {!!course?.modules &&
              course?.modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
