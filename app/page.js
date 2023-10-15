import MainContainer from "./components/MainContainer";

export const metadata = {
    title: "Main page",
    description: "Main page description",
    keywords: "NextJS, Main page",
}

export default function Home() {

  return (
    <MainContainer>
      <main className="p-24">
        <h1 className="mt-[50px] text-2xl text-center">Home page</h1>
      </main>
    </MainContainer>
  )
}
