function Demo(props) {
  return (
    <>
      <h4>Layout</h4>
      <p>data：{JSON.stringify(props.layoutData)}</p>
      <a href="/layout/page-1">Page 1</a>&nbsp;
      <a href="/layout/page-2">Page 2</a>
      <p></p>
      {props.view(props)}
    </>
  )
}

Demo.loadData = ctx => {
  console.log('get layout data')
  return { layoutData: [0, 0, 0] }
}

export default Demo
