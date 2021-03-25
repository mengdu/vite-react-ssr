function Page2 (props) {
  return (
    <>
      <h5>Page-2</h5>
      <p>data: {JSON.stringify(props.page2Data)}</p>
    </>
  )
}

Page2.loadData = ctx => {
  console.log('get page2 data')
  return { page2Data: [222, 222, 222] }
}

export default Page2
