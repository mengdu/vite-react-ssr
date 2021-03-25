function Page1 (props) {
  return (
    <>
      <h5>Page-1</h5>
      <p>data: {JSON.stringify(props.page1Data)}</p>
    </>
  )
}

Page1.loadData = ctx => {
  console.log('get page1 data')
  return { page1Data: [111, 111, 111] }
}

export default Page1
