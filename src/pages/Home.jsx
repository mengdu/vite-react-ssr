export async function fetchData (url, ctx) {
  return {
    props: {
      data: [1, 2, 3, 4]
    }
  }
}

export default function Home(props) {
  return (
    <>
      <h1>Home</h1>
      <p>{JSON.stringify([])}</p>
    </>
  )
}
